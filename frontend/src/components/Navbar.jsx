import Link from "next/link";

export default function Navbar() {
    return (
      <nav className="bg-gray-800 p-4">
        <Link href="/" className="text-white">Home</Link>
        <Link href="/tournaments" className="text-white ml-4">Tournaments</Link>
      </nav>
    );
  }
  