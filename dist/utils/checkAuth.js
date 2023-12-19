"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _default = exports["default"] = function _default(req, res, next) {
  var token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      var decoded = _jsonwebtoken["default"].verify(token, 'secret123');
      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: 'Нет доступа'
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа'
    });
  }
};