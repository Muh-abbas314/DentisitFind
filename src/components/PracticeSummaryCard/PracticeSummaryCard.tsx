import type { PracticeSummary } from '../../types';
import { getStatus } from '../../utils/helpers';
import CardHeader from './CardHeader';
import CardMetrics from './CardMetrics';
import CardTrend from './CardTrend';
import CardRecommendations from './CardRecommendations';
import './styles.css';

type PracticeSummaryCardProps = {
  practice: PracticeSummary;
  onEdit?: (practice: PracticeSummary) => void;
};

export default function PracticeSummaryCard({ practice, onEdit }: PracticeSummaryCardProps) {
  const status = getStatus(practice.conversionRate);

  return (
    <div className={`practice-card status-${status}`}>
      <CardHeader
        name={practice.name}
        city={practice.city}
        country={practice.country}
        phone={practice.phone}
        status={status}
      />
      <CardMetrics practice={practice} />
      <CardTrend data={practice.monthlyTrend} />
      <CardRecommendations />
      {onEdit && (
        <button
          type="button"
          className="practice-card-edit"
          onClick={() => onEdit(practice)}
        >
          Edit
        </button>
      )}
    </div>
  );
}
