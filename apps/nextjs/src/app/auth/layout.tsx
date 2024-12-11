import { AuthSplitLayout } from 'src/layouts/auth-split';
import type { ReactNode } from "react";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {

  return (
    <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>{children}</AuthSplitLayout>
  );
}
