var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../models/goods_model');
var Clothes = model.Clothes;
var Guild = model.Guild;
var Account = model.Account;
mongoose.connect('mongodb://yrq110:room506@ds041536.mlab.com:41536/ah_db');


// router.get('/db', function (req, res) {
//
//     res.render('db_manager');
// });


router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/stone', function (req, res) {
    res.render('stone');
});

router.get('/want', function (req, res) {
    res.render('want');
});

router.get('/guild', function (req, res) {

    // var guild = new Guild({
    //     name : '唧唧复唧唧',
    //     union : '恶人谷',
    //     level : 3,
    //     construct: 0,
    //     fund : 83000,
    //     main_tree : ['上限200人', '16结构', '四仓库'],
    //     weekly_tree : ['双倍活动资金', '骑马跑商', '十五神行', '跑商奖励帮会资金+20%'],
    //     status : true,
    //     price : 600,
    //     picture : ['yankou.jpg', 'shishui.jpg']
    // });
    // guild.save();
    // console.log(guild);

    var guilds = [];
    var _name = [];
    var _union = [];
    var _level = [];
    var _construct = [];
    var _fund = [];
    var _main_tree = [];
    var _weekly_tree = [];
    var _status = [];
    var _price = [];
    var _picture = [];
    var _no = [];
    Guild.find({}, function (err, callback) {

        for (var i=0; i<callback.length; i++) {
            // console.log(callback[i]);
            guilds.push(callback[i]);
        }

        for (var i=0; i<guilds.length; i++) {
            _name.push(guilds[i].name);
            _union.push(guilds[i].union);
            _level.push(guilds[i].level);
            _construct.push(guilds[i].construct);
            _fund.push(guilds[i].fund);
            _main_tree.push(guilds[i].main_tree);
            _weekly_tree.push(guilds[i].weekly_tree);
            _status.push(guilds[i].status);
            _price.push(guilds[i].price);
            _picture.push(guilds[i].picture);
            _no.push(guilds[i].No);
        }

        console.log('load complete');
        // console.log(guilds[0].name + guilds[0].level);
        res.render('guild', { name: _name, union: _union, level: _level, construct:_construct, fund:_fund, main_tree: _main_tree, weekly_tree: _weekly_tree, status: _status, price: _price, picture: _picture, no:_no});
    })
    
    // res.render('guild');
});


router.get('/clothes', function (req, res) {


// var clothes = new Clothes({
//     name : '沧海间·逝水',
//     price : 120,
//     limited : true,
//     class : '外装',
//     position : '衣服',
//     picture : ['shishui.jpg'],
//     year : 2014,
//     extra : ['五周年', '成衣']
// });
// clothes.save();

    console.log("Sample log");

    var clothes = [];

    Clothes.find({}, function (err, callback) {

        for (var i=0; i<callback.length; i++) {
            console.log(callback[i].name);
            clothes.push(callback[i].name);
        }

        var clothes_pic = ['images/clothes/yankou.jpg', 'images/clothes/shishui.jpg'];

        res.render('clothes', { clothes: clothes, clothesPic: clothes_pic});

    })

    console.log(clothes);

});

router.get('/query',function (req, res, next) {

    var _level = req.query.level == "null" ? {$exists:true} : req.query.level;
    var _union = req.query.union == "null" ? {$exists:true} : req.query.union;
    var _stats = req.query.status == "null" ? {$exists:true} : req.query.status;
    var _main_tree = req.query.main_tree == "null" ? {$exists:true} : {$regex:req.query.main_tree};
    var _weekly_tree = req.query.weekly_tree == "null" ? {$exists:true} : {$regex:req.query.weekly_tree};

    // console.log('tree is ' + typeof(req.query.main_tree));
    // if (req.query.main_tree == "") {console.log('cool!!!!');}

    if (req.query.price == "null") {
        var _price = {$exists:true};
    } else {
        var pri = req.query.price.toString();
        var no_1 = parseInt(pri.split("-")[0]);
        var no_2 = parseInt(pri.split("-")[1]);
        console.log("number1 : " + no_1 + "; number2 : " + no_2);
        var _price = {$gte:no_1, $lt:no_2};
    }

    if (_stats == "true") {
        var _status = true;
        console.log("status is true");
    } else if (_stats == "false") {
        var _status = false;
        console.log("status is false");
    } else {
        var _status = {$exists:true};
    }

    Guild.find({level: _level, union: _union, status: _status, price: _price, main_tree: _main_tree, weekly_tree: _weekly_tree}, function(err, docs){
        console.log(docs);


        var str = "<a href='/guild'>查找成功 点击返回主页</a><br />" + docs;
        var queryString = "level is " + req.query.level + "; union is " + req.query.union + "; status is " + req.query.status + "; price is " + req.query.price;
        str2 = str + "<br />" + queryString;
        // res.send(str2);

        var guilds = [];
        var _name = [];
        var _union = [];
        var _level = [];
        var _construct = [];
        var _fund = [];
        var _main_tree = [];
        var _weekly_tree = [];
        var _status = [];
        var _price = [];
        var _picture = [];
        var _no = [];

        for (var i = 0; i < docs.length; i++) {
            // console.log(callback[i]);
            guilds.push(docs[i]);
        }

        for (var i = 0; i < guilds.length; i++) {
            _name.push(guilds[i].name);
            _union.push(guilds[i].union);
            _level.push(guilds[i].level);
            _construct.push(guilds[i].construct);
            _fund.push(guilds[i].fund);
            _main_tree.push(guilds[i].main_tree);
            _weekly_tree.push(guilds[i].weekly_tree);
            _status.push(guilds[i].status);
            _price.push(guilds[i].price);
            _picture.push(guilds[i].picture);
            _no.push(guilds[i].No);
        }

        console.log('load complete');

        res.render('guild', {
            name : _name,
            union : _union,
            level : _level,
            construct : _construct,
            fund : _fund,
            main_tree : _main_tree,
            weekly_tree : _weekly_tree,
            status : _status,
            price : _price,
            picture : _picture,
            no : _no
        });

    });
});


router.get('/account', function (req, res) {

    // var account = new Account({
    //
    //     publish : '2016-10-02',
    //     keyword : ['95级','七秀','女','浩气盟','橙武','九天','劲足赤兔','5红发','夜话白鹭'],
    //     game_time : 200,
    //     name : 'name',
    //     server : '网三念破',
    //     level : 95,
    //     job : '七秀',
    //     sex : true,
    //     size : '成女',
    //     achievement : 12000,
    //     clothes : ['人面桃花','沧海间·烟扣'],
    //     horse : ['里飞沙','赤兔飞虹'],
    //     price : 29999,
    //     status : true,
    //     picture : {
    //         character : ['shishui.jpg','shishui.jpg'],
    //         clothes : ['shishui.jpg','shishui.jpg'],
    //         backpack : ['shishui.jpg','shishui.jpg'],
    //         equip : ['shishui.jpg','shishui.jpg'],
    //         achievement : ['shishui.jpg','shishui.jpg'],
    //         other : ['shishui.jpg','shishui.jpg']
    //     }
    //
    // });
    // account.save();
    // console.log(account);

    var accounts = [];
    var _publish = [];
    var _keyword = [];
    var _game_time = [];
    var _server = [];
    var _level = [];
    var _job = [];
    var _sex = [];
    var _size = [];
    var _achievement = [];
    var _clothes = [];
    var _horse = [];
    var _price = [];
    var _status = [];
    var _picture = [];

    Account.find({}, function (err, callback) {

        for (var i=0; i<callback.length; i++) {
            // console.log(callback[i]);
            accounts.push(callback[i]);
        }

        for (var i=0; i<accounts.length; i++) {
            _publish.push(accounts[i].publish);
            _keyword.push(accounts[i].keyword);
            _game_time.push(accounts[i].game_time);
            _server.push(accounts[i].server);
            _level.push(accounts[i].level);
            _job.push(accounts[i].job);
            _sex.push(accounts[i].sex);
            _size.push(accounts[i].size);
            _achievement.push(accounts[i].chievement);
            _clothes.push(accounts[i].clothes);
            _horse.push(accounts[i].horse);
            _price.push(accounts[i].price);
            _status.push(accounts[i].status);
            _picture.push(accounts[i].picture)
        }

        console.log('load complete' + _picture[0]['character']);
        // console.log(guilds[0].name + guilds[0].level);
        res.render('account',{
            publish : _publish,
            keyword : _keyword,
            game_time : _game_time,
            server : _server,
            level : _level,
            job: _job,
            sex: _sex,
            size: _size,
            achievement: _achievement,
            clothes: _clothes,
            horse: _horse,
            price: _price,
            status: _status,
            picture : _picture
        });
    })
});

module.exports = router;
