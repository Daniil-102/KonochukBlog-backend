"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _expressValidator = require("express-validator");
var _default = exports["default"] = function _default(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return res.status(404).json(errors.array());
  }
  next();
};