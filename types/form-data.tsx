export type Option = {
  label: string;
  value: string;
  [key: string]: any; // for any additional fields
};

type Question = {
  SubQuestion: any[];
  coloum: any[];
  id: string;
  options: Option[];
  title: string;
  type: string;
};

export type FormQuestions = {
  arrangement: number;
  createdAt: string;
  formId: string;
  id: string;
  question: Question;
  questionId: string;
  questionTestId: string | null;
  title: string | null;
  type: string | null;
};

export type FormData = {
  formQuestions: FormQuestions[];
  createdAt: string;
  id: string;
  title: string;
};
