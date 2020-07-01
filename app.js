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
            'Access-Control-Allow-Origin': '*',
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
	 if(!file.endsWith('.js')) return
    const filename = file.replace(/\.js$/, '');
	
    app.use(`/${filename}`, (req, res, next) => {
		
        const callback = require(`./router/${filename}`);
        callback(req, res, next);
		 console.log('[OK]', decodeURIComponent(req.originalUrl))
		
    });
});


app.get('/',(req,res,body)=>{

    res.render('index')
})

const port = process.env.PORT || 7171
const host = process.env.HOST || ''

app.listen(port, host, () => {
  console.log(`server running @ http://${host ? host : 'localhost'}:${port}`)
})