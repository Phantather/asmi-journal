export type Lang = number;

export interface LangItem {
  value: Lang;
  label: string;
}

export interface LangList extends Array<LangItem> {}
