// app/api/seats/data.ts
export const seats = Array.from({ length: 35 }, (_, i) => ({ id: i + 1, reserved: false, name: null }))