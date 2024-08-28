import api from './api'

export async function checkGrandPrix(season, name) {
  try {
    await api.get(`/checker/grand-prix/${season}/${name}`)
    return true
  } catch (error) {
    console.error('Error while checking grand prix name and season', error)
    return false
  }
}
