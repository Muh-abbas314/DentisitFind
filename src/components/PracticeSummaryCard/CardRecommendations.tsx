import { useState } from 'react';
import './styles.css';

export default function CardRecommendations() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="recommendations">
      <h3 className="recommendations-title">Recommendations</h3>
      <div className={`recommendations-content ${isExpanded ? 'expanded' : 'truncated'}`}>
        <ul className="recommendations-list">
          <li>Consider increasing ad budget on top-performing channels.</li>
          <li>Optimize mobile landing page layout.</li>
        </ul>
      </div>
      <button
        className="see-more-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'See less' : 'See more'}
      </button>
    </div>
  );
}
