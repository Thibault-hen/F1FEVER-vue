import api from './api'

export async function checkCircuit(name) {
  try {
    await api.get(`/checker/circuit/${name}`)
    return true
  } catch (error) {
    console.error('Error while the checking driver', error)
    return false
  }
}
