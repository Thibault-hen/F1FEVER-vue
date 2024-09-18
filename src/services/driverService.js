import api from './api'

export async function checkDriver(name) {
  try {
    await api.get(`/checker/driver/${name}`)
    return true
  } catch (error) {
    console.error('Error while the checking driver', error)
    return false
  }
}
