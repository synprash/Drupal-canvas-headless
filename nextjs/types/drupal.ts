import { CanvasComponentNode } from './canvas';

/**
 * Drupal JSON:API resource object for Canvas Pages.
 */
export interface DrupalJsonApiCanvasPage {
  type: 'canvas_page--canvas_page';
  id: string;
  attributes: {
    drupal_internal__id: number;
    title: string;
    path?: {
      alias?: string;
      pid?: number;
      langcode?: string;
    };
    description?: string;
    status?: boolean;
    components?: CanvasComponentNode[] | Record<string, CanvasComponentNode>;
    component_tree?: Record<string, CanvasComponentNode>;
    [key: string]: any;
  };
}

/**
 * Top-level JSON:API list response contract from Drupal.
 */
export interface DrupalJsonApiResponse<T> {
  jsonapi?: {
    version: string;
    meta?: Record<string, any>;
  };
  data: T[];
  links?: {
    self?: { href: string };
    next?: { href: string };
    prev?: { href: string };
  };
  errors?: Array<{
    title: string;
    status: string;
    detail?: string;
  }>;
}

/**
 * Payload sent to Drupal REST contact submission endpoint.
 */
export interface ContactFormInput {
  name: string;
  email: string;
  subject?: string;
  message?: string;
}

/**
 * Response returned from Drupal Webform submission.
 */
export interface WebformSubmissionResult {
  success: boolean;
  sid?: string | number;
  webform_id?: string;
  message?: string;
  error?: string;
}
