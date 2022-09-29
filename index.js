const express = require('express')
const {readFileSync, promises: fsPromises} = require('fs');
const app = express()
const port = process.env.PORT || 4000
const os = require('os')

app.use(express.static("www"))

app.get('/', (req, res) => {
  res.send(os.hostname()+"port "+port)
})

app.get('/mot', (req, res) => {
  res.send(generateWordOfTheDay())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
function generateWordOfTheDay() {
  const  contents= readFileSync("data/liste_francais.txt", 'utf-8');
  const wordsList = contents.split(/\r?\n/);
  const today = new Date();
  let wordOfDay = wordsList[today.getDate()*getRandomInt(3)%wordsList.length]
  console.log(wordOfDay)
  return wordOfDay
}