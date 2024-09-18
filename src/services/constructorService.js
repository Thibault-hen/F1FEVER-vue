import api from './api'

export async function checkConstructor(name) {
  try {
    await api.get(`/checker/constructor/${name}`)
    return true
  } catch (error) {
    console.error('Error while the checking driver', error)
    return false
  }
}
