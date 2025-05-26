import React, { useEffect, useState } from "react";

const SignatureValue = (
  setFormData: Function,
  {
    val,
    items,
  }: {
    val: string;
    items: string;
  }
) => {
  console.log(val, items, "subQuestion");
  setFormData((prev: any) =>
    prev.map((quest: any) => {
      if (Array.isArray(quest.questionId)) {
        if (quest.questionId === items) {
          return { ...quest, signatureLink: val };
        } else {
          return quest;
        }
      }

      //
      if (Array.isArray(quest.subQuestion)) {
        const updateQuestion = quest?.subQuestion?.map((subquest: any) => {
          if (subquest?.id === items) {
            return { ...subquest, signatureLink: val };
          } else {
            return subquest;
          }
        });
        return { ...quest, subQuestion: updateQuestion };
      } else {
        return quest;
      }
    })
  );
};

export default SignatureValue;
