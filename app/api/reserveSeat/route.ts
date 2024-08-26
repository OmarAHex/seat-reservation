// app/api/reserveSeat/route.ts
import { NextResponse } from 'next/server'
import { seats } from '../seats/data'

export async function POST(request: Request) {
  const { seatId, name } = await request.json()
  const seatIndex = seats.findIndex(seat => seat.id === seatId)
  
  if (seatIndex !== -1) {
    seats[seatIndex].reserved = true
    seats[seatIndex].name = name
    return NextResponse.json({ message: 'Seat reserved successfully' })
  } else {
    return NextResponse.json({ message: 'Seat not found' }, { status: 404 })
  }
}