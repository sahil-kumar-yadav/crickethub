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

    <div className="container mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">🏏 Local Cricket Tournament App</h1>

      <section className="mb-8 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">📅 Tournaments</h2>
        <p className="text-gray-700 mb-4">Stay updated with the latest tournaments, whether they're upcoming or ongoing.</p>
        <a href="/tournaments" className="text-blue-600 hover:text-blue-800 font-medium underline">
          View All Tournaments
        </a>
      </section>

      <section className="mb-8 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">🔐 User Authentication</h2>
        <p className="text-gray-700 mb-4">Login or register to access personalized features and updates.</p>
        <button
          onClick={openModal}
          className="text-blue-600 hover:text-blue-800 font-medium p-2 border-2 border-blue-600 rounded-lg transition-all duration-200 ease-in-out hover:bg-blue-100"
        >
          Login or Register
        </button>
      </section>

      <section className="mb-8 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">⚡ Real-Time Match Updates</h2>
        <p className="text-gray-700 mb-4">Get live updates for match scores, commentary, and more!</p>
        {/* Include your real-time component here */}
        {/* <LiveMatchUpdates /> */}
      </section>

      <section className="mb-8 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">📸 Upload Match Media</h2>
        <FileUploader />
      </section>

      {/* SignInModal Component Integration */}
      <SignInModal isOpen={isModalOpen} onClose={closeModal} />
    </div>

  );
}