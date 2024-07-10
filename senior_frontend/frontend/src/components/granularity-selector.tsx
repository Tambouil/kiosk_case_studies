import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GranularitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const GranularitySelector = ({ value, onChange }: GranularitySelectorProps) => {
  return (
    <Select defaultValue={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Toggle granularity" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="monthly">Monthly</SelectItem>
        <SelectItem value="yearly">Yearly</SelectItem>
      </SelectContent>
    </Select>
  );
};
