import React from "react";

const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  formData: any[],
  setFormData: Function,
  {
    questionId,
    optionId,
    isMultiple,
    type = "text",
    subQuestionId,
  }: {
    questionId: string;
    optionId: string | null;
    isMultiple: boolean;
    type?: string;
    subQuestionId: string | null;
  }
) => {
  const { value } = e.target;

  const arrayfound = formData?.map((quest: any) => {
    if (quest.questionId === questionId) {
      if (type === "radio") {
        return { ...quest, value: optionId };
      }
      let subQuestionFound = [];
      let multipleValue = [];
      if (subQuestionId) {
        subQuestionFound = quest?.subQuestion?.map((subQues: any) => {
          if (subQues?.id === subQuestionId) {
            if (type === "radio") {
              return { ...subQues, value: optionId };
            } else {
              let multipleValue = subQues.multipleValue;
              const optionFound = multipleValue?.find(
                (option: any) => option === optionId
              );
              if (optionFound) {
                multipleValue = multipleValue.filter(
                  (val: any) => val !== optionId
                );
              } else {
                multipleValue.push(optionId);
              }
              return { ...subQues, multipleValue };
            }
          } else {
            return subQues;
          }
        });
      } else {
        multipleValue = quest.multipleValue;
        const optionFound = multipleValue?.find(
          (option: any) => option === optionId
        );
        if (optionFound) {
          multipleValue = multipleValue.filter((val: any) => val !== optionId);
        } else {
          multipleValue.push(optionId);
        }
      }

      if (isMultiple) {
        return { ...quest, multipleValue, subQuestion: subQuestionFound };
      } else {
        return { ...quest, value, subQuestion: subQuestionFound };
      }
    } else {
      return quest;
    }
  });

  setFormData(arrayfound);
};

export default handleChange;
