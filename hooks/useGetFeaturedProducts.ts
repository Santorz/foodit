import axios from 'axios';
import useSWR from 'swr';
import { sortBy } from 'lodash';

const fetcher = async (url: string) => axios.get(url).then((res) => res.data);

export const useGetFeaturedProducts = (): {
  featuredProducts: Array<{
    prodID: number;
    id: number;
    name: string;
    price: number;
    priority: number;
  }>;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR(
    'http://192.168.8.103:8080/featuredproducts',
    fetcher
  );

  const sortedData: Array<{
    prodID: number;
    id: number;
    name: string;
    price: number;
    priority: number;
  }> = sortBy(data, ['priority']);

  return {
    featuredProducts: sortedData,
    isLoading: !error && !data,
    isError: error,
  };
};
