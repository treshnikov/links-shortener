const {Router, response} = require(`express`)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
    `/register`, 
    [
        check('email', 'Incorrect email address.').isEmail(),
        check('password', 'Password is unsafe. Minimum length should be more than 6 characters.').isLength(6)
    ],

    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'Invalid data.'})
        }

        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if (candidate){
            return res.status(400).json({message: 'The user already exists.'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'User has been created.'})
    } catch (e) {
        res.status(500).json({message: `Something went wrong. Try again.`})
    }
})

// /api/auth/login
router.post(
    `/login`, 
    [
        check('email', 'Incorrect email address.').normalizeEmail().isEmail(),
        check('password', 'Password is empty.').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'Invalid data.'})
        }

        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user){
            return res.status(400).json({message: 'User is not found.'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.status(400).json({message: 'Password is incorrect.'})
        }
        
        const token = jwt.sign({userId: user.Id}, config.get('jwtSecret'), {expiresIn: '1h'})

        res.json({token, userId: user.Id})

    } catch (e) {
        res.status(500).json({message: `Something went wrong. Try again.`})
    }
})

module.exports = router