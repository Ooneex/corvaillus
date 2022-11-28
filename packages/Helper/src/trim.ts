export const trim = (text: string, char = " "): string => {
  const reg = new RegExp("^" + char + "+|" + char + "+$", "g");

  return text.replace(reg, "");
};
