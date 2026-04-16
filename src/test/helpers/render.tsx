import { render, type RenderOptions } from "@testing-library/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactElement } from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: Providers, ...options });
}

export { customRender as render };
export { screen, within } from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
