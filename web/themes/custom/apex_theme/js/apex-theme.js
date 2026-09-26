/**
 * @file
 * Apex Theme interactive behaviors and enhancements.
 */

((Drupal, once) => {
  'use strict';

  Drupal.behaviors.apexThemeEnhancements = {
    attach(context) {
      // Counter animation trigger for stat cards
      once('apex-counter', '[data-apex-counter]', context).forEach((el) => {
        const target = parseInt(el.getAttribute('data-apex-counter'), 10);
        if (isNaN(target)) return;

        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            el.textContent = current.toLocaleString();
          }
        }, 25);
      });
    },
  };
})(Drupal, once);
