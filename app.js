 const express = require('express');
const app = express()
const allRoutes = require("./routes")
const cors = require('cors');


const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(allRoutes)



app.listen(PORT, () => {
    console.log("Server Berjalan di PORT " + PORT);
})