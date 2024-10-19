import { haveNoDuplicates } from "../src/arrayutils";

describe('haveNoDuplicates', () => {
  test('got duplicate', () => {
    const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const arr2 = [{ id: 4 }, { id: 5 }, { id: 6 }, { id: 1 }];
    const result = haveNoDuplicates(arr1, arr2, 'id');
    expect(result).toBe(false);
  });

  test('no duplicate', () => {
    const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const arr2 = [{ id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }];
    const result = haveNoDuplicates(arr1, arr2, 'id');
    expect(result).toBe(true);
  });
});
