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
        (var n 10)
          (switch 
            ((< n 5) "< 5")
            ((> n 5 ) "> 5")
            (else "no")
          )
      )
    `;
    expect(evaParser(code)).toBe('> 5');
  });
  it('function: should can be create functions', () => {
    const { evaParser } = makeSut();
    const code = `
      (begin 
        (var n 2)
          (switch 
            ((< n 5) "< 5")
            ((> n 5 ) "> 5")
            (else "no")
          )
      )
    `;
    expect(evaParser(code)).toBe('< 5');
  });
});
