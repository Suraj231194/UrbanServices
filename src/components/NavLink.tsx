'use client';

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  LinkProps & {
    activeClassName?: string;
    pendingClassName?: string;
  };

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, pendingClassName: _pendingClassName, href, ...props }, ref) => {
    const pathname = usePathname();

    const target = typeof href === "string" ? href : href.pathname ?? "";
    const isActive = pathname === target || (target !== "/" && pathname.startsWith(`${target}/`));

    return (
      <Link ref={ref} href={href} className={cn(className, isActive && activeClassName)} {...props} />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };


