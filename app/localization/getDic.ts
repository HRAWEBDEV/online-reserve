import { type SupportedLocales, type Dic } from './locales';

async function getDictionary({
 locale,
 path,
}: {
 locale: SupportedLocales;
 path: string;
}): Promise<Dic> {
 return import(`./${path}/${locale}.json`).then((md) => md.default);
}

export { getDictionary };
