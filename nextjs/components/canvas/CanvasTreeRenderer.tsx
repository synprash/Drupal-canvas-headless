'use client';

import React from 'react';
import { ComponentRegistry } from './registry';
import { CanvasComponentTree } from '@/types/canvas';

interface CanvasTreeRendererProps {
  /** The full component tree dictionary for the current page */
  tree?: CanvasComponentTree;
  /** UUID of the parent component to filter children by, or null for root nodes */
  parentUuid?: string | null;
  /** Target slot name in the parent component, or null for root nodes */
  slot?: string | null;
}

/**
 * Recursive Slot & Component Tree Dispatcher.
 * Traverses the nested Drupal Canvas component tree and renders corresponding React SDC components.
 */
export function CanvasTreeRenderer({
  tree = {},
  parentUuid = null,
  slot = null,
}: CanvasTreeRendererProps) {
  const nodes = Object.values(tree).filter(
    (node) => (node.parent_uuid || null) === parentUuid && (node.slot || null) === slot
  );

  return (
    <>
      {nodes.map((node) => {
        const Component = ComponentRegistry[node.component_id];

        if (!Component) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`[CanvasTreeRenderer] Unregistered component_id: "${node.component_id}" (uuid: ${node.uuid})`);
          }
          return null;
        }

        /**
         * Slot renderer passed to parent SDCs to render their nested children.
         */
        const renderSlot = (targetSlot: string) => (
          <CanvasTreeRenderer tree={tree} parentUuid={node.uuid} slot={targetSlot} />
        );

        return (
          <Component
            key={node.uuid}
            {...node.inputs}
            renderSlot={renderSlot}
            uuid={node.uuid}
          />
        );
      })}
    </>
  );
}
