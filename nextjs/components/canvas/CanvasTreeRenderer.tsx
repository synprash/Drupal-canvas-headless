'use client';

import React from 'react';
import { ComponentRegistry } from './registry';
import { CanvasComponentNode } from '@/lib/drupal';

export function CanvasTreeRenderer({
  tree = {},
  parentUuid = null,
  slot = null,
}: {
  tree: Record<string, CanvasComponentNode>;
  parentUuid?: string | null;
  slot?: string | null;
}) {
  const nodes = Object.values(tree).filter(
    (node) => (node.parent_uuid || null) === parentUuid && (node.slot || null) === slot
  );

  return (
    <>
      {nodes.map((node) => {
        const Component = ComponentRegistry[node.component_id];
        if (!Component) {
          return null;
        }

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
