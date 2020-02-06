const router = require('express').Router()
const userRouter = require('./UserRouter')
const postRouter = require('./PostRouter')

router.get('/', (req, res, next)=>{
    res.send('Hello world')
})

router.use('/user', userRouter)
router.use('/post', postRouter)

router.use(notFound)
router.use(errorHandler)

function notFound(req, res, next){
    const err = new Error("Page Not Found")
    res.status(404)
    next(err)
}

function errorHandler(err, req, res, next){
    res.status(res.statusCode || 500)
    res.json({
        success : false,
        message : err.message || "Internal Server Error"
    })
}
module.exports = router