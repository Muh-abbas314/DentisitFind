import type { StatusType } from '../../utils/helpers';
import { getStatusLabel } from '../../utils/helpers';
import './styles.css';

type CardHeaderProps = {
  name: string;
  city: string;
  country: string;
  phone?: string;
  status: StatusType;
};

export default function CardHeader({ name, city, country, phone, status }: CardHeaderProps) {
  const statusLabel = getStatusLabel(status);

  return (
    <div className="card-header">
      <div className="header-content">
        <h2 className="practice-name">{name}</h2>
        <p className="practice-location">
          {city}, {country}
        </p>
        {phone && (
          <p className="practice-phone">{phone}</p>
        )}
      </div>
      <div className={`status-indicator status-${status}`}>
        <span className="status-dot"></span>
        <span className="status-text">{statusLabel}</span>
      </div>
    </div>
  );
}
