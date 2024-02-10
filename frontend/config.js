const fs = require('fs')
fs.writeFileSync('./env', `SVC_URL=${process.env.SVC_URL}`)