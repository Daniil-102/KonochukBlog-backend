"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var PostSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    "default": []
  },
  comments: {
    type: Array,
    "default": []
  },
  viewsCount: {
    type: Number,
    "default": 0
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: String
}, {
  timestamps: true
});
PostSchema.index({
  createdAt: 1
});
var _default = exports["default"] = _mongoose["default"].model('Post', PostSchema);