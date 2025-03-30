import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import Link from 'next/link';

const fetchTournaments = async () => {
  const { data } = await api.get('/tournaments');
  return data;
};

export default function TournamentsPage() {
  const { data: tournaments, isLoading, error } = useQuery({
    queryKey: ['tournaments'],
    queryFn: fetchTournaments,
  });

  if (isLoading) return <div>Loading tournaments...</div>;
  if (error) return <div>Error loading tournaments</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cricket Tournaments</h1>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament._id} className="mb-2">
            <Link href={`/tournaments/${tournament._id}`} className="text-blue-600 hover:underline">
              {tournament.name} - {tournament.format}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
