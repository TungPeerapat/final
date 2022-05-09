//Open Call Express
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mysql = require('mysql');

const app = express()
const port = process.env.PORT || 5000;
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'pubilc/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use(bodyParser.json())
//view //
app.set('view engine','ejs')

//MySQL Connect phpMyAdmin
    const pool = mysql.createPool({
    connectionLimit : 10,
    connectTimeout : 20,
    host : 'localhost', //www.google.com/sql or Server IP Address
    user : 'root',
    password : '',
    database : 'nodejs_lottery' //Connect Database from beers.sql (Import to phpMyAdmin)
})

var obj = {}


app.get('/additem',(req, res) => {
    res.render('additem')
})

app.get('/about',(req, res) => {
    res.render('about')
})

//สร้าง GET สำหรับรองรับ DELETE (Copy ของ get('') มาใส่และเปลี่ยนชื่อไฟล์ .ejs)
app.get('/delete',(req, res) => {
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log("connected id : ?", connection.threadId) 
        connection.query('SELECT * FROM lottery', (err, rows) => {
            connection.release();
            if(!err){ 
                //--------Model of Data--------------//
                obj = { lottery : rows, Error : err}
                //-----------Controller--------------//
                res.render('deleteitem', obj)
 
            } else {
                console.log(err)
            }
        })
    })
})

//GET (เรียกข้อมูลขึ้นมาดู) | POST (ส่งข้อมูลหน้า Website กลับเข้ามา)
//GET All Beers (beers.sql)
    app.get('',(req, res) => {

    pool.getConnection((err, connection) =>{ //err คือ connect ไม่ได้ or connection คือ connect ได้บรรทัดที่ 13-19
        if(err) throw err
        console.log(`connected id : ?", ${connection.threadId}`) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`)  //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา

        connection.query('SELECT * FROM lottery', (err, rows) => {
            connection.release();
            if(!err){ 
                obj = {lottery : rows, Error : err}
                res.render('', obj)
            } else {
                console.log(err)
            }
        })
    })
})

app.get('/16_march',(req, res) => {

    pool.getConnection((err, connection) =>{ //err คือ connect ไม่ได้ or connection คือ connect ได้บรรทัดที่ 13-19
        if(err) throw err
        console.log(`connected id : ?", ${connection.threadId}`) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`)  //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา

        connection.query('SELECT * FROM lottery_16march', (err, rows) => {
            connection.release();
            if(!err){ 
                obj = {lottery_16march : rows, Error : err}
                res.render('16_march', obj)
            } else {
                console.log(err)
            }
        })
    })
})

app.get('/16_april',(req, res) => {

    pool.getConnection((err, connection) =>{ //err คือ connect ไม่ได้ or connection คือ connect ได้บรรทัดที่ 13-19
        if(err) throw err
        console.log(`connected id : ?", ${connection.threadId}`) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`)  //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา

        connection.query('SELECT * FROM lottery_16april', (err, rows) => {
            connection.release();
            if(!err){ 
                obj = {lottery_16april : rows, Error : err}
                res.render('16_april', obj)
            } else {
                console.log(err)
            }
        })
    })
})

app.get('/1_april',(req, res) => {

    pool.getConnection((err, connection) =>{ //err คือ connect ไม่ได้ or connection คือ connect ได้บรรทัดที่ 13-19
        if(err) throw err
        console.log(`connected id : ?", ${connection.threadId}`) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`)  //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา

        connection.query('SELECT * FROM lottery_1april', (err, rows) => {
            connection.release();
            if(!err){ 
                obj = {lottery_1april : rows, Error : err}
                res.render('1_april', obj)
            } else {
                console.log(err)
            }
        })
    })
})



//สร้างหน้าย่อย ดึงข้อมูลเฉพาะ id ที่ต้องการ คือ 123, 124, 125
    app.get('/:id',(req, res) => {

    pool.getConnection((err, connection) =>{ //err คือ connect ไม่ได้ or connection คือ connect ได้บรรทัดที่ 13-19
        if(err) throw err
        console.log(`connected id : ${connection.threadId}`) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`)  //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา

        connection.query('SELECT * FROM lottery WHERE `id` = ?', req.params.id, (err, rows) => {
            connection.release();
            if(!err){ 
                obj = {lottery : rows, Error : err}
                res.render('showbyid', obj)
            } else {
                console.log(err)
            }
        })
    })
})
//Add New GET เปลี่ยน path และใส่ตัวแปรไป 2 ตัวคือ name, id
    app.get('/getname_id/:name&:id',(req, res) => {

    pool.getConnection((err, connection) =>{ //err คือ connect ไม่ได้ or connection คือ connect ได้บรรทัดที่ 13-19
        if(err) throw err
        console.log(`connected id : ${connection.threadId}`) //ให้ print บอกว่า Connect ได้ไหม
        //console.log(`connected id : ${connection.threadId}`)  //ต้องใช้ ` อยู่ตรงที่เปลี่ยนภาษา

        //แก้ไขคำสั่ง SQL
        connection.query('SELECT * FROM lottery WHERE `id` = ? OR `number` LIKE ?', [req.params.id, req.params.number], (err, rows) => {
            connection.release();
            if(!err){ //ถ้าไม่ error จะแสดงค่าของตัวแปร rows
                //console.log(rows)
                //res.json(rows)
                obj = {lottery : rows, Error : err}
                res.render('showbyid', obj)
            } else {
                console.log(err)
            }
        })
    })
})

//(1)POST ทำการ INSERT --> req รับข้อมูลมาจากหน้าเว็บ, res จะส่งข้อมูลกลับไปยังหน้าเว็บ
//ใช้คำสั่ง bodyParser.urlencoded เพื่อทำให้สามารถรับข้อมูล x-www-form-urlencoded ทดสอบด้วย Postman ลงฐานข้อมูลได้
    app.use(bodyParser.urlencoded({extended: false})) 
//สร้าง Path ของเว็บไซต์ additem
    app.post('/additem',(req, res) => {
    pool.getConnection((err, connection) => { //pool.getConnection สำหรับใช้เชื่อมต่อกับ Database 
        if(err) throw err
            const params = req.body

                //Check 
                pool.getConnection((err, connection2) => {
                    connection2.query(`SELECT COUNT(id) AS count FROM lottery WHERE id = ${params.id}`, (err, rows) => {
                        if(!rows[0].count){
                            connection.query('INSERT INTO lottery SET ?', params, (err, rows) => {
                                connection.release()
                                if(!err){
                                    //บรรทัดที่ 112 – 114 แจ้งผู้ใช้ว่า เพิ่มข้อมูลสำเร็จ//
                                    obj = {Error:err, mesg : `Success adding data ${params.number}`}                              
                                    res.render('additem', obj)
                                }else {
                                    console.log(err)
                                    }
                                })           
                        } else {
                            // บรรทัดที่ 120-121 แจ้งผู้ใช้ว่า ไม่สามารถเพิ่มข้อมูลได้ เพราะ id นั้นมีแล้ว //
                            obj = {Error:err, mesg : `Can not adding data ${params.number}`}                           
                            res.render('additem', obj)
                            }
                        })
                    })
                })
            })

    app.post('/additem',(req, res) => {
    pool.getConnection((err, connection) => { //pool.getConnection สำหรับใช้เชื่อมต่อกับ Database 
        if(err) throw err
            const params = req.body

                //Check 
                pool.getConnection((err, connection2) => {
                    connection2.query(`SELECT COUNT(id) AS count FROM lottery WHERE id = ${params.id}`, (err, rows) => {
                        if(!rows[0].count){
                            connection.query('INSERT INTO lottery SET ?', params, (err, rows) => {
                                connection.release()
                                if(!err){
                                    //บรรทัดที่ 112 – 114 แจ้งผู้ใช้ว่า เพิ่มข้อมูลสำเร็จ//
                                    obj = {Error:err, mesg : `Success adding data ${params.number}`}                                   
                                    res.render('additem', obj)
                                }else {
                                    console.log(err)
                                    }
                                })           
                        } else {
                            // บรรทัดที่ 120-121 แจ้งผู้ใช้ว่า ไม่สามารถเพิ่มข้อมูลได้ เพราะ id นั้นมีแล้ว //
                            obj = {Error:err, mesg : `Can not adding data ${params.number}`}                           
                            res.render('additem', obj)
                            }
                        })
                    })
                })
            })

            app.post('/delete',(req, res) => {     //ใช้ POST เข้าจัดการจะปลอดภัยกว่าแบบเดิม
                var mesg
                pool.getConnection((err, connection) =>{
                    if(err) throw err
                    console.log("connected id : ?", connection.threadId)
             
                    const {id} = req.body
                     
                    connection.query('DELETE FROM `lottery` WHERE `lottery`.`id` = ?', [id], (err, rows) => {
                        connection.release();
                        if(!err){ 
                            //res.send(`${[req.params.id]} is complete delete item. `) 
                            mesg = `${[id]} is complete delete item.`
                            //res.render('deleteitem', obj)
                        } else {
                            mesg = `${[id]} can not delete item.`
                            //res.render('deleteitem', obj)
                        }
                    })
                })
             
                pool.getConnection((err, connection) =>{
                    if(err) throw err
                    console.log("connected id : ?", connection.threadId) 
                    connection.query('SELECT * FROM lottery', (err, rows) => {
                        connection.release();
                         
                        if(!err){ 
                            //--------Model of Data--------------//
                            obj = { lottery : rows, Error : err, mesg : mesg}
                            //-----------Controller--------------//
                            res.render('deleteitem', obj)
             
                        } else {
                            console.log(err)
                        }
                    })
                })
            })

//(3)PUT ทำการ UPDATE ข้อมูลใน Database ใช้วิธีการทดสอบทำเช่นเดียวกับของ POST
    app.put('/update',(req, res) => {
    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log("connected id : ?", connection.threadId)

        //สร้างตัวแปรแบบกลุ่ม
        const {id, number, tagline, description, image} = req.body       

        //Update ข้อมูลต่าง ๆ ตามลำดับ โดยใช้เงื่อนไข id
        connection.query('UPDATE lottery SET number = ?, tagline = ?, description = ?, image = ? WHERE id = ?', [number, tagline, description, image, id], (err, rows) => {
            connection.release();
            if(!err){ 
                res.send(`${number} is complete update item. `) 
            } else {
                console.log(err)
            }
        })
    })
})

    app.listen(port, () =>
    console.log("listen on port : ?", port)    
)