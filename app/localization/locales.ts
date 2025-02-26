type Dic = {
 [key: string]: string | Dic;
};

type WithDic = {
 dic: Dic;
};

const locales = {
 fa: {
  dir: 'rtl',
  langAlias: 'fa',
  lang: 'persian',
  calendar: 'jalali',
  extension: 'IR',
  short: 'فا',
  long: 'فارسی',
 },
} as const;

type SupportedLocales = keyof typeof locales;

export { type Dic, type WithDic, type SupportedLocales, locales };
