<?php

declare(strict_types=1);

namespace Drupal\apex_core\Template;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Decorates CVA Twig Extension to provide null-safe CVA handling in PHP 8.4+.
 */
final class SafeCvaTwigExtension extends AbstractExtension {

  /**
   * {@inheritdoc}
   */
  public function getFunctions(): array {
    return [
      new TwigFunction('html_cva', [self::class, 'htmlCva']),
    ];
  }

  /**
   * Returns a null-safe CVA resolver instance.
   */
  public static function htmlCva(
    array|string $base = [],
    array $variants = [],
    array $compoundVariants = [],
    array $defaultVariant = []
  ): SafeCva {
    return new SafeCva($base, $variants, $compoundVariants, $defaultVariant);
  }

}
