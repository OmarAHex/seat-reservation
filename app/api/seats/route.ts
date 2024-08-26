// app/api/seats/route.ts
import { NextResponse } from 'next/server'

import { seats } from './data'

export async function GET() {
  return NextResponse.json(seats)
}
