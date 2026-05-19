/* === JYE CUSTOM: Sugerencias de búsqueda en estado vacío === */
(function () {
  var SUGGESTIONS_HTML =
    '<div class="jye-search-suggestions">' +
      '<div class="jye-search-suggestions__group">' +
        '<h3 class="jye-search-suggestions__title">Por categoría</h3>' +
        '<ul class="jye-search-suggestions__list">' +
          '<li><a href="/collections/juegos-de-mesa">Juegos de Mesa</a></li>' +
          '<li><a href="/collections/rompecabezas">Rompecabezas</a></li>' +
          '<li><a href="/collections/arte-y-manualidades">Arte y Manualidades</a></li>' +
          '<li><a href="/collections/construccion">Construcción</a></li>' +
          '<li><a href="/collections/estimulacion-temprana">Estimulación temprana</a></li>' +
          '<li><a href="/collections/libros">Libros</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="jye-search-suggestions__group">' +
        '<h3 class="jye-search-suggestions__title">Por edad</h3>' +
        '<ul class="jye-search-suggestions__list">' +
          '<li><a href="/collections/0-a-1-anos">0 a 1 años</a></li>' +
          '<li><a href="/collections/1-a-3-anos">1 a 3 años</a></li>' +
          '<li><a href="/collections/3-a-5-anos">3 a 5 años</a></li>' +
          '<li><a href="/collections/5-a-7-anos">5 a 7 años</a></li>' +
          '<li><a href="/collections/7-a-12-anos">7 a 12 años</a></li>' +
          '<li><a href="/collections/12-a-99-anos">12 a 99 años</a></li>' +
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
