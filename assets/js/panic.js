/* Panic button: confirm → get GPS → POST /api/panic → show result.
   Always shows Call 911 and Quick Exit. Never blocks on location. */
(function () {
  'use strict';
  var btn = document.getElementById('panic-btn');
  var modal = document.getElementById('panic-modal');
  if (!btn || !modal) return;

  var steps = {
    confirm: modal.querySelector('[data-step="confirm"]'),
    sending: modal.querySelector('[data-step="sending"]'),
    sent: modal.querySelector('[data-step="sent"]'),
    failed: modal.querySelector('[data-step="failed"]')
  };
  var sendBtn = modal.querySelector('#panic-send');
  var cancelBtn = modal.querySelector('#panic-cancel');
  var locStatus = modal.querySelector('#panic-loc');
  var sentId = modal.querySelector('#panic-id');
  var failMsg = modal.querySelector('#panic-fail');
  var loc = null, locDone = false, locPromise = null;

  function show(step) {
    Object.keys(steps).forEach(function (k) { steps[k].hidden = k !== step; });
  }
  function open() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    show('confirm');
    sendBtn.disabled = false;
    locStatus.textContent = 'Getting your location…';
    loc = null; locDone = false;
    locPromise = getLocation();
    sendBtn.focus();
  }
  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  function getLocation() {
    return new Promise(function (resolve) {
      if (!('geolocation' in navigator)) { locDone = true; locStatus.textContent = 'Location not available on this device. Alert will send without it.'; return resolve(null); }
      var done = false;
      var finish = function (val, msg) { if (done) return; done = true; locDone = true; loc = val; locStatus.textContent = msg; resolve(val); };
      navigator.geolocation.getCurrentPosition(function (p) {
        finish({ lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy },
               'Location found (within ' + Math.round(p.coords.accuracy) + ' m).');
      }, function (err) {
        finish(null, err.code === 1
          ? 'Location permission denied. Alert will send without it. Tell the team where you are if you can.'
          : 'Could not get location. Alert will send without it.');
      }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 });
      setTimeout(function () { finish(null, 'Location is taking too long. Alert will send without it.'); }, 13000);
    });
  }

  async function send() {
    sendBtn.disabled = true;
    show('sending');
    if (!locDone) { await Promise.race([locPromise, new Promise(function (r) { setTimeout(r, 8000); })]); }
    var payload = {
      lat: loc ? loc.lat : null, lng: loc ? loc.lng : null, accuracy: loc ? loc.accuracy : null,
      name: (modal.querySelector('#panic-name') || {}).value || '',
      phone: (modal.querySelector('#panic-phone') || {}).value || '',
      note: (modal.querySelector('#panic-note') || {}).value || '',
      website: (modal.querySelector('#panic-website') || {}).value || ''
    };
    try {
      var r = await fetch('/api/panic', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      var j = await r.json().catch(function () { return {}; });
      if (r.ok && j.ok) {
        sentId.textContent = j.id || '';
        show('sent');
      } else {
        failMsg.textContent = r.status === 429 ? 'Too many alerts sent from this device. Call 911 now.'
          : r.status === 503 ? 'The alert system is not turned on yet. Call 911 now.'
          : 'The alert could not be delivered. Call 911 now.';
        show('failed');
      }
    } catch (e) {
      failMsg.textContent = 'No connection. Call 911 now.';
      show('failed');
    }
  }

  btn.addEventListener('click', open);
  if (/[?&]panic=1/.test(location.search)) { open(); history.replaceState(null, '', '/'); }
  sendBtn.addEventListener('click', send);
  cancelBtn.addEventListener('click', close);
  modal.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', close); });
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
})();
