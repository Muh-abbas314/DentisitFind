import type { PracticeSummary } from '../../types';
import { getStatus } from '../../utils/helpers';
import CardHeader from './CardHeader';
import CardMetrics from './CardMetrics';
import CardTrend from './CardTrend';
import CardRecommendations from './CardRecommendations';
import './styles.css';

type PracticeSummaryCardProps = {
  practice: PracticeSummary;
};

export default function PracticeSummaryCard({ practice }: PracticeSummaryCardProps) {
  const status = getStatus(practice.conversionRate);

  return (
    <div className={`practice-card status-${status}`}>
      <CardHeader
        name={practice.name}
        city={practice.city}
        country={practice.country}
        status={status}
      />
      <CardMetrics practice={practice} />
      <CardTrend data={practice.monthlyTrend} />
      <CardRecommendations />
    </div>
  );
}
