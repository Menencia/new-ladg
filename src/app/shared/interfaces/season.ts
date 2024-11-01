import { Part } from "./part";

export interface Season {
  ref: string;
  title: string;
  parts: Part[];
}

export interface DisplaySeason  {
  ref: string;
  title: string;
  parts: Part[][];
}
