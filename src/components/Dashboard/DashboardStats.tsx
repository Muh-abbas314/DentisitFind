import type { PracticeSummary } from '../../types';
import { getStatus } from '../../utils/helpers';
import './styles.css';

type DashboardStatsProps = {
  practices: PracticeSummary[];
};

export default function DashboardStats({ practices }: DashboardStatsProps) {
  const highPerformers = practices.filter((p) => getStatus(p.conversionRate) === 'high-performer').length;
  const totalNewPatients = practices.reduce((sum, p) => sum + p.newPatientsThisMonth, 0);

  return (
    <div className="dashboard-stats" role="region" aria-label="Summary statistics">
      <div className="dashboard-stat">
        <span className="dashboard-stat-value">{practices.length}</span>
        <span className="dashboard-stat-label">Practices</span>
      </div>
      <div className="dashboard-stat">
        <span className="dashboard-stat-value">{highPerformers}</span>
        <span className="dashboard-stat-label">High performers</span>
      </div>
      <div className="dashboard-stat">
        <span className="dashboard-stat-value">{totalNewPatients.toLocaleString()}</span>
        <span className="dashboard-stat-label">New patients (this month)</span>
      </div>
    </div>
  );
}
