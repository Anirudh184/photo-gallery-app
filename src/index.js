const express = require('express');
const userRouter = require('../routes/user');
const app = express(); 

require('../db/mongoose');
const port = process.env.PORT;
  
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(userRouter); 


app.use((req, res, next) => {
    res.send("Express application");
});

app.listen(port, () => {
    console.log(`Backend listening at port ${port}`);
})