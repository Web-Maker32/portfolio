import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboard from "./admin-dashboard";
import { hasAdminSession } from "./actions";
import { fetchProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Studio",
  description: "Manage portfolio projects and content drafts.",
};

export default async function AdminPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");
  const { projects, error } = await fetchProjects();

  return <AdminDashboard initialProjects={projects} setupError={error} />;
}
