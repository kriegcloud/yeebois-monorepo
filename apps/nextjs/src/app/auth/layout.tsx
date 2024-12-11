import type { ReactNode } from "react";
import { AuthSplitLayout } from "src/layouts/auth-split";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthSplitLayout section={{ title: "Hi, Welcome back" }}>
      {children}
    </AuthSplitLayout>
  );
}
