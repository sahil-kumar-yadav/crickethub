"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user);
      }
    };

    const fetchMatches = async () => {
      const res = await axios.get("http://localhost:5000/api/matches");
      setMatches(res.data);
    };

    const fetchPlayers = async () => {
      const res = await axios.get("http://localhost:5000/api/players");
      setPlayers(res.data);
    };

    const fetchTeams = async () => {
      if (user) {
        const res = await axios.get(`http://localhost:5000/api/teams/${user.id}`);
        setTeams(res.data);
      }
    };

    fetchUser();
    fetchMatches();
    fetchPlayers();
    if (user) fetchTeams();
  }, [user]);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/teams", {
        name: teamName,
        players: selectedPlayers,
        userId: user.id,
      });

      setTeams([...teams, res.data.team]);
      setTeamName("");
      setSelectedPlayers([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      await axios.delete(`http://localhost:5000/api/teams/${teamId}`);
      setTeams(teams.filter((team) => team._id !== teamId));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to Crickethub, {user.name}!</h1>
      <p>Your role: {user.role}</p>

      <div>
        <h2>Upcoming Matches</h2>
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              <strong>{match.teams}</strong> - {match.date} at {match.time} ({match.venue})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Player Statistics</h2>
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              <strong>{player.name}</strong> - Runs: {player.runs}, Wickets: {player.wickets}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Manage Teams</h2>
        <form onSubmit={handleCreateTeam}>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          <select
            multiple
            value={selectedPlayers}
            onChange={(e) =>
              setSelectedPlayers(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {players.map((player) => (
              <option key={player.id} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>
          <button type="submit">Create Team</button>
        </form>

        <ul>
          {teams.map((team) => (
            <li key={team._id}>
              <strong>{team.name}</strong> - Players: {team.players.join(", ")}
              <button onClick={() => handleDeleteTeam(team._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}