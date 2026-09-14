import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboard from "./admin-dashboard";
import { hasAdminSession } from "./actions";

export const metadata: Metadata = {
  title: "Studio",
  description: "Manage portfolio projects and content drafts.",
};

export default async function AdminPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");

  return <AdminDashboard />;
}
