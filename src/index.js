const express = require("express")
const {createDBConnection} = require("./util/database")
const userRoutes = require("./routes/user")
const imageRoutes = require("./routes/image")
const authRoutes = require("./routes/auth")
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path")




const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

//app.use('/image', express.static(path.join(__dirname, '../uploads')));

app.use(cors());
app.use(authRoutes)
app.use('/', userRoutes)
app.use('/image', imageRoutes)

createDBConnection(() => {
    app.listen(4005, () => {
        console.log("server listening at 4005");
    })
})
