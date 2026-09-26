import React from 'react';

/**
 * Represents a Single Directory Component (SDC) node inside a Drupal Canvas component tree.
 */
export interface CanvasComponentNode {
  /** Unique identifier of the component instance */
  uuid: string;
  /** SDC Machine identifier (e.g. 'sdc.flexus.hero-side-by-side', 'sdc.apex_theme.stat-counter') */
  component_id: string;
  /** Key-value input properties provided to the SDC */
  inputs: Record<string, any>;
  /** UUID of parent component, or null if top-level root */
  parent_uuid?: string | null;
  /** Target slot name inside parent component, or null */
  slot?: string | null;
}

/**
 * Recursive component tree dictionary indexed by node UUID.
 */
export type CanvasComponentTree = Record<string, CanvasComponentNode>;

/**
 * Complete Canvas page entity data model.
 */
export interface CanvasPageData {
  /** Drupal entity UUID */
  id: string;
  /** Human-readable page title */
  title: string;
  /** URL alias / path (e.g. '/services', '/about/team') */
  path: string;
  /** Normalized component tree */
  component_tree: CanvasComponentTree;
}

/**
 * Signature for slot rendering function passed to SDC React components.
 */
export type SlotRenderFn = (slotName: string) => React.ReactNode;

/**
 * Base props interface passed to all SDC React component implementations.
 */
export interface BaseSDCProps {
  /** UUID of the component node */
  uuid?: string;
  /** Function to render nested child components in a named slot */
  renderSlot?: SlotRenderFn;
  /** Dynamic extra props passed from Drupal inputs */
  [key: string]: any;
}
