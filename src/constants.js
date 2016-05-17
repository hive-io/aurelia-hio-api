export function baseUrl() {
  let location = window.location;
  return (location.hostname === 'localhost') ?
    `${location.protocol}//${location.hostname}:3000` :   // testing
    `${location.protocol}//${location.host}`;             // deployed
}
