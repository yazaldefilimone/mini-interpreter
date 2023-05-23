import parser from "../parser/parser.js";

export const parserCode = (code: string) => {
  const exp = parser.parse(code);
  return exp;
};
