
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();


app.use('/public', express.static('public') );


//  CORS - to allow access from FreeCodeCamp
if (!process.env.DISABLE_XORIGIN) {
    app.use(function(req, res, next) {
        var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
        var origin = req.headers.origin || '*';
        if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
            console.log(origin);
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        }
        next();
    });
}



app.get('/', (req,res)=> {
    res.statusCode = 200;
    res.sendFile( path.join(__dirname, 'views', 'index.html') );
});


app.get('/api/timestamp/:time?', (req,res)=> {
    const { time } = req.params;

    const converted_time = !time? Date.now(): /^\d+$/.test(time)? Number.parseInt(time): time;
    const date = new Date( converted_time );
    
    if ( date.getTime() ) 
        res.json({
            'utc': date.toUTCString(),
            'unix': Math.floor(date)
        });
    else 
        res.json({'error': 'Invalid Date'});
});


app.listen( process.env.PORT || 3000, ()=> {
    console.log("Server started on port: " + (process.env.PORT || 3000) );
});
