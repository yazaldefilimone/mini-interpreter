import { Evaluator } from 'evaluator';
import { parserCode } from 'tests/main';

const makeSut = () => {
  const sut = new Evaluator();
  return {
    sut,
  };
};

describe('Evaluator', () => {
  it('sort suga expression', () => {
    const { sut } = makeSut();
    const tests = [
      {
        input: `(begin
                  (var y 10) 
                  (++ y)
                )`,
        outPut: 11,
      },
      {
        input: `(begin
                  (var y 10) 
                  (-- y)
                )
                `,
        outPut: 9,
      },
      {
        input: `(begin
                  (var y 10) 
                  (+= y 20)
                )`,
        outPut: 10 + 20,
      },
      {
        input: `(begin
                  (var y 10) 
                  (-= y 5)
                )`,
        outPut: 10 - 5,
      },
    ];
    const code = `(begin (var y 10) y)`;
    for (const iterator of tests) {
      const codeParser = parserCode(iterator.input);
      expect(sut.eva(codeParser)).toBe(iterator.outPut);
    }
  });
});
