const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs')


const {
  registerValidation,
  loginValidation,
  postCreateValidation
} = require('./validations/vallidations.js');
const {
  getMe,
  login,
  register,
  create,
  getAll,
  getOne,
  remove,
  update
} = require('./controllers/index.js');
const {
  handleValidationErrors,
  checkAuth
} = require('./utils/index.js');
const {
  getByTag,
  getLastComments,
  getLastTags,
  getNew,
  getPopular
} = require('./controllers/PostController.js');
const { logout } = require('./controllers/UserController.js');

mongoose.connect(process.env.MONGODB_URI,
 { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

const app = express();
app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage, cleanup: false });

app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  });
})

app.post('/auth/login', loginValidation, handleValidationErrors, login);
app.post('/auth/logout', checkAuth, logout);
app.post('/auth/register', registerValidation, handleValidationErrors, register);
app.get('/auth/me', checkAuth, getMe);

app.get('/tags', getLastTags);
app.get('/comments', getLastComments);
app.get('/posts/tag/:tag', getByTag);
app.get('/posts', getAll);
app.get('/posts/new', getNew);
app.get('/posts/popular', getPopular);
app.get('/posts/:id', getOne);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  create
);
app.delete('/posts/:id', checkAuth, remove);
app.patch('/posts/:id', postCreateValidation, checkAuth, handleValidationErrors, update);

app.listen(process.env.PORT || 3005, (err) => {
  if (err) console.log(err);
  console.log(`server started`);
});
