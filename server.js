const express = require('express');
const app = express();
const File = require('./models/file');
const connectDB = require('./config/db');
const cors = require('cors')
const filesRoute = require('./routes/files'); // Import the router
const cookieparser = require('cookie-parser');
const {router,authverify} = require('./routes/authRoutes'); // Import the router
// const ejsLint = require('ejs-lint');
// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'))
app.use('/static', express.static('uploads'))
app.use(cookieparser())
app.set('view engine', 'ejs');
// Use the files route
app.use(router);
app.use('/api/files', filesRoute);

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/upload', authverify,(req, res) => {
    res.render('upload')
})
app.get('/uploads/:id',authverify, (req, res) => {
    res.download(__dirname+"/uploads/"+req.params['id'])
})
// function sleep(ms) {
//     return new Promise((resolve) => {
//       setTimeout(resolve, ms);
//     });
//   } 
// app.get('/')

app.get('/browse', async (req, res) => {
    var query = req.query.q;
    console.log(query);
    if (!query) {
        result = await File.find({});
    } else {
        const code = await File.find({ courseCode: query });
        const sub = await File.find({ subject: query });
        result = code.concat(sub);
    }
    // await sleep(10000)
    console.log(result)
    // res.end()
    res.render('browse', { result })
})

// app.get('/', (req, res) => {
//     res.render('home')
// })



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    // setTimeout(async () => {
    //     console.log(await File.find({}))
    // }, 5000);

});
