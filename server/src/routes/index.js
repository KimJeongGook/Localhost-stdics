// localhost:5000/api 주소의 서브 URL로 / kor_dic_db 사용
const express = require('express')
const router = express.Router()
const stdics = require('./stdics')

router.use('/kor_dic_db', stdics)

module.exports = router