require('dotenv').config()
const db = require('../database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_TOKEN = process.env.JWT_TOKEN

const registerUser = async (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const [rows] = await db.query('select * from user where email = ? limit 1', [email])
    if (rows.length == 0) {
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 11)
        db.query('insert into user(name, email, password) values(?, ?, ?)', [
            name, email, hashedPassword
        ]).then(() => {
            res.status(200)
            res.json({
                "success": true,
                "message": "register success"
            })
        }).catch(() => {
            res.status(500)
            res.json({
                "success": false,
                "message": "internal server error"
            })
        })
    } else {
        res.status(409)
        const error = new Error('Email already registered')
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    const email = req.body.email
    const [rows] = await db.query('select * from user where email = ? limit 1', [email])
    if (rows.length != 0) {
        const user = rows[0]
        const password = req.body.password
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = await jwt.sign({
                id_user: user.id,
                email: user.email
            }, JWT_TOKEN)
            if (token) {
                res.status(200)
                res.json({
                    "success": true,
                    "token": token
                })
            } else {
                next()
            }
        }
        else {
            res.status(403)
            const err = new Error("Wrong password")
            next(err)
        }
    } else {
        res.status(409)
        const err = new Error("U seems not registered yet")
        next(err)
    }
}

const getAllUser = async (req, res, next) => {
    const [rows] = await db.query('select id, name, email from user')
    res.json({
        "success": true,
        "message": "users loaded cihui",
        "data": rows
    })
}

const getUserById = async (req, res, next) => {
    const id = req.params.id_user
    const [rows] = await db.query('select id, name, email from user where id = ?', [id])
    res.json({
        "success": true,
        "message": "users loaded cihui",
        "data": rows[0]
    })
}
module.exports = {
    registerUser,
    loginUser,
    getAllUser,
    getUserById
}