export const calculateGrowth = (current: number, previous: number) => {
  const growth = previous > 0 ? ((current - previous) / previous) * 100 : 0

  return {
    growth,
    isPositive: growth >= 0,
  }
}
