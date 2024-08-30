import api from './api'

export async function checkSeason(season) {
  try {
    await api.get(`/checker/season/${season}`)
    return true
  } catch (error) {
    console.error('Error while the checking season', error)
    return false
  }
}
