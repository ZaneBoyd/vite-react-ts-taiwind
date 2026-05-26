import { apiClient } from './apiClient';
import type { Product } from '../types/store';
export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>('/products');
  return data;
};
