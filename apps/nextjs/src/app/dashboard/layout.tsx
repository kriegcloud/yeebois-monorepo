import { CONFIG } from "src/config-global";
import { DashboardLayout } from "src/layouts/dashboard";

import { AuthGuard } from "src/auth/guard";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  // if (true) {
  //   return <DashboardLayout>{children}</DashboardLayout>;
  // }

  return <DashboardLayout>{children}</DashboardLayout>;
}
