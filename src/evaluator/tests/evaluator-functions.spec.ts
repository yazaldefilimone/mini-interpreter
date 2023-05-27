import { Evaluator } from 'evaluator';
import { parserCode } from 'tests/main';

const makeSut = () => {
  const sut = new Evaluator();
  const evaParser = (code: string) => sut.eva(parserCode(code));
  return {
    sut,
    evaParser,
  };
};

describe('Evaluator', () => {
  it('function: should can be create functions', () => {
    const { evaParser } = makeSut();
    const code = `
      (begin 
        (def sum (x)
          (+ x x)
        )
        (sum 10)
      )
    `;
    expect(evaParser(code)).toBe(10 + 10);
  });
  it('function: should can be possible use clojure functions', () => {
    const { evaParser } = makeSut();
    const code = `
      (begin 
        (var global 10)

        (def clojure (y x)
          (begin
            (var sum (+ y x))
            (def fnr (n)
             (+ (+ sum n) global)
            )
            fnr
          )
        )

        (var fn (clojure 1 2))
        (fn 3)
      )
    `;
    expect(evaParser(code)).toBe(10 + 1 + 2 + 3);
  });
});
