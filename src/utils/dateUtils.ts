export const getTimestampWeeksAgo = (numOfWeeks: number): number => {
  // Calculate the milliseconds for the given number of weeks
  const millisecondsAgo = numOfWeeks * 7 * 24 * 60 * 60 * 1000
  const currentDate = new Date()
  const weeksAgo = new Date(currentDate.getTime() - millisecondsAgo)

  return Math.floor(weeksAgo.getTime() / 1000)
}
