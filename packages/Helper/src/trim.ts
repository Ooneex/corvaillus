export const trim = (text: string, char: string): string => {
  const reg = new RegExp("^" + char + "+|" + char + "+$", "g");

  return text.replace(reg, "");
};
