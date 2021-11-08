// localhost:5000/api/kor_dic_db/ 주소로 접속하면 브라우저 응답
const express = require('express')
const StdicsRouter = express.Router()
const Stdics = require("../models/Stdics");

// 전체 단어 목록 조회
StdicsRouter.route('/').get( async (req, res) => {
    const Stdicss = await Stdics.find()
    console.log(Stdicss)
    res.json({status: 200, Stdicss})
})
// 특정 단어 조회
StdicsRouter.route('/:id').get( (req, res) => {
    Stdics.findById(req.params.id, (err, stdics) => {
        if(err) throw err;
        res.json({status:200, stdics})
    })
})
StdicsRouter.route('/').post( (req, res) => {
    Stdics.findOne({r_word: req.body.r_word}, async(err, stdics) => { // 중복 체크
        if(err) throw err;
        if(!stdics){ // 데이터베이스에서 해당 단어를 조회하지 못한 경우
            const newStdics = new Stdics(req.body);
            await newStdics.save().then( () => {
                res.json({status:201, msg:'new stdics created in db !', newStdics})
            })
        } else{
            const msg = 'this stdics already exists in db !'
            console.log(msg)
            res.json({status:204, msg})
        }
    })
})
module.exports = StdicsRouter;
