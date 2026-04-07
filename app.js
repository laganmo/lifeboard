/* ─────────────────────────────────────────
   LIFEBOARD — app.js
   Navigation + Travel Map Tooltip
   ───────────────────────────────────────── */

/* ── LIVE DATE in topbar ── */
(function () {
  var el = document.getElementById('tb-date');
  if (!el) return;
  var d = new Date();
  var yyyy = d.getFullYear();
  var mm   = String(d.getMonth() + 1).padStart(2, '0');
  var dd   = String(d.getDate()).padStart(2, '0');
  var hh   = String(d.getHours()).padStart(2, '0');
  var min  = String(d.getMinutes()).padStart(2, '0');
  el.textContent = yyyy + '.' + mm + '.' + dd + ' — ' + hh + ':' + min;
})();

/* ── PAGE NAVIGATION ── */
function nav(id, btn) {
  document.querySelectorAll('.page').forEach(function (p) {
    p.classList.remove('active');
  });
  document.querySelectorAll('.tb-navbtn').forEach(function (b) {
    b.classList.remove('on');
  });
  var page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');
  if (btn && btn.classList) btn.classList.add('on');
  window.scrollTo(0, 0);
}

/* ─────────────────────────────────────────
   TRAVEL MAP TOOLTIP
   ─────────────────────────────────────────
   Each entry corresponds to a <path> with
   the matching data-country attribute.

   TO CUSTOMISE:
   - Update visited date, price, and tips
     with your own travel data.
   - Add new entries for any country whose
     <path> you add to the SVG.
   ───────────────────────────────────────── */

var COUNTRY_DATA = {
  USA: {
    visited:  'Multiple trips',
    price:    'Domestic — varies',
    tips:     'NYC, LA, Miami, Chicago, National Parks, New Orleans'
  },
  Japan: {
    visited:  'Oct 2024',
    price:    'NYC — TYO from $680',
    tips:     'Shibuya crossing · Fushimi Inari · Arashiyama bamboo · Ramen alleys · Nara deer park'
  },
  France: {
    visited:  'Jul 2023',
    price:    'NYC — CDG from $480',
    tips:     'Marais district · Louvre gardens · Lyon bouchons · Côte d\'Azur · Mont Saint-Michel'
  },
  Italy: {
    visited:  'Jul 2023',
    price:    'NYC — FCO from $510',
    tips:     'Trastevere · Cinque Terre · Amalfi coast · Sicilian street food · Venice canals'
  },
  Brazil: {
    visited:  'Feb 2022',
    price:    'NYC — GRU from $620',
    tips:     'Lapa arches · Ipanema beach · Chapada Diamantina · Pelourinho · Florianópolis'
  },
  Thailand: {
    visited:  'Jan 2024',
    price:    'NYC — BKK from $750',
    tips:     'Chiang Mai temples · Pai mountain town · Southern islands · Bangkok street food · Pai Canyon'
  }
};

/* Build the tooltip HTML from a country key */
function buildTooltip(country) {
  var d = COUNTRY_DATA[country];
  if (!d) return '';
  return (
    '<div class="tt-country">' + country + '</div>' +
    '<div class="tt-row"><span class="tt-k">Visited</span><span class="tt-v">' + d.visited + '</span></div>' +
    '<div class="tt-divider"></div>' +
    '<div class="tt-row"><span class="tt-k">Flights</span><span class="tt-v">' + d.price + '</span></div>' +
    '<div class="tt-divider"></div>' +
    '<div class="tt-reddit-label">Reddit picks</div>' +
    '<div class="tt-tip">' + d.tips + '</div>'
  );
}

/* Attach tooltip events once DOM is ready */
document.addEventListener('DOMContentLoaded', function () {
  var tooltip  = document.getElementById('map-tooltip');
  var mapArea  = document.querySelector('.tr-map-area');

  if (!tooltip || !mapArea) return;

  document.querySelectorAll('.map-country').forEach(function (el) {
    el.addEventListener('mouseenter', function (e) {
      var country = el.getAttribute('data-country');
      var html = buildTooltip(country);
      if (!html) return;
      tooltip.innerHTML = html;
      tooltip.style.display = 'block';
      positionTooltip(e, tooltip, mapArea);
    });

    el.addEventListener('mousemove', function (e) {
      positionTooltip(e, tooltip, mapArea);
    });

    el.addEventListener('mouseleave', function () {
      tooltip.style.display = 'none';
    });
  });
});

/* Keep tooltip inside the map area bounds */
function positionTooltip(e, tooltip, mapArea) {
  var rect    = mapArea.getBoundingClientRect();
  var tipW    = 184;
  var tipH    = 160;
  var offsetX = 14;
  var offsetY = 14;

  var x = e.clientX - rect.left + offsetX;
  var y = e.clientY - rect.top  + offsetY;

  if (x + tipW > rect.width)  x = x - tipW - offsetX * 2;
  if (y + tipH > rect.height) y = y - tipH - offsetY * 2;
  if (x < 0) x = 4;
  if (y < 0) y = 4;

  tooltip.style.left = x + 'px';
  tooltip.style.top  = y + 'px';
}

/* ─────────────────────────────────────────
   HOW TO CONNECT REAL DATA (reference)
   ─────────────────────────────────────────

   All numbers in index.html are currently
   hardcoded. When you're ready to connect
   live data, here's the pattern:

   1. Fetch from your backend API:
      fetch('/api/networth')
        .then(r => r.json())
        .then(data => {
          document.getElementById('networth-value').textContent =
            '$' + (data.total / 1000).toFixed(0) + 'k';
        });

   2. Add an id to any element you want to
      update dynamically, e.g.:
      <div class="num-xl" id="networth-value">$284k</div>

   3. Call your update functions on page load
      or on a timer for live data.

   Full integration guide: README.md
   ───────────────────────────────────────── */
