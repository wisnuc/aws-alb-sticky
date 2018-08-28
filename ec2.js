const os = require('os')
const express = require('express')
const cookieParser = require('cookie-parser')
const dateFormat = require('dateformat')

const app = express()

let count = 0 
let port = 12345

const formatCookie = cookies => cookies.AWSALB 
  ? `${cookies.AWSALB.slice(0, 16)} ${dateFormat(new Date(cookies.Expires), 'yyyy-mm-dd hh:MM:ss')} ${cookies.Path}` 
  : '-'

app.use(cookieParser())

app.get('/', (req, res) => {
  let { address, mac } = os.networkInterfaces().eth0.find(x => x.family === 'IPv4')
  console.log(address, count++, formatCookie(req.cookies))
  res.status(200).json({ address, mac })
})

app.get('/health', (req, res) => {
  console.log('-')
  res.status(200).end()
})

app.listen(port, () => console.log(`listening on port ${port}`))

