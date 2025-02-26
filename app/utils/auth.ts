import { getCookie, setCookie } from './cookie';

const ottAuthCookieName = 'ott-token';

function getOttToken() {
 const val = getCookie(ottAuthCookieName);
 return val;
}

function expireOttToken() {
 setCookie({
  name: ottAuthCookieName,
  value: '',
  expireDays: -1,
 });
}

function saveOttToken({
 value,
 expireDays,
}: {
 value: string;
 expireDays: number;
}) {
 setCookie({
  name: ottAuthCookieName,
  value,
  expireDays,
 });
}

export { getOttToken, expireOttToken, saveOttToken };
