export class LangUtils {

  static isValidVideoLang(lang: string): boolean {
    return ['en', 'fr'].includes(lang);
  }

  static isValidUILang(lang: string): boolean {
    return ['en', 'fr'].includes(lang);
  }

  static determineLang(savedLang: string | null, browserLang: string | undefined): string {
    let determinedLang = 'en';
    let getLang = savedLang ?? browserLang;
    if (getLang && LangUtils.isValidUILang(getLang)) {
      determinedLang = getLang;
    }
    return determinedLang;
  }
}
