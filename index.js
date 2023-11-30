const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const app = express();


// single file upload
// const upload = multer({ dest: 'uploads/' });
// app.post('/upload', upload.single('file'), (req, res) => {
//     console.log(req.file);
//     res.json({ status: "success" });
// });
// --------------------------------------------------------     

// multiple file upload
// const upload = multer({ dest: 'uploads/' });
// app.post('/upload', upload.array('file',2), (req, res) => {
//     console.log(req.file);
//     res.json({ status: "success" });
// });
// --------------------------------------------------------


// multiple field upload with limit
// const upload = multer({ dest: 'uploads/' });

// const multiUpload = upload.fields([{ name: 'aadhaarBack', maxCount: 1 }, { name: 'aadhaarFront', maxCount: 1 }])
// app.post('/upload', multiUpload, (req, res) => {

//     res.json({ status: "success" });
// });
// -------------------------------------------------------


// custom file Name
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${uuid()}-${originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const { mimetype } = file;
    if (mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(new Error("only image allowed"), false);
    }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 1024  * 5 } });
app.post('/upload', upload.array('file'), (req, res) => {
    console.log(req.file);
    res.json({ status: "success" });
});








app.listen(3000, () => {
    console.log('server started');
});
