import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboard from "./admin-dashboard";
import ContactInbox from "./contact-inbox";
import { hasAdminSession } from "./actions";
import { getContactMessagesAction } from "./contact-actions";
import { fetchProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Studio",
  description: "Manage portfolio projects and content drafts.",
};

export default async function AdminPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");
  const [{ projects, error }, { messages, error: messageError }] = await Promise.all([
    fetchProjects(),
    getContactMessagesAction(),
  ]);

  return (
    <>
      <AdminDashboard initialProjects={projects} setupError={error} />
      <ContactInbox initialMessages={messages} loadError={messageError} />
    </>
  );
}
