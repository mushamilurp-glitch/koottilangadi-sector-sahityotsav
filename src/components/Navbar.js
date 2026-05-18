"use client";

import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Image
          src="/images/logo.png"
          className="logo1"
          alt="Logo"
          width={30}
          height={48}
        />

        <Image
            src="/images/sah-en.png"
            className="logo2"
            alt="Sahithyotsav"
            width={220}
            height={60}
            style={{
                width: "auto",
                height: "36px",
                }}
        />
      </div>

      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/results">Results</Link></li>
        <li><Link href="/leaderboard">Leaderboard</Link></li>
        <li><Link href="/gallery">Gallery</Link></li>
        <li><Link href="/events">Events</Link></li>
        <li><Link href="/donate">Donate</Link></li>
      </ul>
    <ThemeToggle />
    </nav>
  );
}