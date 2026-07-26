const NodeCache = require('node-cache')

const config = {
    openaikey: process.env.OPENAI_API_KEY || '',
    cache: new NodeCache({
        checkperiod: 10000,
        deleteOnExpire: true
    }),
    ratelimit: new Map(),
    commands: new Map(),
    aliases: new Map()
}

module.exports = config