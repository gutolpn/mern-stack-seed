const security = require('../security')
const User = require('../models/user')

module.exports = function controller() {
    let Controller = {}

    Controller.list = (req, res) => {
        User.find({}).then((users) => {
            console.log('list:', users)
            res.send(users)
        })
    }

    Controller.login = (req, res) => {
        User.findOne({
            email: req.body.email,
            password: Controller._encrypt(req.body.password)
        })
            .then((user) => {
                try {

                    if (!user) {
                        throw new Error("Usuario não encontrado!")
                    }

                    req.session.userId = user._id;
                    console.log('login ', req.session)
                    //gerar o token da sessão
                    const token = security().generateToken(req.session.userId);
                    res.send({ success: true, token: token })

                } catch (error) {
                    console.log(error.message)
                    res.send({ success: false, error: error.message })
                }
            })



    }

    Controller._encrypt = (password) => {
        const crypto = require('crypto');

        let mykey = crypto.createCipher('aes-128-cbc', password);
        let mystr = mykey.update('abc', 'utf8', 'hex')
        mystr += mykey.final('hex');
        console.log(mystr)

        return mystr
    }

    Controller.create = (req, res, next) => {
        const novoUsuario = new User({
            name: req.body.name,
            email: req.body.email,
            password: Controller._encrypt(req.body.password)
        })

        novoUsuario.save().then(() => {
            console.log("Usuario criado!")
            res.send("Usuario criado")
        }).catch((err) => {
            console.log(err)
            throw err
        })
    }

    Controller.populate = (req, res, next) => {
        const novoUsuario = new User({
            name: "Fulano da Silva",
            email: "fulano@dasilva.com",
            password: Controller._encrypt('123')
        })

        novoUsuario.save().then(() => {
            console.log("Usuario criado!")
            res.send("Usuario criado")
        }).catch((err) => {
            console.log(err)
            throw err
        })
    }

    return Controller
}