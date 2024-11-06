export class RefUtil {

  static getPartFromEpisode(input: string): { part: string, episode: string } {
    const lastIndex = input.lastIndexOf('-');
    if (lastIndex === -1) return {part: input, episode: ''};
    const part = input.slice(0, lastIndex);
    const episode = input.slice(lastIndex + 1);
    return { part, episode };
  }

  static getPartFromStoryEventEpisode(input: string): { se: string, episode: string } {
    const [se, episode]= input.split('-');
    return { se, episode };
  }
}
