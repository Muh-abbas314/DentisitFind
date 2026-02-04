import { useState, useCallback, useEffect } from 'react';
import type {
  PracticesApiState,
  CreatePracticeApiState,
  PracticeFormPayload,
  PracticeSummary,
} from './types';
import { isPracticesSuccess } from './types';
import DashboardView from './components/Dashboard/DashboardView';
import PracticeFormModal from './components/AddPracticeForm/PracticeFormModal';
import { getPractices, createPractice as createPracticeApi, updatePractice as updatePracticeApi } from './api/mockApi';
import type { FetchPracticesMode } from './api/mockApi';
import './App.css';

function App() {
  const [practicesApiState, setPracticesApiState] = useState<PracticesApiState>({ status: 'idle' });
  const [fetchMode, setFetchMode] = useState<FetchPracticesMode>('success');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPractice, setEditingPractice] = useState<PracticeSummary | null>(null);
  const [saveState, setSaveState] = useState<CreatePracticeApiState>({ status: 'idle' });

  const loadPractices = useCallback(() => {
    setPracticesApiState({ status: 'loading' });
    getPractices(fetchMode)
      .then((practices) => {
        setPracticesApiState({ status: 'success', practices });
      })
      .catch((err: Error) => {
        setPracticesApiState({ status: 'error', message: err.message });
      });
  }, [fetchMode]);

  useEffect(() => {
    const id = setTimeout(() => loadPractices(), 0);
    return () => clearTimeout(id);
  }, [loadPractices]);

  const handleSave = useCallback(async (payload: PracticeFormPayload) => {
    setSaveState({ status: 'loading' });
    try {
      const practice = await createPracticeApi(payload);
      setSaveState({ status: 'success', practice });
      setPracticesApiState((prev) =>
        isPracticesSuccess(prev)
          ? { status: 'success', practices: [...prev.practices, practice] }
          : prev
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not add practice.';
      setSaveState({ status: 'error', message });
      throw err;
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, payload: PracticeFormPayload) => {
    setSaveState({ status: 'loading' });
    try {
      const practice = await updatePracticeApi(id, payload);
      setSaveState({ status: 'success', practice });
      setPracticesApiState((prev) =>
        isPracticesSuccess(prev)
          ? {
              status: 'success',
              practices: prev.practices.map((p) => (p.id === id ? practice : p)),
            }
          : prev
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not update practice.';
      setSaveState({ status: 'error', message });
      throw err;
    }
  }, []);

  const openAddModal = useCallback(() => {
    setEditingPractice(null);
    setSaveState({ status: 'idle' });
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((practice: PracticeSummary) => {
    setEditingPractice(practice);
    setSaveState({ status: 'idle' });
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingPractice(null);
    setSaveState({ status: 'idle' });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-brand">Dentist Find</h1>
      </header>
      <main className="app-main">
        <DashboardView
          apiState={practicesApiState}
          onRetry={loadPractices}
          onAddPractice={openAddModal}
          onEditPractice={openEditModal}
          showDemoControls
          onFetchModeChange={setFetchMode}
          currentFetchMode={fetchMode}
        />
      </main>

      <PracticeFormModal
        isOpen={modalOpen}
        editingPractice={editingPractice}
        onClose={closeModal}
        onSave={handleSave}
        onUpdate={handleUpdate}
        saveState={saveState}
      />
    </div>
  );
}

export default App;
