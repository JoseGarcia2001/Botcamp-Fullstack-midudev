import axios from 'axios'

// const apiUrlProd = 'https://quiet-tor-89086.herokuapp.com/'
const apiUrlDev = 'http://localhost:3001/'

export const getAllNotes = async () => {
  try {
    const { data } = await axios.get(
      `${apiUrlDev}api/notes`)
    return data
  } catch (error) {
    return console.log(error)
  }
}

export const createNote = async (noteToCreate) => {
  try {
    const token = ''

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.post(
      `${apiUrlDev}api/notes`, { content: noteToCreate }, config)

    return data
  } catch (error) {
    console.log(error)
  }
}
