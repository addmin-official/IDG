import { DICTIONARY } from '../../mockData';

export function getDictionaryByLang(lang: 'en' | 'ar' | 'ku') {
  return DICTIONARY[lang] || DICTIONARY['en'];
}

export default DICTIONARY;
