"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerValidation = exports.postCreateValidation = exports.loginValidation = void 0;
var _expressValidator = require("express-validator");
var loginValidation = exports.loginValidation = [(0, _expressValidator.body)('email', "Неверный формат почты").isEmail(), (0, _expressValidator.body)('password', "Минимум 5 символов пароля").isLength({
  min: 5
})];
var registerValidation = exports.registerValidation = [(0, _expressValidator.body)('email', "Неверный формат почты").isEmail(), (0, _expressValidator.body)('password', "Минимум 5 символов пароля").isLength({
  min: 5
}), (0, _expressValidator.body)('fullName', "Укажите имя (мин 3 символа)").isLength({
  min: 3
}), (0, _expressValidator.body)('avatarUrl', "Некоректная ссылка").optional().isURL()];
var postCreateValidation = exports.postCreateValidation = [(0, _expressValidator.body)('title', "Введите заголовок статьи").isLength({
  min: 3
}).isString(), (0, _expressValidator.body)('text', "Введите текст статьи").isLength({
  min: 5
}).isString(), (0, _expressValidator.body)('tags', "Неверный формат тегов").optional().isArray(), (0, _expressValidator.body)('imageUrl', "Некоректная ссылка").optional().isString()];