import genDiff from "../src/index";

test('gendiff', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(expected);
  });
