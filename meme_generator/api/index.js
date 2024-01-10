const express = require('express');
const mongoose = require('mongoose');
// Cross-Origin Resource Sharing
const cors = require('cors');
const User  = require('./models/User');
const app = express();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
const TemplateModel = require('./models/Template');
const MemeModel = require('./models/Meme');
const { rmSync } = require('fs');

const uri = 'mongodb+srv://zxy:VbmuB65mKy6RAuqj@cluster0.lu9tzt5.mongodb.net/?retryWrites=true&w=majority';

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';


app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

// connect to mongoose
mongoose.connect(uri);

// handle the POST request from client
app.post('/register', async (req, res) =>{
    const {username,email,password} = req.body;
    try{
        // wait for creating user in Database
        const userDoc = await User.create({
            username,
            email,
            password:bcrypt.hashSync(password,salt),
            history:[],
        });
        res.json({userDoc});
    } catch(e) {
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    // find email in database
    const userDoc = await User.findOne({email});
    if (userDoc === null) {
        res.status(400).json('can\'t find user')
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        const username = userDoc.username;
        jwt.sign({username, email, id:userDoc._id}, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok');
        });
    } else {
        res.status(400).json('wrong credentials')
    }
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    // token is encoded information
    // secret is the secret key to decode 
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      // If the verification is successful, 'info' will contain the decoded information (payload) from the JWT.
      res.json(info);
    });
  });

app.post('/logout', (req,res) => {
    // delete the cookie
    res.cookie('token', '').json('ok');
})

app.post('/create', async (req,res) => {
    const {meme_path} = req.body;
    try{
        // wait for creating user in Database
        const memeDoc = await MemeModel.create({
            meme_path,
        });
        res.json({memeDoc});
    } catch(e) {
        res.status(400).json(e);
    }
})

// app.get('/template', async (req,res) => {
//     try{
//         const templateDoc = await TemplateModel.find({});
//         const responsePaths = templateDoc.map(doc => doc.path);
//         res.json({responsePaths});
//     } catch(e) {
//         res.status(400).json(e);
//     }
// })

app.get('/meme', async (req,res) => {
    try{
        const templateDoc = await MemeModel.find({});
        const responsePaths = templateDoc.map(doc => doc.meme_path);
        res.json({responsePaths});
    } catch(e) {
        res.status(400).json(e);
    }
})

app.post('/history', async (req,res) => {
    try {
        const {email, history} = req.body;
        const userDoc = await User.findOne({email});
        console.log('post /history');
        console.log(email);
        console.log(history);
        if(!userDoc) {
            console.log('without login');
        } else {
            if(history) {
                console.log('1');
                if(!userDoc.history) {
                    console.log('2');
                    userDoc.history = [history];
                } else {
                    userDoc.history.push(history);
                }
                await userDoc.save();
            }
        }
        res.json('ok');
    } catch (error) {
        console.error('Error', error);
    }
  });

app.get('/history', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        const email = info.email;
        const userDoc = await User.findOne({email});
        if(userDoc) {
            console.log('get /history');
            console.log(userDoc.history);
            const history_paths = userDoc.history;
            res.json(history_paths);
        }
        });
  });


app.listen(4000);