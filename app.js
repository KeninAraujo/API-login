require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Models
const User = require('./models/User');

const app = express();

app.use(express.json());

//rota privada
app.get('/user/:id', checkToken, async (req, res) => {

    const id = req.params.id

    //verifica se o usuário existe
    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado " })
    }
    return res.status(200).json({ user })



})

function checkToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" })
    }

    try {

        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    } catch (error) {

        return res.status(403).json({ msg: "Token inválido!" })

    }
}


//post user
app.post('/auth/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    //validações
    if (!name || !email || !password || !confirmPassword) {
        return res.status(422).json({ msg: "Campo obrigatório" })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "A confirmação deve ser igual a senha!" })
    }


    //verifica se o usuário existe
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(422).json({ msg: "Este e-mail já está sendo utilizado" })
    }

    //criar senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //criar usuário
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {

        await user.save()
        res.status(201).json({ msg: "Usuário criado com sucesso" })

    } catch (error) {

        console.log(error)
        res.status(500).json({ msg: "Houve um erro no servirdor! Por favor, tente novamente mais tarde." })
    }
})


//post login user
app.post("/auth/login", async (req, res) => {

    const { email, password } = req.body

    //validações
    if (!email || !password) {
        return res.status(422).json({ msg: "Campo obrigatório!" })
    }

    //verificar se usuário existe
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" })
    }

    //verifica senha
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(403).json({ msg: "Senha inválida!" })
    }

    try {

        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id,

        }, secret,
        )

        res.status(200).json({ msg: "Usuário logado com sucesso!", token })

    } catch (error) {

        console.log(error)
        res.status(500).json({ msg: "Houve um erro no servirdor! Por favor, tente novamente mais tarde." })

    }

})


const dbUSer = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${dbUSer}:${dbPassword}@cluster0.odexb.mongodb.net/MyFirstDataBase?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    app.listen(3000)
    console.log("Conectado ao banco de dados")
}).catch((err) => console.log(err));

