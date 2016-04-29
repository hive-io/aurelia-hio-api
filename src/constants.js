export function baseUrl() {
  return (window.location.hostname === 'localhost') ?
    'http://' + location.hostname + ':3000' :   // testing
    'http://' + location.host;                  // deployed
}
