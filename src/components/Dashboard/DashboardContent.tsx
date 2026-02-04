import type { PracticesApiState, PracticeSummary } from '../../types';
import { isPracticesSuccess } from '../../types';
import DashboardStats from './DashboardStats';
import PracticeList from './PracticeList';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';

type DashboardContentProps = {
  apiState: PracticesApiState;
  onRetry: () => void;
  onAddPractice: () => void;
  onEditPractice?: (practice: PracticeSummary) => void;
};

/**
 * Renders the main dashboard body based on API state: loading, error, empty, or list.
 * Keeps DashboardView focused on layout; content branching lives here.
 */
export default function DashboardContent({
  apiState,
  onRetry,
  onAddPractice,
  onEditPractice,
}: DashboardContentProps) {
  if (apiState.status === 'loading') {
    return <LoadingState />;
  }

  if (apiState.status === 'error') {
    return <ErrorState message={apiState.message} onRetry={onRetry} />;
  }

  if (isPracticesSuccess(apiState) && apiState.practices.length === 0) {
    return <EmptyState onAddPractice={onAddPractice} />;
  }

  if (isPracticesSuccess(apiState) && apiState.practices.length > 0) {
    return (
      <>
        <DashboardStats practices={apiState.practices} />
        <PracticeList practices={apiState.practices} onEditPractice={onEditPractice} />
      </>
    );
  }

  return null;
}
