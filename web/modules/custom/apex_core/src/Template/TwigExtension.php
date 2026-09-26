<?php

declare(strict_types=1);

namespace Drupal\apex_core\Template;

use Twig\Extension\AbstractExtension;

/**
 * Twig extension providing node visitors for Drupal 11 on PHP 8.4+.
 */
class TwigExtension extends AbstractExtension {

  /**
   * {@inheritdoc}
   */
  public function getNodeVisitors(): array {
    return [
      new TwigNodeVisitor(),
    ];
  }

}
