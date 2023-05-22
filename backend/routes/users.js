const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../utils/validators/userValidator');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.get('/:id', validateUserId, getUser);
usersRouter.patch('/me', validateUserInfo, updateProfile);
usersRouter.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = usersRouter;
