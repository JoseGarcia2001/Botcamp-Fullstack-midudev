import axios from 'axios'

const apiUrl = 'http://localhost:3001/api/notes'

export const getAllNotes = async () => {
  try {
    const { data } = await axios.get(apiUrl)
    return data
  } catch (error) {
    return console.log(error)
  }
}

export const createNote = async (noteToCreate) => {
  try {
    const { data } = await axios.post(apiUrl, { content: noteToCreate })
    return data
  } catch (error) {
    console.log(error)
  }
}
