const express = require('express');
const userRouter = require('../routes/user');
const app = express(); 
const path = require('path');

require('../db/mongoose');
const port = process.env.PORT;
  
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(userRouter); 


// app.use((req, res, next) => {
//     res.send("Express application");
// });

// Serve static content
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('photo-gallery-client/build'));
    app.get('*', (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'photo-gallery-client', 'build', 'index.html'));
        res.sendFile(path.join(__dirname, '../photo-gallery-client/build/index.html'));
    });
}

app.listen(port, () => {
    console.log(`Backend listening at port ${port}`);
})