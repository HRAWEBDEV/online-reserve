const setCookie = ({
 name,
 value,
 expireDays,
}: {
 name: string;
 value: string;
 expireDays: number;
}): void => {
 const date = new Date();
 date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
 const expireDateUTCString = `expires=${date.toUTCString()}`;
 document.cookie = `${name}=${value};${expireDateUTCString};path=/`;
};

const getCookie = (name: string): string => {
 let value = '';
 const decodedCookie = decodeURIComponent(document.cookie);
 const cookieSegments = decodedCookie.split(';');
 for (let i = 0; i < cookieSegments.length; i++) {
  const segmentPairs = cookieSegments[i].split('=');
  const matchedName = segmentPairs[0].trim() == name;
  if (matchedName) {
   value = segmentPairs[1];
   break;
  }
 }
 return value;
};

export { setCookie, getCookie };
