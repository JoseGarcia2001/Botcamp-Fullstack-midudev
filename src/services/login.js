import axios from 'axios'

// const apiUrlProd = 'https://quiet-tor-89086.herokuapp.com/'
const apiUrlDev = 'http://localhost:3001/'

export const login = async (credentials) => {
  try {
    const { data } = await axios.post(`${apiUrlDev}api/login`, credentials)
    return data
  } catch (error) {
    console.log(error)
  }
}
