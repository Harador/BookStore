import { filteredQueryParams } from './filter-query-params';

describe('test function', () => {
  let testQueries: any = {
    genre: 'Western',
    authorName: '',
    minPrice: null,
    maxPrice: 1000,
    authorId: undefined,
    randomKey: '123123123',
  };

  it('should del empty property', () => {
    testQueries = filteredQueryParams(testQueries);

    const expectedQueries = {
      genre: 'Western',
      maxPrice: 1000,
      randomKey: '123123123',
    };

    expect(testQueries).toEqual(expectedQueries);
  });
});
