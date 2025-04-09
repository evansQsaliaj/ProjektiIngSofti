import express from 'express'

const app = express()

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send(`Serveri po degjon ne porten ${PORT}`)
});
