import express from 'express'
import bodyParser from 'body-parser'
import marathon_2017 from './data-scraper/data/2017/marathon.json'
import half_marathon_2017 from './data-scraper/data/2017/half-marathon.json'
import tenk_run_2017 from './data-scraper/data/2017/10k-run.json'
import fivek_run_2017 from './data-scraper/data/2017/5k-run.json'


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/2017/marathon', (req, res) => {
  res.status(200).send(marathon_2017)
});

app.get('/api/2017/half-marathon', (req, res) => {
  res.status(200).send(half_marathon_2017)
});

app.get('/api/2017/10k-run', (req, res) => {
  res.status(200).send(tenk_run_2017)
});

app.get('/api/2017/5k-run', (req, res) => {
  res.status(200).send(fivek_run_2017)
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})