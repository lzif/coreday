import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),

  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),

  route("dashboard", "routes/dashboard.tsx", [
    index("routes/dashboard/index.tsx"),
    // todo: add /setting and /profile
  ]),

  route("planner", "routes/planner.tsx", [
    index("routes/planner/index.tsx"),
    route("calendar", "routes/planner/calendar.tsx"),
    route("tasks", "routes/planner/tasks.tsx"),
  ]),

  ...prefix("finance", [
    index("routes/finance/index.tsx"),
    route("budget", "routes/finance/budget.tsx"),
    route("transactions", "routes/finance/transactions.tsx"),
    route("stats", "routes/finance/stats.tsx"),
  ]),

  route("habits", "routes/habits/index.tsx"),

  route("savings", "routes/savings/index.tsx"),

  ...prefix("journal", [
    index("routes/journal/index.tsx"),
    route("daily", "routes/journal/daily.tsx"),
    route("notes", "routes/journal/notes.tsx"),
  ]),
] satisfies RouteConfig;
