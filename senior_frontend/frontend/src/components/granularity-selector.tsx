import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface GranularitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const GranularitySelector = ({ value, onChange }: GranularitySelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto flex h-8 capitalize">
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          {value}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle granularity</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          key="monthly"
          checked={value === 'monthly'}
          onCheckedChange={() => onChange('monthly')}
        >
          Monthly
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem key="yearly" checked={value === 'yearly'} onCheckedChange={() => onChange('yearly')}>
          Yearly
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
