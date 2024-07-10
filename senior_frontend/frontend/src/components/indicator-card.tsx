import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type IndicatorCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
};

export const IndicatorCard = ({ title, value, description, icon }: IndicatorCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 capitalize">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
          {description && <span className="text-xs font-medium">{description}</span>}
        </div>
      </CardContent>
    </Card>
  );
};
