"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _multer = _interopRequireDefault(require("multer"));
var _cors = _interopRequireDefault(require("cors"));
var _vallidations = require("./validations/vallidations.js");
var _index = require("./controllers/index.js");
var _index2 = require("./utils/index.js");
var _PostController = require("./controllers/PostController.js");
var _UserController = require("./controllers/UserController.js");
var _expressSession = _interopRequireDefault(require("express-session"));
_mongoose["default"].connect(process.env.MONGODB_URI).then(function () {
  return PostModel.collection.createIndex({
    createdAt: -1
  });
}).then(function () {
  return console.log('DB ok');
})["catch"](function (er) {
  return console.log('DB error', er);
});
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use('/uploads', _express["default"]["static"]('uploads'));
app.use((0, _cors["default"])());
app.use((0, _expressSession["default"])({
  secret: 'secret123',
  resave: false,
  saveUninitialized: true
}));
var storage = _multer["default"].diskStorage({
  destination: function destination(_, __, cb) {
    cb(null, 'uploads');
  },
  filename: function filename(_, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});
app.post('/upload', _index2.checkAuth, upload.single('image'), function (req, res) {
  res.json({
    url: "/uploads/".concat(req.file.originalname)
  });
});
app.post('/auth/login', _vallidations.loginValidation, _index2.handleValidationErrors, _index.login);
app.post('/auth/logout', _index2.checkAuth, _UserController.logout);
app.post('/auth/register', _vallidations.registerValidation, _index2.handleValidationErrors, _index.register);
app.get('/auth/me', _index2.checkAuth, _index.getMe);
app.get('/tags', _PostController.getLastTags);
app.get('/comments', _PostController.getLastComments);
app.get('/posts/tag/:tag', _PostController.getByTag);
app.get('/posts', _index.getAll);
app.get('/posts/new', _PostController.getNew);
app.get('/posts/popular', _PostController.getPopular);
app.get('/posts/:id', _index.getOne);
app.post('/posts', _index2.checkAuth, _vallidations.postCreateValidation, _index2.handleValidationErrors, _index.create);
app["delete"]('/posts/:id', _index2.checkAuth, _index.remove);
app.patch('/posts/:id', _vallidations.postCreateValidation, _index2.checkAuth, _index2.handleValidationErrors, _index.update);
app.listen(process.env.PORT || 3002, function (err) {
  if (err) console.log(err);
  console.log("server started");
});