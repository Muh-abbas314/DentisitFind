import './styles.css';

type TrendChartProps = {
  data: number[];
};

function getMonthNames(count: number): string[] {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date();
  const months: string[] = [];
  
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    months.push(monthNames[date.getMonth()]);
  }
  
  return months;
}

export default function TrendChart({ data }: TrendChartProps) {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;
  const monthNames = getMonthNames(data.length);

  return (
    <div className="trend-chart-wrapper">
      <div className="trend-chart">
        {data.map((value, index) => {
          const height = ((value - minValue) / range) * 100;
          return (
            <div key={index} className="trend-bar-container">
              <div
                className="trend-bar"
                style={{ height: `${Math.max(height, 5)}%` }}
                title={`${monthNames[index]}: ${value}`}
              />
            </div>
          );
        })}
      </div>
      <div className="trend-labels">
        {monthNames.map((month, index) => (
          <span key={index} className="trend-label">
            {month}
          </span>
        ))}
      </div>
    </div>
  );
}
