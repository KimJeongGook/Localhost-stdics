const mongoose = require('mongoose')
 
const stdicsSchema = mongoose.Schema({
    r_seq : { type: String, trim: true},
    r_word : { type: String, required: true, trim: true},
    r_pos : { type: String, required: true, trim: true},
    r_link : { type: String, required: true, trim: true},
    r_chi : { type: String, required: true, trim: true},
    r_des : { type: String, required: true, trim: true},
} // , {collection : 'kor_dic_db'} 
)
//스키마로부터 생성된 모델 객체
const Stdics = mongoose.model('Stdics', stdicsSchema, 'kor_dic_db') 
module.exports = Stdics;