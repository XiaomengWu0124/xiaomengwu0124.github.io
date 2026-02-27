(function () {
  'use strict';

  // --- Mobile sidebar toggle ---
  var toggle = document.getElementById('navToggle');
  var sidebar = document.getElementById('sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      sidebar.classList.toggle('sidebar--open');
    });

    // Close sidebar when clicking a link
    sidebar.querySelectorAll('.sidebar__link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        sidebar.classList.remove('sidebar--open');
      });
    });
  }

  // --- Portfolio filter ---
  var filterBtns = document.querySelectorAll('.filter-btn');
  var grid = document.getElementById('portfolioGrid');

  if (filterBtns.length > 0 && grid) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('filter-btn--active'); });
        btn.classList.add('filter-btn--active');

        var filter = btn.getAttribute('data-filter');
        var items = grid.querySelectorAll('.work-item');

        items.forEach(function (item) {
          var cat = item.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                item.style.transition = 'opacity 0.3s ease';
                item.style.opacity = '1';
              });
            });
          } else {
            item.style.opacity = '0';
            setTimeout(function () { item.style.display = 'none'; }, 250);
          }
        });
      });
    });
  }

  // --- Scroll reveal ---
  var reveals = document.querySelectorAll('.reveal, .reveal-stagger');

  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            entry.target.classList.contains('reveal') ? 'reveal--visible' : 'reveal-stagger--visible'
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('reveal--visible', 'reveal-stagger--visible');
    });
  }

})();
