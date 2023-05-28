import { Evaluator } from 'evaluator';
import { parserCode } from 'tests/main';

const makeSut = () => {
  const sut = new Evaluator();
  return {
    sut,
  };
};

describe('Evaluator', () => {
  it('object oriented programming', () => {
    const { sut } = makeSut();
    const code = `
    (begin 
      (class Math null 
        (begin
          (def constructor (this x y)
            (begin
              (set (prop this x) x)
              (set (prop this y) y)
            )
          )

          (def calc (this)
            (+ (prop this x) (prop this y))
          )
        ))
    
      (var math (new Math 10 20))

      ((prop math calc) math)
    )

    `;
    const codeParser = parserCode(code);
    expect(sut.eva(codeParser)).toBe(30);
  });
});
