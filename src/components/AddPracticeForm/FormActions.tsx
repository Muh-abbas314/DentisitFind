import './styles.css';

type FormActionsProps = {
  submitLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function FormActions({
  submitLabel,
  onCancel,
  onSubmit,
  disabled = false,
  loading = false,
}: FormActionsProps) {
  const isSubmitDisabled = disabled || loading;

  return (
    <div className="form-actions">
      <button
        type="button"
        className="form-actions-cancel"
        onClick={onCancel}
        disabled={loading}
      >
        Cancel
      </button>
      <button
        type="button"
        className="form-actions-submit"
        onClick={onSubmit}
        disabled={isSubmitDisabled}
        aria-busy={loading}
      >
        {loading ? 'Saving…' : submitLabel}
      </button>
    </div>
  );
}
