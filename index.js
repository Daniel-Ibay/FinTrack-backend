const app = require('./app')

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})