import type { ReactElement, ReactNode } from "react";

export function Code({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactElement {
  return <code className={className}>{children}</code>;
}
