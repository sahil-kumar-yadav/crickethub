import { useEffect, useState } from 'react';
import socket from '@/utils/socket';

export default function LiveMatchUpdates() {
  const [matchEvents, setMatchEvents] = useState([]);

  useEffect(() => {
    socket.on('matchUpdate', (data) => {
      setMatchUpdates((prevUpdates) => [...prevUpdates, data]);
    });

    return () => {
      socket.off('matchUpdate');
    };
  }, []);

  const [matchUpdates, setMatchUpdates] = useState([]);

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-3">Live Match Updates</h2>
      <ul>
        {matchUpdates.map((update, idx) => (
          <li key={idx}>{update.message}</li>
        ))}
      </ul>
    </div>
  );
}
