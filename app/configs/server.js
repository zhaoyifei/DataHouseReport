/**
 *  server
 *  服务器基本配置
 *  Created by Jacky.L on 4/16/14.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  db = "zlyweb",
  dbUrl_ut = 'mongodb://localhost/zlyweb_test',
  dbUrl_production = 'mongodb://ZLY-MONGODB-3/' + db,
  dbUrl_test = 'mongodb://ZLY-TEST/' + db,
  dbUrl_local = 'mongodb://localhost/' + db,
  MYSQL_PRO_URL = "ZLY-MYSQL-1",
  MYSQL_UT_URL = "182.92.11.64",
  MYSQL_TEST_URL = "localhost",
  NODE_ENV = process.env.NODE_ENV;

module.exports = {

  dbPort: 27017,
  //生产DB配置
  dbUrl_production: 'mongodb://ZLY-DB-1/' + this.db,
  //本机开发配置
  dbUrl_test: 'mongodb://localhost/zlyweb',

  dbUrl: NODE_ENV == 'production' ? dbUrl_production : NODE_ENV == '_test' ? dbUrl_test : dbUrl_local,
  port: 9010,
  secret: 'wecare',

  env: NODE_ENV == 'production' ? 1 : 0,// 0 测试环境, 1 生产环境

  MYSQL_URL: NODE_ENV == 'production' ? MYSQL_PRO_URL : NODE_ENV == '_test' ? MYSQL_UT_URL : MYSQL_TEST_URL,
  MYSQL_DB_NAME: "zlycare",
  MYSQL_DB_PORT: 3306,
  MYSQL_DB_USER: "juliye",
  MYSQL_DB_PWD:  "juliye@2014"

};
