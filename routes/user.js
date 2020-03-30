const express = require('express');
const User = require('../models/users');
const Images = require('../models/images');
const router = new express.Router();
const multer = require('multer');
const sharp = require('sharp');
const btoa = require('btoa');

router.post('/user', async(req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.send(400);
    }
});

/**
 * Route for fetching single user data
 */

 router.get('/api/user/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Images.findById(id);
        if(!user) {
            return res.status(404).send();
        }

        const resposeImages = [];
        user.images.forEach(imageBuffer => {
            let TYPED_ARRAY = new Uint8Array(imageBuffer);

            const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
                return data + String.fromCharCode(byte);
            }, '');

            resposeImages.push(btoa(STRING_CHAR));
        });
        res.send(resposeImages);
        
    } catch(e) {
        res.status(400).send({error:e});
    }
 });

/**
 * Route for fetching all users
 */
 router.get('/api/get-users', async (req, res) => {
    const users = await Images.find({}).select('email _id');
    res.send(users);
 });



/**
 * Route for fetching user images
 */

 router.post('/api/me/images', async (req, res) => {
    try {
        const userImages = await Images.findOne({
            email: req.body.email
        });

        if(!userImages) {
            return res.status(404).send();
        }
        const resposeImages = [];
        userImages.images.forEach(imageBuffer => {
            let TYPED_ARRAY = new Uint8Array(imageBuffer);

            const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
                return data + String.fromCharCode(byte);
            }, '');

            resposeImages.push(btoa(STRING_CHAR));
        });

        res.send(resposeImages);

    }catch(e) {
        res.status(e).send({error: e});
    }
 })
 
 

/**
 * File uploads
 */
const upload = multer({
    limits: {
        fileSize: 100000000
    },
    fileFilter: (req, file, cb ) => {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error("Please upload a valid image file"));
        }
        cb(null, "File uploaded successfully")
    }
});
 router.post('/api/upload-images', upload.array('image', 10) , async (req, res) => { 
    const newfiles = new Array(); 

    const fileToBuffer = new Promise((resolve, reject) => {
        req.files.forEach(async(file, index, array) => {
            let currentImage = await sharp(file.buffer).png().toBuffer(); 
            newfiles.push(currentImage);
            if (index === array.length -1) resolve();
        }); 
    });

    try {
        const user = await Images.findOne({
            email: req.body.user
        }); 
        // If user not preset create a new collection
        if(!user) {
            fileToBuffer.then(async () => {
                const userImageCollection = new Images({
                    email: req.body.user,
                    images: newfiles
                }); 
                await userImageCollection.save();
                res.send();
            });  
        } else {
            const oldImages = [...user.images];
            fileToBuffer.then(async () => { 
                user.images = newfiles.concat(oldImages);
                await user.save();
                res.send();
            });
        }
    } catch(e) {
        res.status(400).send(e)
    } 
    
 }, (error, req, res, next) => {
    res.status(400).send({error: error.message})
 });

module.exports = router;