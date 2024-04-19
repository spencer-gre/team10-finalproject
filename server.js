import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

app.use( express.json() )

app.use( (req,res, next) => {
  console.log( req.url )
  next()
})

ViteExpress.listen( app, 3000 )