// filepath: /frontend/src/app/admin/page.js
import { getSession } from "next-auth/react";

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
      <p>Your role: {session.user.role}</p>
    </div>
  );
}