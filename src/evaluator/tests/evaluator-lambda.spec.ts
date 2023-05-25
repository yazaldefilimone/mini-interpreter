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
  it('function: support lambda functions', () => {
    const { evaParser } = makeSut();
    const code = `
      (begin 
        (def onClick (callback)
          (begin
            (var x 10)
            (var y 20)
            (callback (+ x y))
          )
        )
        (onClick (lambda (data)(* data 10)))
      )
    `;
    expect(evaParser(code)).toBe((10 + 20) * 10);
  });

  it('function: support auto execute lambda functions', () => {
    const { evaParser } = makeSut();
    const code = `
      (begin 
       ((lambda (x) (* x x)) 2)
      )
    `;
    expect(evaParser(code)).toBe(2 * 2);
  });

  it('function: support save lambda functions in variable', () => {
    const { evaParser } = makeSut();
    const code = `
      (begin 
       (
        var function (lambda (x) (* x x))
       )

       (function 2)
      )
    `;
    expect(evaParser(code)).toBe(2 * 2);
  });
});
