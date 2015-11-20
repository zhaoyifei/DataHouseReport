/**
 * Authors: Tom
 * Date: 2015.11.20
 * Copyright (c) 2015 Juliye Care. All rights reserved.
 */
var
  StatisticsController = require('./controllers/StatisticsController');


module.exports = function (app) {
  app.get("/statistics", StatisticsController.statistics);

  app.get("/carenum", StatisticsController.getcarenum);
  app.get("/doctorpatientrelationnum", StatisticsController.getdoctorpatientrelationnum);
  app.get("/doctordoctorrelationnum", StatisticsController.getdoctordoctorrelationnum);
  app.get("/usernum", StatisticsController.getusernum);
  app.get("/exclusivedoctornum", StatisticsController.getexclusivedoctornum);
};
