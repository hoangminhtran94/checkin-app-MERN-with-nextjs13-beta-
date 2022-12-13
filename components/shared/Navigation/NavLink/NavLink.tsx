import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import classes from "./NavLink.module.css";
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  pathname?: string;
}
const NavLink: React.FC<NavLinkProps> = ({ href, children, pathname }) => {
  const path = usePathname();
  return (
    <Link
      className={path === pathname || path === href ? classes["active"] : ""}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
