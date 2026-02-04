import './styles.css';

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="dashboard-error" role="alert">
      <div className="dashboard-error-icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="dashboard-error-title">Something went wrong</h2>
      <p className="dashboard-error-message">{message}</p>
      <button type="button" className="dashboard-error-retry" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
