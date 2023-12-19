import express from "express"
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'
import {registerValidation, loginValidation, postCreateValidation} from './validations/vallidations.js'
import {getMe, login, register, create, getAll, getOne, remove, update} from './controllers/index.js'
import {handleValidationErrors, checkAuth} from "./utils/index.js"
import { getByTag, getLastComments, getLastTags, getNew, getPopular } from "./controllers/PostController.js"
import { logout } from "./controllers/UserController.js"
import session from "express-session"
import PostModel from './models/Post.js'



mongoose.connect(MONGODB_URI)
.then(() => { return PostModel.collection.createIndex({ createdAt: -1 }); })
.then(() => console.log('DB ok'))
.catch(er => console.log('DB error', er))

const app = express()
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: true,
}));

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })



app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.post('/auth/logout', checkAuth, logout)
app.post('/auth/register', registerValidation, handleValidationErrors, register)
app.get('/auth/me', checkAuth, getMe)

app.get('/tags', getLastTags)
app.get('/comments', getLastComments)
app.get('/posts/tag/:tag', getByTag);
app.get('/posts', getAll)
app.get('/posts/new', getNew)
app.get('/posts/popular', getPopular)
app.get('/posts/:id', getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, create)
app.delete('/posts/:id', checkAuth, remove)
app.patch('/posts/:id', postCreateValidation, checkAuth, handleValidationErrors, update)


app.listen(process.env.PORT || 3004, (err) => {
    if (err) console.log(err)
    console.log(`server started`);
})