const path = require('path')
const fs = require('fs')
const express = require('express')
const cache = require('apicache').middleware
const app = express()
const ejs = require('ejs')
// CORS & Preflight request
app.use((req, res, next) => {
    if (req.path !== '/' && !req.path.includes('.')) {
        res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': req.headers.origin || '*',
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8'
        })
    }
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})


app.engine('html', ejs.__express);  // 靜態頁面後綴名設置
app.set('view engine', 'html')


// 静态资源
app.use(express.static("./public"));


// cache 接口数据缓存 2 分钟
app.use(cache('2 minutes', ((req, res) => res.statusCode === 200)))


fs.readdirSync(path.join(__dirname, 'router')).reverse().forEach(file => {
    const filename = file.replace(/\.js$/, '');
    app.use(`/${filename}`, (req, res, next) => {
        const callback = require(`./router/${filename}`);
        callback(req, res, next);
    });
});


app.get('/',(req,res,body)=>{

    res.render('index')
})


app.listen(3300, 'localhost', () => {

    console.log('running at', 'http://localhost:3300')
})