import TrendChart from '../TrendChart/TrendChart';
import './styles.css';

type CardTrendProps = {
  data: number[];
};

export default function CardTrend({ data }: CardTrendProps) {
  return (
    <div className="trend-section">
      <h3 className="trend-title">6-Month Trend</h3>
      <TrendChart data={data} />
    </div>
  );
}
