const request = require('superagent')

const aws = 'http://test-lewis-2-97249523.cn-north-1.elb.amazonaws.com.cn:12345'
const sidekick = 'http://47.91.232.213:23456'

const run = () => {
  // see superagent doc
  let agent = request.agent()

  agent.get(aws)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        console.log(err.message)
      } else {
        let first = res.body
        let cookie = res.headers['set-cookie'].find(c => c.startsWith('AWSALB'))

        request.post(sidekick)   
          .send({ cookie })
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) {
              console.log(err.message)
            } else {
              let second = res.body
              if (first.address === second.address && first.mac === second.mac) {
                console.log(first.address)
              } else {
                console.log('STICKY BROKEN:', first, second)
              }
            }
          })
      } 
    })  
}

run() 
setInterval(run, 3000)
