import express from "express"
import cors from "cors"
import { Pool } from "pg"
import keys from "./keys"
import redis from "redis"

const app = express()

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(cors())

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: +keys.pgPort,
})

pgClient.on("error", () => {
  console.log("Lost PG Connection")
})

pgClient
  .query("CREATE TABLE IF NOT EXISTS values(number INT)")
  .catch(err => console.log(err))

//REDIS CLIENT SETUP
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: +keys.redisPort,
  retry_strategy: () => 1000,
})

const redisPublisher = redisClient.duplicate()

// Express Routes

app.get("/", (req, res) => {
  res.send("hello")
})

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values")

  res.send(values.rows)
})

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, redisValues) => {
    res.send(redisValues)
  })
})

app.post<{}, {}, { index: string }>("/values", (req, res) => {
  const index = req.body.index

  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high")
  }

  redisClient.hset("values", index, "Nothing yet!")
  redisPublisher.publish("insert", index)
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index])

  res.send({ working: true })
})
const PORT = 5000
app.listen(PORT, () => {
  console.log(
    `Server Listening on port ${PORT} in ${process.env.NODE_ENV} mode`,
  )
})
