import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

type Seat = { id: number; reserved: boolean; name: string; }
const seatsFilePath = path.join(process.cwd(), 'app/api/seats/data.json')

const readSeats = () => {
  const data = fs.readFileSync(seatsFilePath, 'utf-8')
  return JSON.parse(data) as Seat[]
}

export async function GET() {
  const seats = readSeats()
  return NextResponse.json(seats)
}
