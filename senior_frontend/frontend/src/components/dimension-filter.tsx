import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Dimension = {
  id: string;
  country: string;
  business_unit: string;
};

type DimensionFilterProps = {
  selectedCountry: string;
  selectedBusinessUnit: string;
  onCountryChange: (country: string) => void;
  onBusinessUnitChange: (businessUnit: string) => void;
  dimensions: Dimension[];
};

export const DimensionFilter = ({
  selectedCountry,
  selectedBusinessUnit,
  onCountryChange,
  onBusinessUnitChange,
  dimensions,
}: DimensionFilterProps) => {
  const uniqueCountries = ['All Countries', ...new Set(dimensions.map((d) => d.country))];
  const uniqueBusinessUnits = ['All Business Units', ...new Set(dimensions.map((d) => d.business_unit))];

  return (
    <>
      <Select value={selectedCountry} onValueChange={onCountryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          {uniqueCountries.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedBusinessUnit} onValueChange={onBusinessUnitChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Business Unit" />
        </SelectTrigger>
        <SelectContent>
          {uniqueBusinessUnits.map((businessUnit) => (
            <SelectItem key={businessUnit} value={businessUnit}>
              {businessUnit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
