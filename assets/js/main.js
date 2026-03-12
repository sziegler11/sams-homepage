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
// Animated Geometric Background
// =============================================================================

(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!document.querySelector('.hero')) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  var ctx = canvas.getContext('2d');
  var w, h, diag;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    diag = Math.sqrt(w * w + h * h);
  }
  resize();

  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  // Muted, darker palette — slate blues, charcoal greens, deep amber, cool grey
  var lightColors = [
    [70, 90, 120, 0.12],
    [140, 110, 60, 0.09],
    [55, 95, 85, 0.10],
    [100, 75, 110, 0.08],
    [85, 100, 65, 0.09]
  ];

  var darkColors = [
    [40, 60, 140, 0.16],
    [20, 110, 110, 0.12],
    [110, 45, 130, 0.13],
    [150, 120, 40, 0.10],
    [50, 80, 120, 0.11]
  ];

  // Each shard is a drifting polygon — triangles and quads
  var shards = [
    { sides: 3, xFreq: 0.00018, yFreq: 0.00025, xAmp: 0.30, yAmp: 0.25, phase: 0,   rotFreq: 0.00008, scale: 0.45 },
    { sides: 4, xFreq: 0.00024, yFreq: 0.00016, xAmp: 0.35, yAmp: 0.35, phase: 1.4, rotFreq: 0.00006, scale: 0.55 },
    { sides: 3, xFreq: 0.00031, yFreq: 0.00022, xAmp: 0.25, yAmp: 0.30, phase: 2.9, rotFreq: 0.00010, scale: 0.38 },
    { sides: 4, xFreq: 0.00014, yFreq: 0.00033, xAmp: 0.28, yAmp: 0.20, phase: 4.3, rotFreq: 0.00005, scale: 0.50 },
    { sides: 3, xFreq: 0.00027, yFreq: 0.00012, xAmp: 0.32, yAmp: 0.28, phase: 5.7, rotFreq: 0.00009, scale: 0.42 }
  ];

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var colors = isDark ? darkColors : lightColors;

    for (var i = 0; i < shards.length; i++) {
      var s = shards[i];
      var c = colors[i % colors.length];

      // compound drift for non-repeating paths
      var cx = w * 0.5
        + Math.sin(t * s.xFreq + s.phase) * w * s.xAmp
        + Math.sin(t * s.xFreq * 0.6 + s.phase * 2.1) * w * s.xAmp * 0.25;
      var cy = h * 0.5
        + Math.cos(t * s.yFreq + s.phase) * h * s.yAmp
        + Math.cos(t * s.yFreq * 0.7 + s.phase * 1.5) * h * s.yAmp * 0.25;

      // slow rotation
      var angle = t * s.rotFreq + s.phase;
      var radius = diag * s.scale * 0.5;

      // build polygon vertices
      var verts = [];
      for (var v = 0; v < s.sides; v++) {
        var a = angle + (v / s.sides) * Math.PI * 2;
        // stretch irregularly for more angular feel
        var stretch = 1.0 + 0.3 * Math.sin(a * 2.0 + s.phase);
        verts.push({
          x: cx + Math.cos(a) * radius * stretch,
          y: cy + Math.sin(a) * radius * stretch
        });
      }

      // linear gradient along the rotation axis — sharp directional light
      var gx0 = cx + Math.cos(angle) * radius;
      var gy0 = cy + Math.sin(angle) * radius;
      var gx1 = cx - Math.cos(angle) * radius;
      var gy1 = cy - Math.sin(angle) * radius;

      var grad = ctx.createLinearGradient(gx0, gy0, gx1, gy1);
      grad.addColorStop(0, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + c[3] + ')');
      grad.addColorStop(0.5, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (c[3] * 0.4) + ')');
      grad.addColorStop(1, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0)');

      ctx.beginPath();
      ctx.moveTo(verts[0].x, verts[0].y);
      for (var v = 1; v < verts.length; v++) {
        ctx.lineTo(verts[v].x, verts[v].y);
      }
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
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
