
'use client'

import { useState, useEffect } from 'react'

interface Seat {
  id: number;
  reserved: boolean;
  name: string | null;
}

export default function Home() {
  const [seats, setSeats] = useState<Seat[]>([])
  const [name, setName] = useState('')

  useEffect(() => {
    fetchSeats()
  }, [])

  const fetchSeats = async () => {
    const response = await fetch('/api/seats')
    const data = await response.json()
    setSeats(data)
  }

  const reserveSeat = async (seatId: number) => {
    if (!name) {
      alert('Please enter a name')
      return
    }
    const response = await fetch('/api/reserveSeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId, name }),
    })
    if (response.ok) {
      fetchSeats()
      setName('')
    } else {
      alert('Failed to reserve seat')
    }
  }

  const createTranslationTable = () => {
    const totalSeats = 45; 
    const translationTable: { [key: number]: number } = {};
    let skippedSeats = 0;

    for (let i = 1; i <= totalSeats; i++) {
      
      const row = Math.floor((i - 1) / 5);
      const col = (i - 1) % 5;

      
      if (col === 3) {
        skippedSeats++;
        continue;
      }

      
      if (row === 4 && col === 4) {
        skippedSeats++;
        continue;
      }

      translationTable[i] = i - skippedSeats;
    }

    return translationTable;
  };

  const seatTranslationTable = createTranslationTable();

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Radiology Seat Reservation</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="border p-2 mb-4 w-full"
      />
      <div className="flex justify-center mb-4 w-full mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="30"
          viewBox="0 0 400 30" 
          className="fill-current text-gray-700"
        >
          <rect width="400" height="30" rx="10" /> 
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12">
            SCREEN
          </text>
        </svg>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {seats.map((seat, index) => (
          <div key={seat.id}>
            {index % 5 === 3 ? (
              <div className="h-10" /> 
            ) : index === 24 ? (
              <div className="flex items-center justify-end">
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="end" fill="black" fontSize="8" className="mr-2">
                  Door
                </text>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="70"
                  viewBox="0 0 20 70"
                  className="fill-current text-brown-700"
                >
                  <rect width="20" height="70" rx="3" fill="brown" />
                </svg>
              </div>
            ) : (
              <button
                onClick={() => reserveSeat(seat.id)}
                disabled={seat.reserved}
                className={`w-32 p-2 rounded ${
                  seat.reserved ? 'bg-red-300 cursor-not-allowed' : 'bg-green-300 hover:bg-green-400'
                }`}
              >
                {seat.reserved ? seat.name : `Seat ${seatTranslationTable[seat.id]}`}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}