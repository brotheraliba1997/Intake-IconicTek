export interface MenuItemType {
  label: string;
  path: string;
  icons: string;
  subItems?: { label: string; path: string }[];
}

export type AnswerData = {
  questionId: string;
  value: string;
  multipleValue: string[];
  type: string;
};
