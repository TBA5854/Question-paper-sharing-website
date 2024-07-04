const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const { v4: uuidv4 } = require('uuid');

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

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }

        if (!req.file) {
            return res.json("Please provide a file.");
        }

        const file = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });

        file.save().then(response => {
            return res.json({ file: `http://localhost:3000/files/${response.uuid}` });
        }).catch(error => {
            return res.status(500).send({ error: error.message });
        });
    });
});

module.exports = router;
