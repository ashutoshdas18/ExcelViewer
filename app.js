const fs = require('fs')
const xl = require('xlsx');
const utils = require('util')
const express = require('express')
const ejs = require('ejs')
const formidable = require('formidable');
const app = express();

app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.set('views',__dirname+'/views/view')
app.use(express.static(__dirname+'/views/partials'))
app.use(express.static(__dirname+'/views/view'))
app.use(express.static(__dirname+'/views/files'))

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/posted',(req,res)=>{
    let form = new formidable.IncomingForm()
    form.uploadDir = './'
    form.parse(req,(err,field,files)=>{
    fs.renameSync(__dirname+'/'+files.file.filepath,__dirname+'/'+files.file.newFilename+'.xlsx')
    try{
    const ws =xl.readFile('./'+files.file.newFilename+'.xlsx')
    const wb =  ws.Sheets[ws.SheetNames[0]]
    let val = xl.utils.sheet_to_json(wb)
    fs.unlinkSync('./'+files.file.newFilename+'.xlsx')
    res.send(JSON.stringify(val))
    }catch(error){
        fs.unlinkSync('./'+files.file.newFilename+'.xlsx')
        console.log("error")
        res.status(500).send("Error")

    }
    

    })
    
})

let port = process.env.PORT || 3000
app.listen(port)