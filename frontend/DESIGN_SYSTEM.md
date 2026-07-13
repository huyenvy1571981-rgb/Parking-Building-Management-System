# Parking OS Dashboard Design System

## Wireframe

```text
┌──────────────┬────────────────────────────────────────────────────┐
│ Sidebar      │ Search                         Theme Bell Admin     │
│              ├────────────────────────────────────────────────────┤
│ Overview     │ Heading                         Today Week Month    │
│ Management   │                                                    │
│ Operations   │ KPI       KPI       KPI       KPI                 │
│ System       │                                                    │
│              │ Revenue line    Occupancy area   Vehicle bars     │
│              │                                                    │
│ Collapse     │ Quick actions   Parking layout   Activity timeline│
└──────────────┴────────────────────────────────────────────────────┘
```

## Component hierarchy

```text
Dashboard
├── Sidebar
│   ├── Brand
│   ├── NavigationGroup
│   └── CollapseControl
├── Header
│   ├── Search
│   ├── ThemeToggle
│   ├── NotificationButton
│   └── AccountMenu
└── DashboardContent
    ├── RangeToggle
    ├── KpiCard[]
    ├── ChartCard[]
    │   ├── RevenueLineChart
    │   ├── OccupancyAreaChart
    │   └── VehicleFlowBarChart
    ├── QuickActions
    ├── ParkingPreview
    └── ActivityTimeline
```

## Tokens

- Primary: `#6D5DF6`
- Secondary: `#8B7FFF`
- Success: `#22C55E`
- Warning: `#F59E0B`
- Danger: `#EF4444`
- Background: `#F8FAFC`
- Card: `#FFFFFF`
- Border: `#E5E7EB`
- Text: `#111827`
- Secondary text: `#6B7280`
- Radius: `16px`
- Font stack: Inter, system UI

## Responsive behavior

- Desktop: four KPI columns and a persistent 240px sidebar.
- Laptop: charts use the 12-column grid and resize through Recharts.
- Tablet: sidebar collapses; KPI and action cards wrap to two columns.
- Mobile: sidebar is hidden, cards and charts stack in one column, navbar actions simplify.
