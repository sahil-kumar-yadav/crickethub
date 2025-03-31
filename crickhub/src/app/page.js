"use client"
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import AuthPopup from '@/components/Authmodel';


export default function Home() {

  const { data: session } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <h1>Welcome to the App</h1>
      {!session ? (
        <button onClick={() => setShowPopup(true)}>Login / Sign Up</button>
      ) : (
        <p>Welcome, {session.user.name}</p>
      )}
      {showPopup && <AuthPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}