const express = require('express')
const cors = require('cors')
require('./connection/dbconnect')
const app = express()
const port = 4000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

const userRoutes = require("./routes/user");
app.use(userRoutes)

app.use((req, res, next) => {
    return res.json({
        msg: "Page Not Found",
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



