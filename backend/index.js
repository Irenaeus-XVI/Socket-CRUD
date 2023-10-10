import express from 'express'
const app = express()
const port = 3000
import * as dotenv from 'dotenv';
dotenv.config();
app.use(express.json())
import { connection } from './db/connection.js';

connection()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`app listening on port ${port}!`))