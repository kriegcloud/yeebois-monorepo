import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    {...properties}
  >
    {/*<AuthProvider>*/}
    {/*<AnalyticsProvider>*/}
    <TooltipProvider>{children}</TooltipProvider>
    <Toaster />
    {/*{env.NODE_ENV === 'development' && <VercelToolbar />}*/}
    {/*</AnalyticsProvider>*/}
    {/*</AuthProvider>*/}
  </ThemeProvider>
);
