import { useDimensions } from '@/hooks/useDimensions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type DimensionFilterProps = {
  selectedDimensions: Record<string, string>;
  onDimensionsChange: (dimensions: Record<string, string>) => void;
};

export const DimensionFilter = ({ selectedDimensions, onDimensionsChange }: DimensionFilterProps) => {
  const { data } = useDimensions();

  const handleChange = (key: string, value: string) => {
    onDimensionsChange({ ...selectedDimensions, [key]: value });
  };

  const uniqueCountries = [...new Set(data?.map((dimension) => dimension.country))];
  const uniqueBusinessUnits = [...new Set(data?.map((dimension) => dimension.business_unit))];

  return (
    <>
      <Select defaultValue="All Countries" onValueChange={(value) => handleChange('country', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Countries">All Countries</SelectItem>
          {uniqueCountries.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="All Business Units" onValueChange={(value) => handleChange('business_unit', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Business Unit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Business Units">All Business Units</SelectItem>
          {uniqueBusinessUnits.map((business_unit) => (
            <SelectItem key={business_unit} value={business_unit}>
              {business_unit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
