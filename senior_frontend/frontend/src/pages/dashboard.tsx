import { useState, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { formatNumber } from '@/lib/utils';
import { useIndicators } from '@/hooks/useIndicators';
import { useDimensions } from '@/hooks/useDimensions';
import { Header } from '@/components/header';
import { IndicatorCard } from '@/components/indicator-card';
import { DateRangePicker } from '@/components/date-range-picker';
import { GranularitySelector } from '@/components/granularity-selector';
import { DimensionFilter } from '@/components/dimension-filter';

export const Dashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 1, 1),
  });
  const [granularity, setGranularity] = useState('monthly');
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
            <GranularitySelector value={granularity} onChange={setGranularity} />
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
          <IndicatorCard
            title="Total Revenue"
            value={formatNumber(totalRevenue, 'currency')}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
          <IndicatorCard
            title="Total CO₂ Emissions"
            value={formatNumber(totalCO2, 'number')}
            description=" kg"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 text-muted-foreground"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
                />
              </svg>
            }
          />
          <IndicatorCard
            title="Total Headcount"
            value={formatNumber(totalHeadcount, 'number')}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <IndicatorCard
            title="Gender Parity Ratio"
            value={formatNumber(genderParityRatio, 'percent')}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <circle cx="6" cy="4" r="2"></circle>
                <path d="M9 7H3a1 1 0 0 0-1 1v7h2v7h4v-7h2V8a1 1 0 0 0-1-1z"></path>
                <circle cx="17" cy="4" r="2"></circle>
                <path d="M20.21 7.73a1 1 0 0 0-1-.73h-4.5a1 1 0 0 0-1 .73L12 14h2l-1 4h2v4h4v-4h2l-1-4h2z"></path>
              </svg>
            }
          />
        </div>
      </div>
    </main>
  );
};
