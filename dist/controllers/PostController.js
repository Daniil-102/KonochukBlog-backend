"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.remove = exports.getPopular = exports.getOne = exports.getNew = exports.getLastTags = exports.getLastComments = exports.getByTag = exports.getAll = exports.create = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Post = _interopRequireDefault(require("../models/Post.js"));
var getLastTags = exports.getLastTags = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var posts, tags;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _Post["default"].find().limit(5).exec();
        case 3:
          posts = _context.sent;
          tags = posts.map(function (post) {
            return post.tags;
          }).flat().slice(0, 5);
          res.json(tags);
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            message: 'Не удалось получить статьи'
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function getLastTags(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getLastComments = exports.getLastComments = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var posts, comments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Post["default"].find().limit(5).exec();
        case 3:
          posts = _context2.sent;
          comments = posts.map(function (post) {
            return post.comments;
          }).flat().slice(0, 5);
          res.json(comments);
          _context2.next = 12;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            message: 'Не удалось получить статьи'
          });
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function getLastComments(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getAll = exports.getAll = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var posts, tags;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Post["default"].find().populate('user').exec();
        case 3:
          posts = _context3.sent;
          tags = posts.map(function (post) {
            return post.tags;
          }).flat().slice(0, 5);
          res.json({
            posts: posts,
            tags: tags
          });
          _context3.next = 12;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json({
            message: 'Не удалось получить статьи'
          });
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function getAll(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getNew = exports.getNew = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var posts, sortedPosts, tags;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Post["default"].find().populate('user').exec();
        case 3:
          posts = _context4.sent;
          sortedPosts = (0, _toConsumableArray2["default"])(posts).sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          tags = sortedPosts.map(function (post) {
            return post.tags;
          }).flat().slice(0, 5);
          res.json({
            posts: sortedPosts,
            tags: tags
          });
          _context4.next = 13;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json({
            message: 'Не удалось получить статьи'
          });
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function getNew(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getPopular = exports.getPopular = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var posts, sortedPostsByViewsCount, tags;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Post["default"].find().populate('user').exec();
        case 3:
          posts = _context5.sent;
          sortedPostsByViewsCount = (0, _toConsumableArray2["default"])(posts).sort(function (a, b) {
            return b.viewsCount - a.viewsCount;
          });
          tags = sortedPostsByViewsCount.map(function (post) {
            return post.tags;
          }).flat().slice(0, 5);
          res.json({
            posts: sortedPostsByViewsCount,
            tags: tags
          });
          _context5.next = 13;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json({
            message: 'Не удалось получить статьи'
          });
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function getPopular(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getByTag = exports.getByTag = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var postss, posts;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _Post["default"].find().populate('user').exec();
        case 3:
          postss = _context6.sent;
          posts = (0, _toConsumableArray2["default"])(postss).filter(function (post) {
            return post.tags.some(function (tag) {
              return tag === req.params.tag;
            });
          });
          res.json(posts);
          _context6.next = 12;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).json({
            message: 'Не удалось получить статьи'
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function getByTag(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var remove = exports.remove = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var postId, removeDoc;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          postId = req.params.id;
          _context7.next = 4;
          return _Post["default"].findByIdAndDelete({
            _id: postId
          });
        case 4:
          removeDoc = _context7.sent;
          if (removeDoc) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Статья не найдена'
          }));
        case 7:
          res.json({
            success: true
          });
          _context7.next = 14;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          res.status(500).json({
            message: 'Не удалось получить статью'
          });
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function remove(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var getOne = exports.getOne = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var postId, updatedDoc;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          postId = req.params.id;
          _context8.next = 4;
          return _Post["default"].findOneAndUpdate({
            _id: postId
          }, {
            $inc: {
              viewsCount: 1
            }
          }, {
            "new": true
          }).populate('user');
        case 4:
          updatedDoc = _context8.sent;
          if (updatedDoc) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Статья не найдена'
          }));
        case 7:
          res.json(updatedDoc);
          _context8.next = 14;
          break;
        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          res.status(500).json({
            message: 'Не удалось получить статью'
          });
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return function getOne(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var create = exports.create = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var doc, post;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          doc = new _Post["default"]({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
          });
          _context9.next = 4;
          return doc.save();
        case 4:
          post = _context9.sent;
          res.status(201).json(post);
          _context9.next = 12;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          res.status(500).json({
            message: 'Не удалось создать пост'
          });
        case 12:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return function create(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var update = exports.update = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var postId, post;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          postId = req.params.id;
          _context10.next = 4;
          return _Post["default"].findById(postId);
        case 4:
          post = _context10.sent;
          if (!(post.user.toString() !== req.userId)) {
            _context10.next = 11;
            break;
          }
          post.comments = req.body.comments;
          _context10.next = 9;
          return post.save();
        case 9:
          _context10.next = 13;
          break;
        case 11:
          _context10.next = 13;
          return _Post["default"].updateOne({
            _id: postId
          }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
            comments: req.body.comments
          });
        case 13:
          res.json({
            succes: true
          });
          _context10.next = 20;
          break;
        case 16:
          _context10.prev = 16;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          res.status(500).json({
            message: 'Не удалось обновить пост'
          });
        case 20:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 16]]);
  }));
  return function update(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();