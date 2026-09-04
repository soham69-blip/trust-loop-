import { useState, type ReactNode } from "react";

import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-body-md text-body-md text-on-surface antialiased">
      {/* Desktop sidebar */}
      <div className="fixed left-0 top-0 z-50 hidden h-full lg:block">
        <AppSidebar />
      </div>

      {/* Mobile drawer */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-scrim/50"
          />
          <div className="absolute left-0 top-0 h-full shadow-lg">
            <AppSidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-col lg:pl-72">
        <TopBar onOpenNav={() => setDrawerOpen(true)} />
        {children}
      </div>
    </div>
  );
}
