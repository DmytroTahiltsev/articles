const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const config = require("config")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const router = Router()


router.post(
    '/registration',
    [
        check('email', 'Некорректный email').isEmail(),
        check('username', 'Некорректный username').notEmpty(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min:6})
    ],
     async (req, res)=>{
        try{
            
            console.log(req.body)
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array(), message: 'Некорректные данные'})
            }
            const {email, username, password} = req.body
            let candidate = await User.findOne({email})
            if(candidate){
                return res.status(400).json({message:'Пользователь с таким email уже существует'})
            }
            candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message:'Пользователь с таким username уже существует'})
            }
            const hashedPassword = await bcrypt.hash(password, 6)
            const user = new User({email, username, password: hashedPassword})

            await user.save()

            res.status(201).json({message:'Пользователь создан'})

        }catch(e){
            res.status(500).json({message:"Что-то пошло не так"})
        }
})

router.post(
    '/login',
    [
        check('username', 'Введите корректный username').notEmpty(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res)=>{
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array(), message: 'Некорректные данные при входе в систему'})
            }
            const {email, username, password} = req.body
            const user = await User.findOne({username})

            if(!user){
                return res.status(400).json({message: 'Пользователь не найден'})
            }
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message: 'Неверный пароль'})
            }
            
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '24h'}
            )
            res.json({token, userId: user.id})
        }catch(e){
            res.status(500).json({message:"Что-то пошло не так"})
        }
})
module.exports = router