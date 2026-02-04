import './styles.css';

export default function LoadingState() {
  return (
    <div className="dashboard-loading" aria-busy="true" aria-label="Loading practices">
      <div className="dashboard-loading-skeleton" />
      <div className="dashboard-loading-skeleton" />
      <div className="dashboard-loading-skeleton" />
    </div>
  );
}
