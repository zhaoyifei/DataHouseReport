/**
 * 医生信息
 * @type {exports}
 */
var
  mongodb = require('../configs/db'),
  Schema = mongodb.mongoose.Schema;

var PriceSchema = new Schema({
  //_id: {type: Schema.ObjectId, unique: true},
  customerInitiateTime: {type: Number, default: 5}, //患者起步价包含时长，单位分钟
  doctorInitiateTime: {type: Number, default: 5}, //医生起步价包含时长,单位分钟
  initiatePayment: Number, //患者起步支出
  initiateIncome: Number, //医生起步收入
  paymentPerMin: Number, //患者起步时长后每分钟支出
  incomePerMin: Number, //医生起步时长后每分钟收入
  discount: {type: Number, default: 1}  //给患者的折扣 0~1之间
});

var ServiceSchema = new Schema({  //服务内容
  serviceId:String,
  category:Number,
  title:String,
  description:String,
  refPriceL:Number,
  discount:Number,
  //startWorkAt:Number,
  //endWorkAt:Number,
  membershipPrice:Number,
  isSigned:Boolean,
  brokerId:String,
  brokerName:String,
  brokerAvatar:String,
  brokerContact:String,
  brokerRank:Number,

  hospitalName:String,
  hospitalId:String,
  departmentName:String,
  departmentId:String,
  hospitalGrade:Number,
  provinceId: {type:String ,default: ""},     //省市ID
  provinceName: {type:String ,default: ""},   //省市名字（河北省/北京市）
  cityId: {type:String ,default: ""},         //市/区ID
  cityName: {type:String ,default: ""}        //市/区名字 （石家庄市/朝阳区）
});

var HospitalSchema = new Schema({  //出诊地点
  hospitalName:String,
  hospitalId:String,
  departmentName:String,
  departmentId:String,
  hospitalGrade:Number,
  provinceId: {type:String ,default: ""},     //省市ID
  provinceName: {type:String ,default: ""},   //省市名字（河北省/北京市）
  cityId: {type:String ,default: ""},         //市/区ID
  cityName: {type:String ,default: ""}        //市/区名字 （石家庄市/朝阳区）
});

var MembershipSchema = new Schema({   //会员
  userId:String,
  userNickname:String,
  userContact:String,
  userAvatar:String,
  validAt:Number,
  expiredAt:Number
});
var FansSchema = new Schema({
  fanId: String,
  createdAt: {type: Number, default: Date.now}
});
var DoctorSchema = new Schema({
  doctorId: String,
  createdAt: {type: Number, default: Date.now}
});

var fields = {
  source: {type: String, default: 'zlyapp'},//数据来源:  docChat-医聊注册
  applyStatus: {type: String, default: 'handling'}, //医生申请状态：handling-处理中 done-已完成
  phoneNum: String,//注册手机号码,必需
  docChatNum: String,//医聊号码
  realName: {type: String, default: ''},//真实姓名
  password: String,
  sex: {type: String, default: '男'},
  avatar: String,
  bussinessCardNum: {type: Number, default: 0}, //已发名片数目
  pushId: String, // 绑定的第三方Push Server ID
  pushType: {type: String, default: 'jg'}, // 绑定的第三方Push Type : baidu、jg、mi
  profileId: String,         //医生Id  profile表中的 _id
  isSigned: {type:Boolean , default:false},
  isApproved:{type:Boolean,default:false}, //医生是否已经认证

  isOnline: {type: Boolean, default: false},
  message2Customer: String, //给所有患者的留言
  offlineCallers: [String], //下线时打电话患者的电话号码
  queryByDeviceIds: [String], //查询过医生的deviceId
  favoritedNum: {type: Number, default: 0}, //被患者收藏数
  scannedNum: {type: Number, default: 0}, //二维码被扫描次数
  sharedNum: {type: Number, default: 0}, //被分享次数
  orderNum: {type: Number, default: 0}, //电话总数
  callPrice: {type: Schema.Types.Mixed, ref: PriceSchema},

  hospital: String,     //执业地点
  hospitalId: String,       //执业地点Id
  hospitalGrade: Number,
  department: String,   //科室
  departmentId: String,     //科室Id
  provinceId: {type:String ,default: ""},     //省市ID
  provinceName: {type:String ,default: ""},   //省市名字（河北省/北京市）
  cityId: {type:String ,default: ""},         //市/区ID
  cityName: {type:String ,default: ""},        //市/区名字 （石家庄市/朝阳区）
  position: String,   //职称
  specialize: String, //擅长
  doctorIntro: String,  //简介
  doctorSearchTags:[String],                    //搜索表签

  services:[ServiceSchema],

  membership:[MembershipSchema],                //会员信息
  membershipSize: {type: Number, default: 0},  //capacity            //会员名额
  membershipPrice: {type: Number, default: 0},                       //会员价格
  soldNum:{type: Number, default: 0},                               //会员数
  assistant:{                                  //助理信息
    id:String,
    name:String
  },

  fans:[FansSchema],              // 被关注
  upperDoctors: [DoctorSchema],   // 上限医生
  lowerDoctors: [DoctorSchema],   // 下限医生
  fansNum: {type: Number, default: 0},
  upperDoctorsNum: {type: Number, default: 0},
  lowerDoctorsNum: {type: Number, default: 0},

  lastestLoginTime: {type: Number, default: Date.now},
  createdAt: {type: Number, default: Date.now},//用户注册时间
  updatedAt: {type: Number, default: Date.now},//用户最近的更新时间
  isDeleted: {type: Boolean, default: false}//该条记录是否被删除


};
var selectFields = "-phoneNum -password";
//(function () {
//  for (var fi in fields) {
//    selectFields += fi + " ";
//  }
//})();
var doctorSchema = new Schema(fields, {
  collection: 'doctors'
});

var Summary = mongodb.mongoose.model('Summary', doctorSchema);
Summary.fields = fields;
Summary.selectFields = selectFields;
module.exports = Summary;
