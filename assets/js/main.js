// =============================================================================
// Dark Mode Toggle
// =============================================================================

(function() {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? null : 'dark';

    if (next) {
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    }
  });
})();

// =============================================================================
// Sticky Header on Scroll
// =============================================================================

(function() {
  var header = document.getElementById('site-header');
  if (!header) return;

  var scrollThreshold = 100;

  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();

// =============================================================================
// Animated Gradient Mesh Background
// =============================================================================

(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (document.querySelector('.post-list')) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  var ctx = canvas.getContext('2d');
  var w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();

  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  var lightColors = [
    [217, 169, 78, 0.3],
    [180, 100, 140, 0.25],
    [100, 170, 120, 0.22],
    [80, 130, 210, 0.28]
  ];

  var darkColors = [
    [60, 60, 200, 0.35],
    [30, 160, 150, 0.28],
    [150, 50, 170, 0.28],
    [200, 150, 50, 0.22]
  ];

  // 6 blobs for richer overlapping
  var blobs = [
    { xFreq: 0.00023, yFreq: 0.00031, xAmp: 0.35, yAmp: 0.30, phase: 0,    rFreq: 0.00015 },
    { xFreq: 0.00029, yFreq: 0.00019, xAmp: 0.30, yAmp: 0.40, phase: 1.2,  rFreq: 0.00012 },
    { xFreq: 0.00037, yFreq: 0.00026, xAmp: 0.40, yAmp: 0.25, phase: 2.8,  rFreq: 0.00018 },
    { xFreq: 0.00017, yFreq: 0.00041, xAmp: 0.25, yAmp: 0.35, phase: 4.1,  rFreq: 0.00014 },
    { xFreq: 0.00033, yFreq: 0.00015, xAmp: 0.32, yAmp: 0.28, phase: 5.5,  rFreq: 0.00011 },
    { xFreq: 0.00021, yFreq: 0.00035, xAmp: 0.28, yAmp: 0.38, phase: 0.7,  rFreq: 0.00016 }
  ];

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var colors = isDark ? darkColors : lightColors;

    for (var i = 0; i < blobs.length; i++) {
      var b = blobs[i];
      var c = colors[i % colors.length];
      // compound sinusoidal paths — each axis mixes two frequencies for non-repeating drift
      var x = w * 0.5
        + Math.sin(t * b.xFreq + b.phase) * w * b.xAmp
        + Math.sin(t * b.xFreq * 0.7 + b.phase * 2.3) * w * b.xAmp * 0.3;
      var y = h * 0.5
        + Math.cos(t * b.yFreq + b.phase) * h * b.yAmp
        + Math.cos(t * b.yFreq * 0.6 + b.phase * 1.7) * h * b.yAmp * 0.3;
      // radius breathes slowly
      var baseR = Math.max(w, h) * 0.38;
      var radius = baseR + Math.sin(t * b.rFreq + b.phase) * baseR * 0.15;

      var grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + c[3] + ')');
      grad.addColorStop(0.4, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (c[3] * 0.5) + ')');
      grad.addColorStop(1, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();

// =============================================================================
// Timeline Scroll Reveal
// =============================================================================

(function() {
  var entries = document.querySelectorAll('.timeline-entry');
  if (!entries.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    entries.forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(items) {
    items.forEach(function(item) {
      if (item.isIntersecting) {
        var idx = Array.prototype.indexOf.call(entries, item.target);
        setTimeout(function() {
          item.target.classList.add('is-visible');
        }, idx * 120);
        observer.unobserve(item.target);
      }
    });
  }, { threshold: 0.15 });

  entries.forEach(function(el) { observer.observe(el); });
})();
