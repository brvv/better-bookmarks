import { GeneratedId } from "./types";

const separator = "&";

const isNumericDigit = (c: string) => {
  if (c.length !== 1) {
    return false;
  }
  return /\d/.test(c);
};

export const generateItemId = (id: string, type: string): GeneratedId => {
  const generatedId = `${id}${separator}${
    type.length + separator.length
  }${separator}${type}`;
  return generatedId;
};

export const parseGeneratedItemId = (generatedId: GeneratedId) => {
  let typeLength = -1;
  let sepIndex: number | null = null;
  let typeIndex: number | null = null;

  for (let i = 0; i < generatedId.length; i++) {
    const letter = generatedId[i];
    if (letter === separator) {
      if (typeLength <= 0) {
        typeLength = 0;
        sepIndex = i;
        continue;
      }
      if (typeLength > 0 && generatedId.length - i == typeLength) {
        typeIndex = i + 1;
        break;
      }
    }
    if (isNumericDigit(letter) && typeLength >= 0) {
      typeLength = typeLength * 10 + Number(letter);
    } else {
      typeLength = -1;
    }
  }

  if (sepIndex && typeIndex) {
    const originalId = generatedId.slice(0, sepIndex);
    const type = generatedId.slice(typeIndex);
    return { originalId: originalId, type: type };
  }
  throw Error("wrong input");
};
