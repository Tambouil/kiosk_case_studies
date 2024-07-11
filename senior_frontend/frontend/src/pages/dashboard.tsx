import { useState, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { formatNumber } from '@/lib/utils';
import { useIndicators } from '@/hooks/useIndicators';
import { useDimensions } from '@/hooks/useDimensions';
import { Header } from '@/components/header';
import { IndicatorCard } from '@/components/indicator-card';
import { DateRangePicker } from '@/components/date-range-picker';
import { DimensionFilter } from '@/components/dimension-filter';
import { Chart } from '@/components/chart';
import { CO2Icon, GenderParityIcon, HeadcountIcon, RevenueIcon } from '@/components/icon';

export const Dashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 1, 1),
  });

  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState('All Business Units');

  const startDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : '2023-01-01';
  const endDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : '2024-01-01';

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

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
  };

  if (isLoadingIndicators || isLoadingDimensions) {
    return <div>Loading...</div>;
  }

  return (
    <main className="relative container max-w-screen-2xl">
      <Header />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="hidden md:flex space-x-4">
            <DimensionFilter
              selectedCountry={selectedCountry}
              selectedBusinessUnit={selectedBusinessUnit}
              onCountryChange={setSelectedCountry}
              onBusinessUnitChange={setSelectedBusinessUnit}
              dimensions={dimensions || []}
            />
          </div>
          <DateRangePicker date={dateRange} onDateChange={handleDateRangeChange} className="hidden lg:flex" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <IndicatorCard title="Total Revenue" value={formatNumber(totalRevenue, 'currency')} icon={<RevenueIcon />} />
          <IndicatorCard
            title="Total CO₂ Emissions"
            value={formatNumber(totalCO2, 'number')}
            description=" kg"
            icon={<CO2Icon />}
          />
          <IndicatorCard
            title="Total Headcount"
            value={formatNumber(totalHeadcount, 'number')}
            icon={<HeadcountIcon />}
          />
          <IndicatorCard
            title="Gender Parity Ratio"
            value={formatNumber(genderParityRatio, 'percent')}
            icon={<GenderParityIcon />}
          />
        </div>
        <Chart />
      </div>
    </main>
  );
};
