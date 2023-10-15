const express = require('express')
const mongoose = require('mongoose')
const app = express()

let check = undefined

mongoose.connect('mongodb://127.0.0.1:27017/DepositAndWithdraw');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection Successful');
})

var response = new mongoose.Schema({
    holdername: String,
    deposit: Number
});
var account = mongoose.model('account', response);

const hostname = '127.0.0.1'
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/details',async (req, res) => {
    try {
        check = await account.findOne({ holdername: req.body.holdername })
        if (check.holdername === req.body.holdername) {
            // let depo = check.deposit
            // let deposit = depo.toString()
            res.sendFile(__dirname+'/index.html')
            
            
            // console.log(check.deposit)
        }
        else {
            // res.sendFile(__dirname + '/html/login.html')
            res.send('Not Found')
            
        }
    }
    catch {
        res.send("Oops! Something went wrong...")
        
    }
})

app.get('/api/details',(req,res)=>{
    
    res.json(check)
})

app.listen(port, hostname, () => {
    console.log(`Server started on http://${hostname}/${port}/`)
})