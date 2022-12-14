import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./NavLink.module.css";
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  pathname?: string;
}
const NavLink: React.FC<NavLinkProps> = ({ href, children, pathname }) => {
  const router = useRouter();

  return (
    <Link
      className={
        router.pathname === pathname || router.pathname === href
          ? classes["active"]
          : ""
      }
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
