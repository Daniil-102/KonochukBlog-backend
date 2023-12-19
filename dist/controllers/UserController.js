"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.logout = exports.login = exports.getMe = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _User = _interopRequireDefault(require("../models/User.js"));
var _excluded = ["passwordHash"],
  _excluded2 = ["passwordHash"],
  _excluded3 = ["passwordHash"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var register = exports.register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var password, salt, pass, doc, user, token, _user$_doc, passwordHash, userData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          password = req.body.password;
          _context.next = 4;
          return _bcrypt["default"].genSalt(10);
        case 4:
          salt = _context.sent;
          _context.next = 7;
          return _bcrypt["default"].hash(password, salt);
        case 7:
          pass = _context.sent;
          doc = new _User["default"]({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: pass
          });
          _context.next = 11;
          return doc.save();
        case 11:
          user = _context.sent;
          token = _jsonwebtoken["default"].sign({
            _id: user._id
          }, 'secret123', {
            expiresIn: '30d'
          });
          _user$_doc = user._doc, passwordHash = _user$_doc.passwordHash, userData = (0, _objectWithoutProperties2["default"])(_user$_doc, _excluded);
          res.json(_objectSpread(_objectSpread({}, userData), {}, {
            token: token
          }));
          _context.next = 21;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            message: 'Не удалось зарегистрироваться'
          });
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var login = exports.login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user, isValidPass, token, _user$_doc2, passwordHash, userData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _User["default"].findOne({
            email: req.body.email
          });
        case 3:
          user = _context2.sent;
          if (user) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Пользователь не найден'
          }));
        case 6:
          _context2.next = 8;
          return _bcrypt["default"].compare(req.body.password, user._doc.passwordHash);
        case 8:
          isValidPass = _context2.sent;
          if (isValidPass) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Неверный логин или пароль'
          }));
        case 11:
          token = _jsonwebtoken["default"].sign({
            _id: user._id
          }, 'secret123', {
            expiresIn: '30d'
          });
          _user$_doc2 = user._doc, passwordHash = _user$_doc2.passwordHash, userData = (0, _objectWithoutProperties2["default"])(_user$_doc2, _excluded2);
          res.json(_objectSpread(_objectSpread({}, userData), {}, {
            token: token
          }));
          _context2.next = 20;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            message: 'Не удалось авторизоваться'
          });
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var logout = exports.logout = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          req.session.destroy(function (err) {
            if (err) {
              res.status(500).json({
                message: 'Internal Server Error'
              });
            } else {
              res.json({
                message: 'Logout successful'
              });
            }
          });
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function logout(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getMe = exports.getMe = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var user, _user$_doc3, passwordHash, userData;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _User["default"].findById(req.userId);
        case 3:
          user = _context4.sent;
          if (user) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Пользователя не найдено'
          }));
        case 6:
          _user$_doc3 = user._doc, passwordHash = _user$_doc3.passwordHash, userData = (0, _objectWithoutProperties2["default"])(_user$_doc3, _excluded3);
          res.json(userData);
          _context4.next = 14;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json({
            message: 'Нет доступа'
          });
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function getMe(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();