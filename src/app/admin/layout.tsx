import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-4 space-y-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>

        <nav className="space-y-2">
          <Link href="/admin/dashboard">Dashboard</Link>
          <br />
          <Link href="/admin/results">Add Result</Link>
          <br />
          <Link href="/admin/schedule">Schedule</Link>
          <br />
          <Link href="/admin/admins">Admins</Link>
          <br />
          <LogoutButton />
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
}
