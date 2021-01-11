import React from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { act, renderHook } from '@testing-library/react-hooks';

const totoQuery = gql`query toto { id }`;
const useToto = () => useLazyQuery(totoQuery);

describe('useToto', () => {
  const mock = {
    request: {
      query: totoQuery,
    },
    result: {
      data: { id: 1 },
    },
  };

  it('should handle loading states', async () => {
    const { result } = renderHook(() => useToto(), {
      wrapper: ({ children }) => <MockedProvider mocks={[mock]}>{children}</MockedProvider>
    });

    expect(result.current[1].loading).toBe(false);

    act(() => result.current[0]());

    expect(result.current[1].loading).toBe(true);

    await act(() => new Promise(resolve => setTimeout(resolve, 0)));

    expect(result.current[1].loading).toBe(false);
  });
});
