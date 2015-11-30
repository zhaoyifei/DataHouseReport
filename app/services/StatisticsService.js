/**
 * Created by zhaoyifei on 15/11/19.
 */

var Order = require('../models/Order'),
  User = require('../models/User'),
  Statistics = require('../models/Statistics'),
  Summary = require('../models/Summary'),
  commonUtil = require('../../lib/common-util'),
  CONS = require('../configs/constants'),
  ErrorHandler = require('../../lib/ErrorHandler'),

  Q = require("q"),
  Promise = require('promise');

var StatisticsService = function () {
};
//平台每日care数量，每天一个数值
StatisticsService.prototype.getcarenum = function(){
  var condition = {
    infoType: "statistics",
    infoName: "carenum"
  };
  return Statistics.find(condition).sort({infoTime : -1}).limit(7).exec();
};
//
StatisticsService.prototype.getdoctorpatientrelationnum = function(){
  var condition = {
    infoType: "statistics",
    infoName: "doctorpatientrelationnum"

  };
  return Statistics.find(condition).sort({infoTime : 1}).limit(7).exec();
};
StatisticsService.prototype.getdoctordoctorrelationnum = function(){
  var condition = {
    infoType: "statistics",
    infoName: "doctordoctorrelationnum"
  };
  return Statistics.find(condition).sort({infoTime : 1}).limit(7).exec();
};
StatisticsService.prototype.getusernum = function(){
  var condition = {
    infoType: "statistics",
    infoName: "usernum"
  };
  return Statistics.find(condition).sort({infoTime : 1}).limit(7).exec();
};
StatisticsService.prototype.getexclusivedoctornum = function(){
  var condition = {
    infoType: "statistics",
    infoName: "exclusivedoctornum"
  };
  return Statistics.find(condition).sort({infoTime : 1}).limit(7).exec();
};
StatisticsService.prototype.statistics = function(){
  var now = Date.now();
  var ONE_DATE = 1*24*60*60*1000;
  var last_zero = now - now%86400000 - 8*60*60*1000;
  var last_24_hours = last_zero - ONE_DATE;
  return Promise.all([
    Order.count({createdAt:{$lt: last_zero, $gt: last_24_hours}}).exec(),
    Summary.aggregate({$group:{"_id":"$unexistitem",
        "fansNum":{$sum:"$fansNum"},
        "upperDoctorsNum":{$sum:"$upperDoctorsNum"},
        "lowerDoctorsNum":{$sum:"$lowerDoctorsNum"}
        ,"soldNum":{$sum:"$soldNum"}
      }}).exec(),
    User.count({}).exec()
  ]).then(function(results){
    console.log(results);
    var carenum = {
      infoType: "statistics",
      infoName: "carenum",
      infoTime: last_zero,
      info: results[0],
      description: "平台每日care量"
    };
    var doctorpatientrelationnum = {
      infoType: "statistics",
      infoName: "doctorpatientrelationnum",
      infoTime: last_zero,
      info: results[1][0].fansNum,
      description: "医生患者关系"
    };
    var doctordoctorrelationnum = {
      infoType: "statistics",
      infoName: "doctordoctorrelationnum",
      infoTime: last_zero,
      info: results[1][0].upperDoctorsNum,
      description: "医生转诊关系数"
    };
    var usernum = {
      infoType: "statistics",
      infoName: "usernum",
      infoTime: last_zero,
      info: results[2],
      description: "用户总数"
    };
    var exclusivedoctornum = {
      infoType: "statistics",
      infoName: "exclusivedoctornum",
      infoTime: last_zero,
      info: results[1][0].soldNum,
      description: "专属医生签约会员数"
    };
    return Promise.all([
      Statistics.findOneAndUpdate({ infoType: "statistics",
        infoName: "carenum", infoTime: last_zero},carenum,{upsert: true, new: true}).exec(),
      Statistics.findOneAndUpdate({ infoType: "statistics",
        infoName: "doctorpatientrelationnum", infoTime: last_zero},doctorpatientrelationnum,{upsert: true, new: true}).exec(),
      Statistics.findOneAndUpdate({ infoType: "statistics",
        infoName: "doctordoctorrelationnum", infoTime: last_zero},doctordoctorrelationnum,{upsert: true, new: true}).exec(),
      Statistics.findOneAndUpdate({ infoType: "statistics",
        infoName: "usernum", infoTime: last_zero},usernum,{upsert: true, new: true}).exec(),
      Statistics.findOneAndUpdate({ infoType: "statistics",
        infoName: "exclusivedoctornum", infoTime: last_zero},exclusivedoctornum,{upsert: true, new: true}).exec()
    ]);

  });
};

StatisticsService.prototype.mapReduce = function(){
  var mapreduce = {
    mapreduce:'orders',
    map:function(){
      var time = new Date(this.createdAt);
      var d = time.getDate()+"/"+(time.getMonth()+1)+"/"+time.getFullYear();
      emit(d, this);
    },
    reduce:function(key,emits){
      return Array.isArray(emits) ? emits.length : 1;
    },
    out:'a'
  };
  return Order.mapReduce(mapreduce)
    .then(function(model, stats) {
      console.log('map reduce took %d ms', stats.processtime);
      return model.find().exec();
    })
      .then(function(results){
        results.forEach();
    var carenum = {
      infoType: "statistics",
      infoName: "carenum",
      infoTime: last_zero,
      info: results[0],
      description: "平台每日care量"
    };

    return Promise.all([
      Statistics.findOneAndUpdate({ infoType: "statistics",
        infoName: "carenum", infoTime: last_zero},carenum,{upsert: true, new: true}).exec()
    ]);

  });
};

StatisticsService.prototype.getRanking = function(){
  var condition = {
    infoType: "statistics",
    infoName: "exclusivedoctornum"
  };
  return Statistics.find(condition).sort({infoTime : 1}).limit(7).exec();
};


StatisticsService.prototype.getRanking = function(){
  var condition = {
    infoType: "statistics",
    infoName: "exclusivedoctornum"
  };
  return Statistics.find(condition).sort({infoTime : 1}).limit(7).exec();
};
module.exports = exports = new StatisticsService();