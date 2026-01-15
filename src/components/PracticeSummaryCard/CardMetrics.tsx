import type { PracticeSummary } from '../../types';
import './styles.css';

type CardMetricsProps = {
  practice: PracticeSummary;
};

export default function CardMetrics({ practice }: CardMetricsProps) {
  return (
    <div className="card-metrics">
      <div className="metric">
        <span className="metric-label">New Patients This Month</span>
        <span className="metric-value">{practice.newPatientsThisMonth}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Appointment Requests</span>
        <span className="metric-value">{practice.appointmentRequests}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Conversion Rate</span>
        <span className="metric-value">{practice.conversionRate.toFixed(1)}%</span>
      </div>
      {practice.marketingSpend !== undefined && (
        <div className="metric">
          <span className="metric-label">Marketing Spend</span>
          <span className="metric-value">${practice.marketingSpend.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}
