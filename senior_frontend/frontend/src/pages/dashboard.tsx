import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { formatNumber } from '@/lib/utils';
import { useDashboardData } from '@/hooks/useDashboardData';
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

  const { isLoading, totalRevenue, totalCO2, totalHeadcount, genderParityRatio, dimensions } = useDashboardData(
    startDate,
    endDate,
    selectedCountry,
    selectedBusinessUnit
  );

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
  };

  if (isLoading) {
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
