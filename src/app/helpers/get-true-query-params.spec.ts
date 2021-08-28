import { IQueriesParams } from '../index';

import { getTrueQueryParams } from './get-true-query-params';

describe('testing function', () => {
  let testQueries: IQueriesParams = {
    genre: 'Western',
    authorName: 'Nona Brekke',
    minPrice: 0,
    maxPrice: 1000,
    authorId: 1,
    randomKey: '123123123',
  };

  it('should be expectedQueries', () => {
    testQueries = getTrueQueryParams(testQueries);

    const expectedQueries = {
      'q[genres_name_cont]': 'Western',
      'q[name_cont]': 'Nona Brekke',
      'q[price_gteq]': 0,
      'q[price_lteq]': 1000,
      authorId: 1,
      randomKey: '123123123',
    };

    expect(testQueries).toEqual(expectedQueries);
  });
});