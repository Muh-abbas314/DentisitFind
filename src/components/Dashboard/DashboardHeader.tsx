import './styles.css';

type DashboardHeaderProps = {
  onAddPractice: () => void;
  /** Optional: show demo controls to switch fetch mode (success / empty / error) */
  showDemoControls?: boolean;
  onFetchModeChange?: (mode: 'success' | 'empty' | 'error') => void;
  currentFetchMode?: 'success' | 'empty' | 'error';
};

export default function DashboardHeader({
  onAddPractice,
  showDemoControls = false,
  onFetchModeChange,
  currentFetchMode = 'success',
}: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header-content">
        <h1 className="dashboard-title">Practice dashboard</h1>
        <p className="dashboard-subtitle">Track performance and add new practices</p>
      </div>
      <div className="dashboard-header-actions">
        {showDemoControls && onFetchModeChange && (
          <div className="dashboard-demo-controls" role="group" aria-label="Simulate API state">
            <span className="dashboard-demo-label">Demo:</span>
            <button
              type="button"
              className={`dashboard-demo-btn ${currentFetchMode === 'success' ? 'active' : ''}`}
              onClick={() => onFetchModeChange('success')}
            >
              Data
            </button>
            <button
              type="button"
              className={`dashboard-demo-btn ${currentFetchMode === 'empty' ? 'active' : ''}`}
              onClick={() => onFetchModeChange('empty')}
            >
              Empty
            </button>
            <button
              type="button"
              className={`dashboard-demo-btn ${currentFetchMode === 'error' ? 'active' : ''}`}
              onClick={() => onFetchModeChange('error')}
            >
              Error
            </button>
          </div>
        )}
        <button type="button" className="dashboard-add-btn" onClick={onAddPractice}>
          Add practice
        </button>
      </div>
    </header>
  );
}
