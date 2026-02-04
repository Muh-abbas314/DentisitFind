import { useState, useCallback, useMemo, useEffect } from 'react';
import type { PracticeSummary, PracticeFormPayload, PracticeFormFieldErrors } from '../../types';
import {
  INITIAL_PRACTICE_FORM,
  practiceToFormPayload,
  type CreatePracticeApiState,
} from '../../types';
import { validatePracticeForm, isFormValid } from '../../utils/formValidation';
import AddPracticeForm from './AddPracticeForm';
import Modal from '../Modal/Modal';
import './styles.css';

type PracticeFormModalProps = {
  isOpen: boolean;
  editingPractice: PracticeSummary | null;
  onClose: () => void;
  onSave: (payload: PracticeFormPayload) => Promise<void>;
  onUpdate: (id: string, payload: PracticeFormPayload) => Promise<void>;
  saveState: CreatePracticeApiState;
};

export default function PracticeFormModal({
  isOpen,
  editingPractice,
  onClose,
  onSave,
  onUpdate,
  saveState,
}: PracticeFormModalProps) {
  const isEdit = editingPractice !== null;
  const initialPayload = isEdit ? practiceToFormPayload(editingPractice) : INITIAL_PRACTICE_FORM;

  const [payload, setPayload] = useState<PracticeFormPayload>(initialPayload);
  const [touchedErrors, setTouchedErrors] = useState<PracticeFormFieldErrors>({});

  useEffect(() => {
    if (isOpen) {
      setPayload(isEdit ? practiceToFormPayload(editingPractice) : INITIAL_PRACTICE_FORM);
      setTouchedErrors({});
    }
  }, [isOpen, isEdit, editingPractice]);

  const errors = useMemo(
    () => validatePracticeForm(payload),
    [payload]
  );
  const showErrors = touchedErrors;

  const handleSubmit = useCallback(() => {
    const nextErrors = validatePracticeForm(payload);
    setTouchedErrors(nextErrors);

    if (!isFormValid(nextErrors)) return;

    const done = () => {
      setPayload(INITIAL_PRACTICE_FORM);
      setTouchedErrors({});
      onClose();
    };

    if (isEdit && editingPractice) {
      onUpdate(editingPractice.id, payload).then(done).catch(() => {});
    } else {
      onSave(payload).then(done).catch(() => {});
    }
  }, [payload, isEdit, editingPractice, onSave, onUpdate, onClose]);

  const loading = saveState.status === 'loading';
  const saveError = saveState.status === 'error' ? saveState.message : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit practice' : 'Add practice'}
    >
      <div className="practice-form-modal">
        <p className="practice-form-modal-subtitle">
          {isEdit
            ? 'Update the practice details and metrics below.'
            : 'Enter the practice details and current month metrics.'}
        </p>

        {saveError && (
          <div className="add-practice-view-error" role="alert">
            {saveError}
          </div>
        )}

        <AddPracticeForm
          payload={payload}
          errors={showErrors}
          onChange={setPayload}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
          canSubmit={isFormValid(errors)}
        />
      </div>
    </Modal>
  );
}
