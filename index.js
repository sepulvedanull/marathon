import express from 'express'
import bodyParser from 'body-parser'
import marathonRunners from './data-scraper/data/2017/marathon.json'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/v1/runners', (req, res) => {
  res.status(200).send(marathonRunners)
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})