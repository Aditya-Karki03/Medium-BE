import { Hono } from 'hono'
import signing from './routes/signing'

const app = new Hono()

app.route('/api/v1/user',signing)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
