<?php

declare(strict_types=1);

namespace Drupal\apex_core\Template;

use Drupal\Core\Template\Attribute\TwigAllowed;
use Twig\Extra\Html\Cva;

/**
 * Null-safe wrapper around Twig Cva class for PHP 8.4+ compatibility.
 */
class SafeCva {

  private Cva $cva;

  public function __construct(
    string|array $base = [],
    array $variants = [],
    array $compoundVariants = [],
    array $defaultVariant = [],
  ) {
    $this->cva = new Cva($base, $variants, $compoundVariants, $defaultVariant);
  }

  /**
   * Applies recipes with null-safety to prevent PHP 8.4 array offset deprecations.
   */
  #[TwigAllowed]
  public function apply(array $recipes, ?string ...$additionalClasses): string {
    $sanitized = [];
    foreach ($recipes as $key => $value) {
      if ($value === NULL) {
        $sanitized[$key] = '';
      }
      elseif (\is_bool($value)) {
        $sanitized[$key] = $value ? 'true' : 'false';
      }
      else {
        $sanitized[$key] = (string) $value;
      }
    }

    return $this->cva->apply($sanitized, ...$additionalClasses);
  }

}
