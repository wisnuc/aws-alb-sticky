const express = require('express')
const bodyParser = require('body-parser')
const request = require('superagent')

const url = 'http://test-lewis-2-97249523.cn-north-1.elb.amazonaws.com.cn:12345'

const app = express()

app.use(bodyParser.json())

app.post('/', (req, res) => request.get(url)
  .set('Cookie', req.body.cookie)
  .end((err, res2) => err
    ? res.status(err.status).json({ message: err.message })
    : res.status(200).json(res2.body)))

app.listen(23456, () => console.log('sidekick listening on 23456'))

