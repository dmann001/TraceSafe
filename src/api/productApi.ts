import api from './config';

export const getProductDetails = async (productId: string) => {
  try {
    const response = await api.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 