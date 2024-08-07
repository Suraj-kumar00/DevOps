const express = require('express')
const app = express()

const PORT = process.env.PORT || 8000;
app.get("/", (req,res) => {
    return res.json({message: "Hello, this is my first dockerized nodejs application."})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});