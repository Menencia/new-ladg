export interface Season {
  ref: string;
  title: string;
  parts: {
    date: string;
    ref: string;
    title: string;
    yt: string;
  }[];
}
