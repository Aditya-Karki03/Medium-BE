import { Hono } from 'hono'
import signing from './routes/signing'
import blogRouter from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())
app.route('/api/v1/user',signing);
app.route('/api/v1/user/blog',blogRouter)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
