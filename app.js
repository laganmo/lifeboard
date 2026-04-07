/* ─────────────────────────────────────────
   LIFEBOARD — app.js
   ───────────────────────────────────────── */

/* Live date */
(function () {
  var el = document.getElementById('tb-date');
  if (!el) return;
  var d = new Date();
  var pad = function(n){ return String(n).padStart(2,'0'); };
  el.textContent =
    d.getFullYear() + '.' + pad(d.getMonth()+1) + '.' + pad(d.getDate()) +
    ' — ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
})();

/* Navigation */
function nav(id, btn) {
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.tb-navbtn').forEach(function(b){ b.classList.remove('on'); });
  var page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');
  if (btn && btn.classList) btn.classList.add('on');
  window.scrollTo(0, 0);
}

/* ── Travel map tooltip data ──
   Update these with your real trips.        */
var COUNTRY_DATA = {
  'USA': {
    visited: 'Multiple trips',
    price:   'Domestic — varies',
    tips:    'NYC · LA · Miami · Chicago · National Parks · New Orleans'
  },
  'Japan': {
    visited: 'Oct 2024',
    price:   'NYC — TYO from $680',
    tips:    'Shibuya crossing · Fushimi Inari · Arashiyama · Ramen alleys · Nara deer park'
  },
  'France': {
    visited: 'Jul 2023',
    price:   'NYC — CDG from $480',
    tips:    'Le Marais · Louvre gardens · Lyon bouchons · Côte d\'Azur · Mont Saint-Michel'
  },
  'Italy': {
    visited: 'Jul 2023',
    price:   'NYC — FCO from $510',
    tips:    'Trastevere · Cinque Terre · Amalfi coast · Sicily street food · Venice canals'
  },
  'Brazil': {
    visited: 'Feb 2022',
    price:   'NYC — GRU from $620',
    tips:    'Lapa arches · Ipanema · Chapada Diamantina · Pelourinho · Florianópolis'
  },
  'Thailand': {
    visited: 'Jan 2024',
    price:   'NYC — BKK from $750',
    tips:    'Chiang Mai temples · Pai · Southern islands · Bangkok street food · Pai Canyon'
  }
};

function buildTooltip(country) {
  var d = COUNTRY_DATA[country];
  if (!d) return '';
  return '<div class="tt-country">' + country + '</div>' +
    '<div class="tt-row"><span class="tt-k">Visited</span><span class="tt-v">' + d.visited + '</span></div>' +
    '<div class="tt-div"></div>' +
    '<div class="tt-row"><span class="tt-k">Flights</span><span class="tt-v">' + d.price + '</span></div>' +
    '<div class="tt-div"></div>' +
    '<div class="tt-reddit">Reddit picks</div>' +
    '<div class="tt-tips">' + d.tips + '</div>';
}

document.addEventListener('DOMContentLoaded', function () {
  var tooltip = document.getElementById('map-tooltip');
  var mapWrap = document.querySelector('.tr-map-svg-wrap');
  if (!tooltip || !mapWrap) return;

  document.querySelectorAll('.map-country').forEach(function (el) {
    el.addEventListener('mouseenter', function (e) {
      var html = buildTooltip(el.getAttribute('data-country'));
      if (!html) return;
      tooltip.innerHTML = html;
      tooltip.style.display = 'block';
      place(e);
    });
    el.addEventListener('mousemove', place);
    el.addEventListener('mouseleave', function () {
      tooltip.style.display = 'none';
    });
  });

  function place(e) {
    var r = mapWrap.getBoundingClientRect();
    var W = 194, H = 170, ox = 16, oy = 16;
    var x = e.clientX - r.left + ox;
    var y = e.clientY - r.top  + oy;
    if (x + W > r.width)  x -= W + ox * 2;
    if (y + H > r.height) y -= H + oy * 2;
    tooltip.style.left = Math.max(4, x) + 'px';
    tooltip.style.top  = Math.max(4, y) + 'px';
  }
});
