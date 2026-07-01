/* === JYE CUSTOM: Sugerencias de búsqueda en estado vacío === */
(function () {
  var SUGGESTIONS_HTML =
    '<div class="jye-search-suggestions">' +
      '<div class="jye-search-suggestions__group">' +
        '<h3 class="jye-search-suggestions__title">Por edad</h3>' +
        '<ul class="jye-search-suggestions__list">' +
          '<li><a href="/collections/0-2-anos">0 - 2 años</a></li>' +
          '<li><a href="/collections/3-5-anos">3 - 5 años</a></li>' +
          '<li><a href="/collections/6-8-anos">6 - 8 años</a></li>' +
          '<li><a href="/collections/9-12-anos">9 - 12 años</a></li>' +
          '<li><a href="/collections/13-anos">13+ años</a></li>' +
          '<li><a href="/collections/adultos">Adultos</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="jye-search-suggestions__group">' +
        '<h3 class="jye-search-suggestions__title">Por categoría</h3>' +
        '<ul class="jye-search-suggestions__list">' +
          '<li><a href="/collections/juegos-de-mesa-y-rompecabezas">Juegos de Mesa y Rompecabezas</a></li>' +
          '<li><a href="/collections/desarrollo-y-aprendizaje">Desarrollo y Aprendizaje</a></li>' +
          '<li><a href="/collections/arte-y-ciencias">Arte y Ciencias</a></li>' +
          '<li><a href="/collections/libros-nueva">Libros</a></li>' +
          '<li><a href="/collections/juguetes-y-coleccionables">Juguetes y Coleccionables</a></li>' +
        '</ul>' +
      '</div>' +
    '</div>';

  function initSearchSuggestions() {
    var searchEls = document.querySelectorAll('predictive-search');
    searchEls.forEach(function (searchEl) {
      var input = searchEl.querySelector('input[type="search"]');
      var resultsContainer = searchEl.querySelector('#predictive-search');
      if (!input || !resultsContainer) return;

      input.addEventListener('focus', function () {
        if (!input.value.trim().length) {
          resultsContainer.innerHTML = SUGGESTIONS_HTML;
          resultsContainer.style.display = 'block';
        }
      });

      input.addEventListener('input', function () {
        if (!input.value.trim().length) {
          resultsContainer.innerHTML = SUGGESTIONS_HTML;
          resultsContainer.style.display = 'block';
        } else {
          var sugPanel = resultsContainer.querySelector('.jye-search-suggestions');
          if (sugPanel) sugPanel.remove();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchSuggestions);
  } else {
    initSearchSuggestions();
  }
})();
/* === END JYE CUSTOM === */

/* === JYE CUSTOM: Barra visible estilo Retrospec — abre predictive search real === */
(function () {
  function openHeaderSearch(fakeInput) {
    var container = document.querySelector('.site-header__search-container');
    var predictive = container && container.querySelector('predictive-search[data-context="header"]');
    var realInput = predictive && predictive.querySelector('input[type="search"]');

    if (!container || !predictive || !realInput) return;

    container.classList.add('is-active');
    predictive.classList.add('is-active');

    if (fakeInput && fakeInput.value !== realInput.value) {
      realInput.value = fakeInput.value;
    }

    document.dispatchEvent(new CustomEvent('predictive-search:open', {
      detail: { context: 'header' },
      bubbles: true
    }));

    realInput.focus({ preventScroll: true });
  }

  function initFakeHeaderSearch() {
    document.querySelectorAll('[data-jye-fake-search]').forEach(function (input) {
      var form = input.closest('form');
      var submitButton = form && form.querySelector('.jye-inline-search__submit');

      input.addEventListener('pointerdown', function (event) {
        event.preventDefault();
        openHeaderSearch(input);
      });

      input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') return;
        openHeaderSearch(input);
      });

      if (submitButton) {
        submitButton.addEventListener('pointerdown', function (event) {
          if (input.value.trim().length) return;
          event.preventDefault();
          openHeaderSearch(input);
        });
      }

      if (form) {
        form.addEventListener('submit', function (event) {
          if (input.value.trim().length) return;
          event.preventDefault();
          openHeaderSearch(input);
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFakeHeaderSearch);
  } else {
    initFakeHeaderSearch();
  }
})();
/* === END JYE CUSTOM === */

/* === JYE CUSTOM: Heroes — permitir scroll vertical sin activar swipe === */
(function () {
  function disableHeroSwipe() {
    if (!window.Flickity || typeof window.Flickity.data !== 'function') return;

    document.querySelectorAll('[data-section-type="slideshow-section"] .hero').forEach(function (hero) {
      var flickity = window.Flickity.data(hero);
      if (!flickity || flickity.options.draggable === false) return;

      flickity.options.draggable = false;
      if (typeof flickity.updateDraggable === 'function') {
        flickity.updateDraggable();
      }
    });
  }

  function scheduleDisableHeroSwipe() {
    disableHeroSwipe();
    setTimeout(disableHeroSwipe, 250);
    setTimeout(disableHeroSwipe, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleDisableHeroSwipe);
  } else {
    scheduleDisableHeroSwipe();
  }

  document.addEventListener('page:loaded', scheduleDisableHeroSwipe);
  document.addEventListener('shopify:section:load', scheduleDisableHeroSwipe);
  window.addEventListener('pageshow', scheduleDisableHeroSwipe);

  document.addEventListener('touchstart', function (event) {
    if (!event.target.closest('[data-section-type="slideshow-section"] .hero')) return;
    event.stopPropagation();
  }, { capture: true, passive: true });

  document.addEventListener('touchmove', function (event) {
    if (!event.target.closest('[data-section-type="slideshow-section"] .hero')) return;
    event.stopPropagation();
  }, { capture: true, passive: true });
})();
/* === END JYE CUSTOM === */

/* === JYE CUSTOM: Trust badges — dots indicator + reset scroll al inicio === */
(function () {
  function initTrustBadges() {
    var section = document.querySelector('[id$="__trust-badges"]');
    if (!section) return;

    var container = section.querySelector('.text-with-icons__blocks');
    if (!container) return;

    var badges = Array.prototype.slice.call(
      container.querySelectorAll('.text-with-icons__block')
    );
    if (badges.length <= 1) return;

    /* Reset al primer badge */
    container.scrollLeft = 0;

    /* Crear dots */
    var dotsEl = document.createElement('div');
    dotsEl.className = 'jye-trust-dots';

    badges.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'jye-trust-dot' + (i === 0 ? ' jye-trust-dot--active' : '');
      dot.setAttribute('aria-label', 'Ver badge ' + (i + 1));
      dot.addEventListener('click', function () {
        container.scrollTo({ left: badges[i].offsetLeft, behavior: 'smooth' });
      });
      dotsEl.appendChild(dot);
    });

    container.parentNode.insertBefore(dotsEl, container.nextSibling);

    /* Sincronizar dot activo con el scroll */
    container.addEventListener('scroll', function () {
      var scrollLeft = container.scrollLeft;
      var activeIndex = 0;
      var minDist = Infinity;
      badges.forEach(function (badge, i) {
        var dist = Math.abs(badge.offsetLeft - scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          activeIndex = i;
        }
      });
      Array.prototype.forEach.call(
        dotsEl.querySelectorAll('.jye-trust-dot'),
        function (dot, i) {
          dot.classList.toggle('jye-trust-dot--active', i === activeIndex);
        }
      );
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrustBadges);
  } else {
    initTrustBadges();
  }
})();
/* === END JYE CUSTOM === */
