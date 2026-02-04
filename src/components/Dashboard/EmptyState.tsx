import './styles.css';

type EmptyStateProps = {
  onAddPractice: () => void;
};

export default function EmptyState({ onAddPractice }: EmptyStateProps) {
  return (
    <div className="dashboard-empty" role="status">
      <div className="dashboard-empty-icon" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      </div>
      <h2 className="dashboard-empty-title">No practices yet</h2>
      <p className="dashboard-empty-message">
        Add your first practice to start tracking new patients, conversion rates, and trends.
      </p>
      <button type="button" className="dashboard-empty-cta" onClick={onAddPractice}>
        Add your first practice
      </button>
    </div>
  );
}
