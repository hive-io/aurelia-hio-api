export function baseUrl() {
  let location = window.location;
  return location.hostname === 'localhost' ? `${ location.protocol }//${ location.hostname }:3000` : `${ location.protocol }//${ location.host }`;
}