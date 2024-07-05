import { Hono } from 'hono'
import signing from './routes/signing'
import blogRouter from './routes/blog';

const app = new Hono()

app.route('/api/v1/user',signing);
app.route('/api/v1/user/blog',blogRouter)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
