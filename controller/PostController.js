const db = require('../database')

const createPost = async (req, res, next) => {
    const id_user = req.body.id_user
    const content = req.body.content
    const date = new Date()
    const timestamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    db.query('insert into post(id_user, content, createdAt, updatedAt) values(?, ?, ?, ?)',
        [
            id_user,
            content,
            timestamp,
            timestamp
        ])
        .then(() => {
            res.status(200)
            res.json({
                "success": true,
                "message": "Post Created"
            })
        })
        .catch(() => {
            res.status(500)
            res.json({
                "success": false,
                "message": "internal server error"
            })
        })
}

const getAllPost = async (req, res, next) => {
    const [rows] = await db.query('select * from post')
    res.status(200)
    res.json({
        "success": true,
        "message": "Posts Loaded Cihuy",
        "data": rows
    })
}

const getSpecificPost = async (req, res, next) => {
    const id_post = req.params.id_post
    const [rows] = await db.query('select * from post where id = ?', [id_post])
    if (rows.length != 0) {
        res.status(200)
        res.json({
            "success": true,
            "message": "get post success",
            "data": rows[0]
        })
    } else {
        res.status(404)
        res.json({
            "success": false,
            "message": "Post Not Found"
        })
    }
}

const updatePost = async (req, res, next) => {
    const id_post = req.params.id_post
    const newContent = req.body.content
    const date = new Date()
    const timestamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
    const [rows] = await db.query('update post set content = ?, updatedAt= ? where id = ?', [newContent, timestamp, id_post])
    console.log(rows)
    if (rows.affectedRows != 0) {
        res.status(200)
        res.json({
            "success": true,
            "message": "post updated"
        })
    } else {
        res.status(404)
        res.json({
            "success": false,
            "message": "Post Not Found"
        })
    }
}

const deletePost = async (req, res, next) => {
    const id_post = req.params.id_post
    const [rows] = await db.query('update post set isDeleted = 1 where id = ?', [id_post])
    if (rows.affectedRows != 0) {
        res.status(200)
        res.json({
            "success": true,
            "message": "post deleted"
        })
    } else {
        res.status(404)
        res.json({
            "success": false,
            "message": "Post Not Found"
        })
    }
}
module.exports = {
    createPost,
    getAllPost,
    getSpecificPost,
    updatePost,
    deletePost
}