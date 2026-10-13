import dotenv from 'dotenv'

// load the .env file that lives in the server folder
dotenv.config({ path: new URL('../.env', import.meta.url) })
