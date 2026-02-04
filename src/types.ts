/**
 * Core domain & API types. Reused across components. No `any`.
 */

/** Single practice summary as returned by API / displayed on cards */
export type PracticeSummary = {
  id: string;
  name: string;
  city: string;
  country: string;
  phone?: string;
  newPatientsThisMonth: number;
  appointmentRequests: number;
  conversionRate: number;
  monthlyTrend: number[];
  marketingSpend?: number;
};

/** Map a practice to form payload (for editing) */
export function practiceToFormPayload(practice: PracticeSummary): PracticeFormPayload {
  return {
    name: practice.name,
    city: practice.city,
    country: practice.country,
    phone: practice.phone ?? '',
    newPatientsThisMonth: String(practice.newPatientsThisMonth),
    appointmentRequests: String(practice.appointmentRequests),
    conversionRate: String(practice.conversionRate),
    marketingSpend: practice.marketingSpend !== undefined ? String(practice.marketingSpend) : '',
  };
}

/** Payload for creating a new practice (form values before submit) */
export type PracticeFormPayload = {
  name: string;
  city: string;
  country: string;
  phone: string;
  newPatientsThisMonth: string;
  appointmentRequests: string;
  conversionRate: string;
  marketingSpend: string;
};

/** Initial empty form values */
export const INITIAL_PRACTICE_FORM: PracticeFormPayload = {
  name: '',
  city: '',
  country: '',
  phone: '',
  newPatientsThisMonth: '',
  appointmentRequests: '',
  conversionRate: '',
  marketingSpend: '',
};

/** Validation errors keyed by field name (same keys as PracticeFormPayload) */
export type PracticeFormFieldErrors = Partial<Record<keyof PracticeFormPayload, string>>;

/** API state for async list fetch: loading, success with data, or error */
export type PracticesApiState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; practices: PracticeSummary[] }
  | { status: 'error'; message: string };

/** API state for create practice: idle, loading, success, or error */
export type CreatePracticeApiState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; practice: PracticeSummary }
  | { status: 'error'; message: string };

/** Type guard: success state with practices */
export function isPracticesSuccess(
  state: PracticesApiState
): state is { status: 'success'; practices: PracticeSummary[] } {
  return state.status === 'success';
}

/** Type guard: success state for create */
export function isCreateSuccess(
  state: CreatePracticeApiState
): state is { status: 'success'; practice: PracticeSummary } {
  return state.status === 'success';
}
