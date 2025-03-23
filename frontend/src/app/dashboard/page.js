import { getSession } from "next-auth/react";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <p>Your user ID is: {session.user.id}</p>
    </div>
  );
}