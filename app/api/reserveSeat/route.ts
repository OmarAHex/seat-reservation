// app/api/reserveSeat/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
type Seat = { id: string; reserved: boolean; name: string; }

const seatsFilePath = path.join(process.cwd(), 'app/api/seats/data.json')

const readSeats = () => {
  const data = fs.readFileSync(seatsFilePath, 'utf-8')
  return JSON.parse(data)
}

const writeSeats = (seats: Seat[]) => {
  fs.writeFileSync(seatsFilePath, JSON.stringify(seats, null, 2))
}

export async function POST(request: Request) {
  const { seatId, name } = await request.json()
  const seats = readSeats() as Seat[]
  const seatIndex = seats.findIndex(seat => seat.id === seatId)
  
  if (seatIndex !== -1) {
    seats[seatIndex].reserved = true
    seats[seatIndex].name = name
    writeSeats(seats)
    return NextResponse.json({ message: 'Seat reserved successfully' })
  } else {
    return NextResponse.json({ message: 'Seat not found' }, { status: 404 })
  }
}