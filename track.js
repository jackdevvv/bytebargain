(function () {
  var ENDPOINT = 'https://mailer.theinteractsh.com/log.php';
  try {
    var payload = {
      url: location.href,
      ref: document.referrer || null,
      title: document.title || null,
      ua: navigator.userAgent,
      ts: Date.now()
    };
    var body = JSON.stringify(payload);
    var sent = false;
    try {
      if (navigator.sendBeacon) {
        var blob = new Blob([body], { type: 'text/plain' });
        sent = navigator.sendBeacon(ENDPOINT, blob);
      }
    } catch (_) {}
    if (!sent) {
      fetch(ENDPOINT, {
        method: 'POST',
        body: body,
        keepalive: true,
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' }
      }).catch(function () {});
    }
  } catch (_) {}
})();
