export type StatusType = 'high-performer' | 'at-risk' | 'stable';

export function getStatus(conversionRate: number): StatusType {
  if (conversionRate >= 20) return 'high-performer';
  if (conversionRate < 10) return 'at-risk';
  return 'stable';
}

export function getStatusLabel(status: StatusType): string {
  switch (status) {
    case 'high-performer':
      return 'High Performer';
    case 'at-risk':
      return 'At Risk';
    case 'stable':
      return 'Stable';
  }
}
