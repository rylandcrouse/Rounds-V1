
const getFromRedis = (redis, item) => {
    redis.get(item, async (err, reply) => {
        console.log('get from redis function')
        if (err) console.log(err);
        console.log(typeof reply)
        const result = await JSON.parse(reply)
        console.log(result)
        return result
    })
}

export default getFromRedis