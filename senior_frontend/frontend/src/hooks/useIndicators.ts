import { useQuery } from '@tanstack/react-query';

type Indicator = {
  date: string;
  dimension: string;
  indicator: string;
  value: number;
};

const fetchIndicators = async (start: string, end: string, indicators: string[]): Promise<Indicator[]> => {
  const indicatorsQuery = indicators.map((indicator) => `indicators=${indicator}`).join('&');
  const url = `${import.meta.env.VITE_API_URL}/indicators?start=${start}&end=${end}&${indicatorsQuery}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

export const useIndicators = (start: string, end: string, indicators: string[]) => {
  return useQuery({
    queryKey: ['indicators', start, end, ...indicators],
    queryFn: () => fetchIndicators(start, end, indicators),
  });
};
