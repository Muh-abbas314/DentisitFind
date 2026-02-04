import type { PracticeSummary } from '../../types';
import PracticeSummaryCard from '../PracticeSummaryCard/PracticeSummaryCard';
import './styles.css';

type PracticeListProps = {
  practices: PracticeSummary[];
  onEditPractice?: (practice: PracticeSummary) => void;
};

export default function PracticeList({ practices, onEditPractice }: PracticeListProps) {
  return (
    <div className="dashboard-list">
      <h2 className="dashboard-list-title">All practices</h2>
      <ul className="dashboard-list-grid" aria-label="Practice cards">
        {practices.map((practice) => (
          <li key={practice.id}>
            <PracticeSummaryCard practice={practice} onEdit={onEditPractice} />
          </li>
        ))}
      </ul>
    </div>
  );
}
