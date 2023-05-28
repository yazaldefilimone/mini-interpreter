import Parser from './parser/parser.js';
import { Evaluator } from 'evaluator';
import fs from 'fs';

function main(argv: string[]) {
  const [_node, _path, file] = argv;
  if (file && file.endsWith('.eva')) {
    const evaluator = new Evaluator();

    const src = fs.readFileSync(file, 'utf-8');
    const exp = Parser.parse(`(begin ${src})`);
    const evaluated = evaluator.evaGlobal(exp);
    return evaluated;
  }
}

main(process.argv);
