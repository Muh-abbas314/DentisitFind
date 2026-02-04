import type { PracticesApiState, PracticeSummary } from '../../types';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';
import './styles.css';

type DashboardViewProps = {
  apiState: PracticesApiState;
  onRetry: () => void;
  onAddPractice: () => void;
  onEditPractice?: (practice: PracticeSummary) => void;
  showDemoControls?: boolean;
  onFetchModeChange?: (mode: 'success' | 'empty' | 'error') => void;
  currentFetchMode?: 'success' | 'empty' | 'error';
};

export default function DashboardView({
  apiState,
  onRetry,
  onAddPractice,
  onEditPractice,
  showDemoControls = false,
  onFetchModeChange,
  currentFetchMode = 'success',
}: DashboardViewProps) {
  return (
    <div className="dashboard-view">
      <DashboardHeader
        onAddPractice={onAddPractice}
        showDemoControls={showDemoControls}
        onFetchModeChange={onFetchModeChange}
        currentFetchMode={currentFetchMode}
      />
      <DashboardContent
        apiState={apiState}
        onRetry={onRetry}
        onAddPractice={onAddPractice}
        onEditPractice={onEditPractice}
      />
    </div>
  );
}
