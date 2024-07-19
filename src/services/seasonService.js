import axios from 'axios'

export async function checkSeason(season) {
  try {
    await axios.get(`http://f1fever.test/api/checker/season/${season}`)
    return true
  } catch (error) {
    console.error('Error checking season', error)
    return false
  }
}
