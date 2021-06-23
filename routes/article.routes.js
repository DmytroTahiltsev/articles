const {Router} = require("express")
const Article = require("../models/Article")
const config = require("config")
const auth = require("../middleware/auth.middleware")
const router = Router()

router.post('/create', auth, async (req, res) => {
    try{
        const baseUrl = config.get('baseUrl')
        const {title, content} = req.body
        const article = new Article({
            title, content, owner: req.user.userId
        })
        await article.save()
        res.status(201).json({ article })
    }catch(e){
        res.status(500).json({message:"Что-то пошло не так"})
    }
})
router.get('/', auth, async (req, res) => {
    try{
        const articles = await Article.find({ owner: req.user.userId })
        res.json(articles)
    }catch(e){
        res.status(500).json({message:"Что-то пошло не так"})
    }
})
router.get('/:id', auth, async (req, res) => {
    try{
        const article = await Article.findById(req.params.id)
        res.json(article)
    }catch(e){
        res.status(500).json({message:"Что-то пошло не так"})
    }
})

module.exports = router