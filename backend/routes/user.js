const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')
const { getUser, createUser, updateUser, findUserById, deleteUserById } = require("../controllers/user");
// console.log(path.join(__dirname, '../public/uploads'))

const upload = multer({
    storage: multer.diskStorage({
        //assign the Destination Where We Want to Store
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../public/uploads'))
        },
        //Assign the filename
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
});

router.get("/users", getUser);
router.post("/create-users", upload.single('file'), createUser);
router.put("/update-users", upload.single('file'), updateUser);
router.get("/find/:id", findUserById);
router.delete("/delete/:id", deleteUserById);

module.exports = router;