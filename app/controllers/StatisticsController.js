/**
 * Authors: Tom
 * Date: 2015.11.20
 * Copyright (c) 2015 Juliye Care. All rights reserved.
 */

var
  commonUtil = require('../../lib/common-util'),
  apiHandler = require('../configs/ApiHandler'),
  constants = require('../configs/constants'),
  StatisticsService = require('../services/StatisticsService'),
  configs = require('../configs/api');

var StatisticsController = function () {};

StatisticsController.prototype.constructor = StatisticsController;

StatisticsController.prototype.getcarenum = function(req,res){

  StatisticsService.getcarenum().then(function(result){
    apiHandler.OK(res,result);
  },function(err){
    return apiHandler.handleErr(res,err);
  });
};
StatisticsController.prototype.getdoctorpatientrelationnum = function(req,res){

  StatisticsService.getdoctorpatientrelationnum().then(function(result){
    apiHandler.OK(res,result);
  },function(err){
    return apiHandler.handleErr(res,err);
  });
};
StatisticsController.prototype.getdoctordoctorrelationnum = function(req,res){

  StatisticsService.getdoctordoctorrelationnum().then(function(result){
    apiHandler.OK(res,result);
  },function(err){
    return apiHandler.handleErr(res,err);
  });
};
StatisticsController.prototype.getusernum = function(req,res){

  StatisticsService.getusernum().then(function(result){
    apiHandler.OK(res,result);
  },function(err){
    return apiHandler.handleErr(res,err);
  });
};
StatisticsController.prototype.getexclusivedoctornum = function(req,res){

  StatisticsService.getexclusivedoctornum().then(function(result){
    apiHandler.OK(res,result);
  },function(err){
    return apiHandler.handleErr(res,err);
  });
};
StatisticsController.prototype.statistics = function(req,res){

  StatisticsService.statistics().then(function(result){
    apiHandler.OK(res,result);
  },function(err){
    return apiHandler.handleErr(res,err);
  });
};

module.exports = exports = new StatisticsController();