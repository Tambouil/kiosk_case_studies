import { useQuery } from '@tanstack/react-query';

type Dimension = {
  id: string;
  country: string;
  business_unit: string;
};

const fetchDimensions = async (): Promise<Dimension[]> => {
  const url = `${import.meta.env.VITE_API_URL}/dimensions`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

export const useDimensions = () => {
  return useQuery({
    queryKey: ['dimensions'],
    queryFn: fetchDimensions,
  });
};
