import type { PracticeFormPayload, PracticeFormFieldErrors } from '../../types';
import FormField from './FormField';
import FormActions from './FormActions';
import './styles.css';

type AddPracticeFormProps = {
  payload: PracticeFormPayload;
  errors: PracticeFormFieldErrors;
  onChange: (payload: PracticeFormPayload) => void;
  onSubmit: () => void;
  onCancel: () => void;
  loading?: boolean;
  /** When false, submit button is disabled (form invalid) */
  canSubmit?: boolean;
};

export default function AddPracticeForm({
  payload,
  errors,
  onChange,
  onSubmit,
  onCancel,
  loading = false,
  canSubmit = true,
}: AddPracticeFormProps) {
  const update = (field: keyof PracticeFormPayload) => (value: string) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <form
      className=""
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      noValidate
      aria-label="Add practice"
    >
      {Object.keys(errors).length > 0 && (
        <div className="add-practice-form-summary" role="alert">
          Please fix the errors below before saving.
        </div>
      )}

      <div className="add-practice-form-section">
        <h3 className="add-practice-form-section-title">Practice details</h3>
        <FormField
          id="practice-name"
          label="Practice name"
          value={payload.name}
          onChange={update('name')}
          error={errors.name}
          placeholder="e.g. Bright Smile Dental"
          required
          disabled={loading}
        />
        <FormField
          id="practice-city"
          label="City"
          value={payload.city}
          onChange={update('city')}
          error={errors.city}
          placeholder="e.g. New York"
          required
          disabled={loading}
        />
        <FormField
          id="practice-country"
          label="Country"
          value={payload.country}
          onChange={update('country')}
          error={errors.country}
          placeholder="e.g. USA"
          required
          disabled={loading}
        />
        <FormField
          id="practice-phone"
          label="Phone (optional)"
          value={payload.phone}
          onChange={update('phone')}
          error={errors.phone}
          placeholder="e.g. +1 555-123-4567"
          disabled={loading}
        />
      </div>

      <div className="add-practice-form-section">
        <h3 className="add-practice-form-section-title">Metrics</h3>
        <FormField
          id="practice-new-patients"
          label="New patients this month"
          type="number"
          value={payload.newPatientsThisMonth}
          onChange={update('newPatientsThisMonth')}
          error={errors.newPatientsThisMonth}
          placeholder="e.g. 45"
          required
          disabled={loading}
          min={0}
        />
        <FormField
          id="practice-requests"
          label="Appointment requests"
          type="number"
          value={payload.appointmentRequests}
          onChange={update('appointmentRequests')}
          error={errors.appointmentRequests}
          placeholder="e.g. 250"
          required
          disabled={loading}
          min={0}
        />
        <FormField
          id="practice-conversion"
          label="Conversion rate (%)"
          type="number"
          value={payload.conversionRate}
          onChange={update('conversionRate')}
          error={errors.conversionRate}
          placeholder="e.g. 18.5"
          required
          disabled={loading}
          min={0}
          max={100}
          step="0.1"
        />
        <FormField
          id="practice-marketing"
          label="Marketing spend (optional)"
          type="number"
          value={payload.marketingSpend}
          onChange={update('marketingSpend')}
          error={errors.marketingSpend}
          placeholder="e.g. 12500"
          disabled={loading}
          min={0}
        />
      </div>

      <FormActions
        submitLabel="Add practice"
        onCancel={onCancel}
        onSubmit={onSubmit}
        disabled={!canSubmit}
        loading={loading}
      />
    </form>
  );
}
