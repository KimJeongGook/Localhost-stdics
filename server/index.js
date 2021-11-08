var express = require('express') // node_modules 내 express 관련 코드를 가져온다
var app = express()
var cors = require('cors') // CORS 설정
var logger = require('morgan') // 요청 본문(request body) 파싱 설정
var mongoose = require('mongoose') // MongoDB 연동하기
var routes = require('./src/routes') // API 구현

// CORS 옵션
var corsOptions = { 
    origin: 'http://localhost:3000', 
    credentials: true 
}

// MongoDB 연동하기
const CONNECT_URL = 'mongodb://localhost:27017/kor_dic_db'
mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongodb connected ..."))
. catch(e => console.log('failed to connect mongodb: ${e}'))

app.use(cors(corsOptions)) // CORS 설정
app.use(express.json()) // request body 설정
app.use(logger('tiny')) // 로거(Logger) 설정
app.use("/api", routes) // API 구현
// URL 응답 테스트
app.get("/hello", (req, res) => { 
    res.send("hello world!")
})
//서버 오류 처리
app.use( (req, res, next) => { // 사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("Sorry can't find page") 
})
//서버 내부 오류 처리
app.use( (err, req, res, next) => { 
    console.error(err.stack) 
    res.status(500).send("something is broken on server !")
})
// 5000 포트로 서버 오픈
app.listen(5000, () => { 
    console.log('Server is running on port 5000...')
})

