import { Evaluator } from 'evaluator';
import { parserCode } from 'tests/main';

const makeSut = () => {
  const sut = new Evaluator();
  return {
    sut,
  };
};

describe('Evaluator', () => {
  it('test parser', () => {
    const { sut } = makeSut();
    //     for (let index = 0; index < 10; index++) {
    //   console.log(index);
    // }

    const code = `
     (begin 
        (for (var x 0)
          (< x 10)

           (begin 
            (set x (+ x 1))
            x
           )

        )
      )
    `;
    const codeParser = parserCode(code);
    expect(sut.eva(codeParser)).toBe(10);
  });
});
