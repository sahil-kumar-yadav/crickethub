import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';

const fetchTournamentById = async (id) => {
  const { data } = await api.get(`/tournaments/${id}`);
  return data;
};

export default function TournamentDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: tournament, isLoading, error } = useQuery({
    queryKey: ['tournament', id],
    queryFn: () => fetchTournamentById(id),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading tournament details...</div>;
  if (error) return <div>Error loading tournament details</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{tournament.name}</h1>
      <p><strong>Format:</strong> {tournament.format}</p>
      <p><strong>Venue:</strong> {tournament.venue}</p>
      <p><strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {tournament.status}</p>

      <h2 className="text-xl font-semibold mt-4">Stages:</h2>
      <ul className="list-disc ml-6">
        {tournament.stages.map((stage, idx) => (
          <li key={idx}>{stage}</li>
        ))}
      </ul>
    </div>
  );
}
