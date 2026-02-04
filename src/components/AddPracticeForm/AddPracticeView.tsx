import { useState, useCallback, useMemo } from 'react';
import type { PracticeFormPayload, PracticeFormFieldErrors } from '../../types';
import {
  INITIAL_PRACTICE_FORM,
  type CreatePracticeApiState,
} from '../../types';
import { validatePracticeForm, isFormValid } from '../../utils/formValidation';
import AddPracticeForm from './AddPracticeForm';
import './styles.css';

type AddPracticeViewProps = {
  onCancel: () => void;
  onSuccess: () => void;
  createPractice: (payload: PracticeFormPayload) => Promise<void>;
  createState: CreatePracticeApiState;
};

export default function AddPracticeView({
  onCancel,
  onSuccess,
  createPractice,
  createState,
}: AddPracticeViewProps) {
  const [payload, setPayload] = useState<PracticeFormPayload>(INITIAL_PRACTICE_FORM);
  const [touchedErrors, setTouchedErrors] = useState<PracticeFormFieldErrors>({});

  const errors = useMemo(
    () => validatePracticeForm(payload),
    [payload]
  );
  /** Show validation errors only after first submit attempt */
  const showErrors = touchedErrors;

  const handleSubmit = useCallback(() => {
    const nextErrors = validatePracticeForm(payload);
    setTouchedErrors(nextErrors);

    if (!isFormValid(nextErrors)) return;

    createPractice(payload).then(() => {
      setPayload(INITIAL_PRACTICE_FORM);
      setTouchedErrors({});
      onSuccess();
    }).catch(() => {
      // Error is shown via createState in parent; keep form editable
    });
  }, [payload, createPractice, onSuccess]);

  const loading = createState.status === 'loading';
  const createError = createState.status === 'error' ? createState.message : null;

  return (
    <div className="add-practice-view">
      <header className="add-practice-view-header">
        <h1 className="add-practice-view-title">Add practice</h1>
        <p className="add-practice-view-subtitle">
          Enter the practice details and current month metrics.
        </p>
      </header>

      {createError && (
        <div className="add-practice-view-error" role="alert">
          {createError}
        </div>
      )}

      <AddPracticeForm
        payload={payload}
        errors={showErrors}
        onChange={setPayload}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        loading={loading}
        canSubmit={isFormValid(errors)}
      />
    </div>
  );
}
