// app/api/seats/route.ts
import { NextResponse } from 'next/server'

let seats = Array.from({ length: 35 }, (_, i) => ({ id: i + 1, reserved: false, name: null }))

export async function GET() {
  return NextResponse.json(seats)
}

export { seats }