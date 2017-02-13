var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Clothes = new Schema({
    name : String,
    price : Number,
    limited : Boolean,
    picture : [String],
    class : String,
    position : String,
    year : Number,
    extra : [String]
});

var _Guild = new Schema({
    No : Number,
    name : String,
    union : String,
    level : Number,
    construct: Number,
    fund : Number,
    main_tree : [String],
    weekly_tree : [String],
    status : Boolean,
    picture : [String],
    price : Number
});

var _Stone = new Schema({
    level : Number,
    count : Number,
    group : Number,
    peel : Boolean
});

var _Account = new Schema({
    publish : String,
    keyword : [String],
    game_time : Number,
    name : String,
    server : String,
    level : Number,
    job : String,
    sex : Boolean,
    size : String,
    achievement : Number,
    clothes : [String],
    horse : [String],
    price : Number,
    status : Boolean,
    picture : {
        character : [String],
        clothes : [String],
        backpack : [String],
        achievement : [String],
        other : [String]
    }
});

exports.Clothes = mongoose.model('Clothes', _Clothes);
exports.Guild = mongoose.model('Guild', _Guild);
exports.Stone = mongoose.model('Stones', _Stone);
exports.Account = mongoose.model('Account', _Account);