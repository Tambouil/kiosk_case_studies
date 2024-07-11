import { useMemo } from 'react';
import { useIndicators } from '@/hooks/useIndicators';
import { useDimensions } from '@/hooks/useDimensions';

export const useDashboardData = (
  startDate: string,
  endDate: string,
  selectedCountry: string,
  selectedBusinessUnit: string
) => {
  const indicators = ['total_revenue', 'co2_emissions', 'male_headcount', 'female_headcount'];
  const { data: indicatorsData, isLoading: isLoadingIndicators } = useIndicators(startDate, endDate, indicators);
  const { data: dimensions, isLoading: isLoadingDimensions } = useDimensions();

  const filteredData = useMemo(() => {
    if (!indicatorsData || !dimensions) return [];
    return indicatorsData.filter((item) => {
      const dimension = dimensions.find((d) => d.id === item.dimension);
      return (
        (selectedCountry === 'All Countries' || dimension?.country === selectedCountry) &&
        (selectedBusinessUnit === 'All Business Units' || dimension?.business_unit === selectedBusinessUnit)
      );
    });
  }, [indicatorsData, dimensions, selectedCountry, selectedBusinessUnit]);

  const totalRevenue = useMemo(
    () => filteredData.filter((item) => item.indicator === 'total_revenue').reduce((sum, item) => sum + item.value, 0),
    [filteredData]
  );

  const totalCO2 = useMemo(
    () => filteredData.filter((item) => item.indicator === 'co2_emissions').reduce((sum, item) => sum + item.value, 0),
    [filteredData]
  );

  const totalHeadcount = useMemo(() => {
    const maleHeadcount = filteredData
      .filter((item) => item.indicator === 'male_headcount')
      .reduce((sum, item) => sum + item.value, 0);
    const femaleHeadcount = filteredData
      .filter((item) => item.indicator === 'female_headcount')
      .reduce((sum, item) => sum + item.value, 0);
    return maleHeadcount + femaleHeadcount;
  }, [filteredData]);

  const genderParityRatio = useMemo(() => {
    const femaleHeadcount = filteredData
      .filter((item) => item.indicator === 'female_headcount')
      .reduce((sum, item) => sum + item.value, 0);
    return totalHeadcount > 0 ? femaleHeadcount / totalHeadcount : 0;
  }, [filteredData, totalHeadcount]);

  return {
    isLoading: isLoadingIndicators || isLoadingDimensions,
    totalRevenue,
    totalCO2,
    totalHeadcount,
    genderParityRatio,
    dimensions,
    filteredData,
  };
};
