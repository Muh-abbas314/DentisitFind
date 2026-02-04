import './styles.css';

type FormFieldProps = {
  id: string;
  label: string;
  type?: 'text' | 'number';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  step?: string;
};

export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
  required = false,
  min,
  max,
  step,
}: FormFieldProps) {
  const inputProps = {
    id,
    type,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    placeholder,
    disabled,
    'aria-required': required,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    min,
    max,
    step,
  };

  return (
    <div className={`form-field ${error ? 'form-field--error' : ''}`}>
      <label htmlFor={id} className="form-field-label">
        {label}
        {required && <span className="form-field-required" aria-hidden="true"> *</span>}
      </label>
      <input
        className="form-field-input"
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="form-field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
