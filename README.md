## Project Init

```
npm i
npm run dev
```

## Component & Styling Decisions

### Component Structure

Split into separate components:
- PracticeSummaryCard - Main card component
- CardHeader - Header with name, location, and status
- CardMetrics - Metrics display
- CardTrend - Trend visualization wrapper
- CardRecommendations - Recommendations with expand/collapse
- TrendChart - 6-month trend chart
- Helper functions in `utils/helpers.ts` for status calculation

Each component folder has a `styles.css` file. All PracticeSummaryCard sub-components share one `styles.css` file.

### Styling Approach

Plain CSS files, one per component folder. No CSS modules, no Tailwind, no UI libraries for the Test. Usually I use TailwindCSS, MUI, or Shadcn for products.

### Visual Consistency and Responsiveness

- Consistent spacing throughout
- Same font sizes for similar elements
- Responsive grid layout (2 columns desktop, 1 column mobile)
- Media queries at 768px breakpoint
- Using "See More" for Recommendations, So user is not over-Stimulated with Text contents. 
- The card’s border color instantly signals clinic status at a glance: green for a high performer, red if at risk, and orange for stable. This makes it easy to quickly assess each clinic’s situation without reading detailed metrics.

## Scaling & Real-World Use

### Integration into Larger Dashboard

1. Reuse the component - Pass practice data as props
2. Extend the Types/Interfaces for more complex data structure
3. Theming - Replace hardcoded colors with CSS variables or even better use TailwindCSS
4. Data Fetching - Replace mock data with API calls with tools like RTK Query and integrate state Management on top of it

### If I Had One Extra Day

1. More Interactivity - Clickable trend bars, tooltips.
2. Make the card more compact by hiding text-heavy content on initial render, allowing users to toggle and reveal details as needed.
2. Performance - Memoization, optimize re-rendersAccessibility.
3. Loading States - Skeleton loaders, error handling
4. Work on "See more" UI fixes.

## Time Management

- Setup: 10 minutes
- Component Structure: 20 minutes
- Styling: 60 minutes
- Helper Functions: 10 minutes
- Trend Chart: 15 minutes
- Status Indicator & Borders: 10 minutes
- Recommendations: 10 minutes
- README: 5 minutes

Total: ~2.5 hours

