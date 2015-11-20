/**
 *
 *  Order
 *  订单信息, 顾客订购经纪人的代理服务
 */

var
  mongodb = require('../configs/db'),
  Schema = mongodb.mongoose.Schema;
var fields = {

  isSignedOrder:{type:Boolean , default:false}, //签约订单


  createdAt: {type: Number, default: Date.now},//新建时间
  updatedAt: {type: Number, default: Date.now},//最近的更新时间
  completedAt: {type: Number , default:0},    //完成订单服务时间
  isDeleted: {type: Boolean, default: false}   //该条记录是否被删除
};

var selectFields = "";
(function(){
  for(var fi in fields){
    selectFields+= fi+" ";
  }
})();

var OrderSchema = new Schema(fields,{
  collection: 'orders'
});

var Order = mongodb.mongoose.model('Order', OrderSchema);
Order.fields = fields;
Order.selectFields = selectFields;
module.exports = Order;