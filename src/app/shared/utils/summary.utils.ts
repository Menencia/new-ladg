export class SummaryUtils {

  static postProcess(html: string): string {
    let res = '';
    res = html.replaceAll('<p>', '<p class="mb-4">');
    res = res.replaceAll('<p part>', '<p class="mb-4 font-bold">');
    return res;
  }
}
