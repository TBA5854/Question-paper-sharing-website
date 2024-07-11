const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const { v4: uuidv4 } = require('uuid');
const { authverify } = require('./authRoutes');

const router = express.Router();

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 100 }, // 100MB
}).single('file'); // Ensure the field name is correct

router.post('/', authverify,(req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send({ error: err.message });
        }
        // --> Rest of the form data
        console.log(req.body)
        if (!req.file) {
            return res.json("Please provide a file.");
        }

        const file = new File({
            fileName: req.file.filename,
            subject: req.body.subject,
            courseCode: req.body.course,
            examType: req.body.examtype,
            year: req.body.year,
            sem: req.body.sem,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });

        file.save().then((response) => {
            return res.json({ file: `http://localhost:3000/api/files/${response.uuid}` });
        }).catch(error => {
            console.log(error)
            return res.status(500).send({ error: error.message });
        });
    });
});

//test
router.get('/', async (req, res) => {
    console.log('del')
    // await File.deleteMany();
    var t = await File.find({});
    //   res.send('GET request to the homepage')
    console.log(t)
    res.end()
})

module.exports = router;
