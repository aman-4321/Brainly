import SideBar from "../../components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
