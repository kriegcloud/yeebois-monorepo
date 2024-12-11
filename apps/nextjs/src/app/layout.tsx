import "src/global.css";

// ----------------------------------------------------------------------

import type { Viewport } from "next";

import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import { CONFIG } from "src/config-global";
import { primary } from "src/theme/core/palette";
import { schemeConfig } from "src/theme/scheme-config";
import { ThemeProvider } from "src/theme/theme-provider";

import { MotionLazy } from "src/components/animate/motion-lazy";
import { ProgressBar } from "src/components/progress-bar";
import {
  SettingsDrawer,
  SettingsProvider,
  defaultSettings,
} from "src/components/settings";

import { AuthProvider } from "src/auth/context/jwt";

// ----------------------------------------------------------------------

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata = {
  icons: [
    {
      rel: "icon",
      url: `/favicon.ico`,
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          defaultMode={schemeConfig.defaultMode}
          modeStorageKey={schemeConfig.modeStorageKey}
        />

        <AuthProvider>
          <SettingsProvider settings={defaultSettings}>
            <ThemeProvider>
              <MotionLazy>
                <ProgressBar />
                <SettingsDrawer />
                {children}
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
