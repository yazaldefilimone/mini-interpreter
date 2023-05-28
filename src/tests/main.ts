import parser from '../parser/parser.js';

export const parserCode = (code: string) => {
  const exp = parser.parse(`(begin ${code})`);
  return exp;
};
