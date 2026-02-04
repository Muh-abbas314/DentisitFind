import type { PracticeSummary, PracticeFormPayload } from '../types';

const MOCK_DELAY_MS = 800;

/** Simulated fetch mode for getPractices (for demo: loading, empty, error) */
export type FetchPracticesMode = 'success' | 'empty' | 'error';

/** Realistic mock practices (no lorem); used for success state */
const MOCK_PRACTICES: PracticeSummary[] = [
  {
    id: '1',
    name: 'Bright Smile Dental',
    city: 'New York',
    country: 'USA',
    newPatientsThisMonth: 45,
    appointmentRequests: 250,
    conversionRate: 18.0,
    monthlyTrend: [30, 35, 28, 40, 42, 45],
    marketingSpend: 12500,
  },
  {
    id: '2',
    name: 'Coastal Dental Care',
    city: 'Los Angeles',
    country: 'USA',
    newPatientsThisMonth: 62,
    appointmentRequests: 280,
    conversionRate: 22.1,
    monthlyTrend: [50, 55, 48, 58, 60, 62],
    marketingSpend: 18000,
  },
  {
    id: '3',
    name: 'Downtown Dental Clinic',
    city: 'Chicago',
    country: 'USA',
    newPatientsThisMonth: 28,
    appointmentRequests: 320,
    conversionRate: 8.75,
    monthlyTrend: [35, 32, 30, 28, 27, 28],
    marketingSpend: 8500,
  },
  {
    id: '4',
    name: 'Riverside Family Dental',
    city: 'Houston',
    country: 'USA',
    newPatientsThisMonth: 51,
    appointmentRequests: 190,
    conversionRate: 26.8,
    monthlyTrend: [42, 45, 48, 49, 50, 51],
    marketingSpend: 14200,
  },
  {
    id: '5',
    name: 'Summit View Orthodontics',
    city: 'Denver',
    country: 'USA',
    newPatientsThisMonth: 33,
    appointmentRequests: 180,
    conversionRate: 18.3,
    monthlyTrend: [28, 30, 31, 32, 33, 33],
    marketingSpend: 9200,
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulates fetching practices. Supports loading (delay), empty, and error for demo.
 */
export async function getPractices(mode: FetchPracticesMode = 'success'): Promise<PracticeSummary[]> {
  await delay(MOCK_DELAY_MS);

  if (mode === 'error') {
    throw new Error('Unable to load practices. Please check your connection and try again.');
  }

  if (mode === 'empty') {
    return [];
  }

  return [...MOCK_PRACTICES];
}

/** Simulated create practice failure for demo */
export type CreatePracticeMode = 'success' | 'error';

/**
 * Simulates creating a practice. Returns new practice or throws.
 */
export async function createPractice(
  payload: PracticeFormPayload,
  mode: CreatePracticeMode = 'success'
): Promise<PracticeSummary> {
  await delay(MOCK_DELAY_MS);

  if (mode === 'error') {
    throw new Error('Could not add practice. Please try again later.');
  }

  const newPatients = parseInt(payload.newPatientsThisMonth, 10) || 0;
  const appointmentRequests = parseInt(payload.appointmentRequests, 10) || 0;
  const conversionRate = parseFloat(payload.conversionRate) || 0;
  const marketingSpend = payload.marketingSpend.trim()
    ? parseFloat(payload.marketingSpend)
    : undefined;

  const trend = [
    Math.max(0, newPatients - 5),
    Math.max(0, newPatients - 3),
    Math.max(0, newPatients - 2),
    Math.max(0, newPatients - 1),
    Math.max(0, newPatients - 1),
    newPatients,
  ];

  const practice: PracticeSummary = {
    id: `new-${Date.now()}`,
    name: payload.name.trim(),
    city: payload.city.trim(),
    country: payload.country.trim(),
    phone: payload.phone.trim() || undefined,
    newPatientsThisMonth: newPatients,
    appointmentRequests,
    conversionRate,
    monthlyTrend: trend,
    marketingSpend: marketingSpend !== undefined && !Number.isNaN(marketingSpend) ? marketingSpend : undefined,
  };

  return practice;
}

/**
 * Simulates updating a practice. Returns updated practice or throws.
 */
export async function updatePractice(
  id: string,
  payload: PracticeFormPayload,
  mode: CreatePracticeMode = 'success'
): Promise<PracticeSummary> {
  await delay(MOCK_DELAY_MS);

  if (mode === 'error') {
    throw new Error('Could not update practice. Please try again later.');
  }

  const newPatients = parseInt(payload.newPatientsThisMonth, 10) || 0;
  const appointmentRequests = parseInt(payload.appointmentRequests, 10) || 0;
  const conversionRate = parseFloat(payload.conversionRate) || 0;
  const marketingSpend = payload.marketingSpend.trim()
    ? parseFloat(payload.marketingSpend)
    : undefined;

  const trend = [
    Math.max(0, newPatients - 5),
    Math.max(0, newPatients - 3),
    Math.max(0, newPatients - 2),
    Math.max(0, newPatients - 1),
    Math.max(0, newPatients - 1),
    newPatients,
  ];

  return {
    id,
    name: payload.name.trim(),
    city: payload.city.trim(),
    country: payload.country.trim(),
    phone: payload.phone.trim() || undefined,
    newPatientsThisMonth: newPatients,
    appointmentRequests,
    conversionRate,
    monthlyTrend: trend,
    marketingSpend: marketingSpend !== undefined && !Number.isNaN(marketingSpend) ? marketingSpend : undefined,
  };
}
