const UserController = require("./UserController");
const PostController = require("./PostController");

module.exports = {
    getMe: UserController.getMe,
    login: UserController.login,
    register: UserController.register,
    create: PostController.create,
    getAll: PostController.getAll,
    getOne: PostController.getOne,
    remove: PostController.remove,
    update: PostController.update
};
