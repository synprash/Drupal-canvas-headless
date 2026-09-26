<?php

declare(strict_types=1);

namespace Drupal\apex_core\Template;

use Twig\Environment;
use Twig\Node\Expression\FilterExpression;
use Twig\Node\Node;
use Twig\NodeVisitor\NodeVisitorInterface;

/**
 * Ensures Twig escape filter expressions delegate correctly to Drupal's TwigExtension.
 */
class TwigNodeVisitor implements NodeVisitorInterface {

  /**
   * {@inheritdoc}
   */
  public function enterNode(Node $node, Environment $env): Node {
    if ($node instanceof FilterExpression && $node->hasAttribute('template_escaper')) {
      $node->setAttribute('template_escaper', FALSE);
    }
    return $node;
  }

  /**
   * {@inheritdoc}
   */
  public function leaveNode(Node $node, Environment $env): ?Node {
    if ($node instanceof FilterExpression && $node->hasAttribute('template_escaper')) {
      $node->setAttribute('template_escaper', FALSE);
    }
    return $node;
  }

  /**
   * {@inheritdoc}
   */
  public function getPriority(): int {
    // Run at priority 260, ensuring template_escaper is disabled for EscapeFilter nodes.
    return 260;
  }

}
