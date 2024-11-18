export class LangUtils {

  static isValidVideoLang(lang: string): boolean {
    return ['en', 'fr'].includes(lang);
  }

  static isValidUILang(lang: string): boolean {
    return ['en', 'fr'].includes(lang);
  }

  static determineLang(savedLang: string | null, browserLang?: string): string {
    let determinedLang = 'en';
    let getLang = savedLang ?? browserLang;
    if (getLang && LangUtils.isValidUILang(getLang)) {
      determinedLang = getLang;
    }
    localStorage.setItem('lang', determinedLang);
    return determinedLang;
  }
}
