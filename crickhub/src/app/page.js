"use client"
import AuthModal from "@/components/Authmodel";
import { useState } from "react";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div>
      <h1>Welcome to Crickethub</h1>
      <button onClick={() => setIsAuthModalOpen(true)}>Login / Sign Up</button>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}