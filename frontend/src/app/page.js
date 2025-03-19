"use client"
import FileUploader from "@/components/FileUploader";
import SignInModal from "@/components/SignInModal";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to manage modal visibility

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🏏 Local Cricket Tournament App</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📅 Tournaments</h2>
        <p className="mb-2">View upcoming and ongoing tournaments.</p>
        <a href="/tournaments" className="text-blue-600 underline">View All Tournaments</a>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🔐 User Authentication</h2>
        {/* Button to open the SignInModal */}
        <button onClick={openModal} className="text-blue-600 underline">
          Login or Register
        </button>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">⚡ Real-Time Match Updates</h2>
        <p>Real-time match scores and commentary updates powered by Socket.io.</p>
        {/* Include your real-time component here */}
        {/* <LiveMatchUpdates /> */}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📸 Upload Match Media</h2>
        <FileUploader />
      </section>

      {/* SignInModal Component Integration */}
      <SignInModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}