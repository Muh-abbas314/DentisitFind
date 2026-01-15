import PracticeSummaryCard from './components/PracticeSummaryCard/PracticeSummaryCard';
import type { PracticeSummary } from './types';
import './App.css';

const mockPractices: PracticeSummary[] = [
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
    id: '5',
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
    id: '6',
    name: 'Downtown Dental Clinic',
    city: 'Chicago',
    country: 'USA',
    newPatientsThisMonth: 28,
    appointmentRequests: 320,
    conversionRate: 8.75,
    monthlyTrend: [35, 32, 30, 28, 27, 28],
    marketingSpend: 8500,
  }
];

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Dentist Find Test</h1>
      </header>
      <main className="app-main">
        <div className="practices-grid">
          {mockPractices.map((practice) => (
            <PracticeSummaryCard key={practice.id} practice={practice} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
