import type { PracticeFormPayload, PracticeFormFieldErrors } from '../types';

const MIN_CONVERSION = 0;
const MAX_CONVERSION = 100;

/**
 * Validates form payload. Returns an object of field errors (empty if valid).
 */
export function validatePracticeForm(payload: PracticeFormPayload): PracticeFormFieldErrors {
  const errors: PracticeFormFieldErrors = {};

  if (!payload.name.trim()) {
    errors.name = 'Practice name is required';
  }

  if (!payload.city.trim()) {
    errors.city = 'City is required';
  }

  if (!payload.country.trim()) {
    errors.country = 'Country is required';
  }

  if (payload.phone.trim() !== '') {
    const phoneNorm = payload.phone.trim().replace(/\s/g, '');
    if (phoneNorm.length < 10 || !/^[\d\-+()]+$/.test(phoneNorm)) {
      errors.phone = 'Enter a valid phone (e.g. +1 555-123-4567)';
    }
  }

  const newPatients = parsePositiveInt(payload.newPatientsThisMonth);
  if (newPatients === null) {
    errors.newPatientsThisMonth = 'Enter a whole number (e.g. 45)';
  }

  const requests = parsePositiveInt(payload.appointmentRequests);
  if (requests === null) {
    errors.appointmentRequests = 'Enter a whole number (e.g. 250)';
  }

  const conversion = parseFloat(payload.conversionRate);
  if (Number.isNaN(conversion)) {
    errors.conversionRate = 'Enter a number (e.g. 18.5)';
  } else if (conversion < MIN_CONVERSION || conversion > MAX_CONVERSION) {
    errors.conversionRate = `Conversion rate must be between ${MIN_CONVERSION} and ${MAX_CONVERSION}%`;
  }

  if (payload.marketingSpend.trim() !== '') {
    const spend = parsePositiveNumber(payload.marketingSpend);
    if (spend === null) {
      errors.marketingSpend = 'Enter a valid amount (e.g. 12500)';
    }
  }

  return errors;
}

function parsePositiveInt(s: string): number | null {
  const n = parseInt(s, 10);
  if (Number.isNaN(n) || n < 0 || !Number.isInteger(Number(s.trim()))) return null;
  return n;
}

function parsePositiveNumber(s: string): number | null {
  const n = parseFloat(s);
  if (Number.isNaN(n) || n < 0) return null;
  return n;
}

/** Returns true if there are no validation errors */
export function isFormValid(errors: PracticeFormFieldErrors): boolean {
  return Object.keys(errors).length === 0;
}
