const User = require('../models/Users');
const connection = require('../config/requestsConf');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

module.exports.login = async function (req, res) {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = await new User(req.body.email, bcrypt.hashSync(password, salt), req.body.name);
    const connect = new connection(user);
    connect.connect();
    const result = await connect.checkUserinBase();

    if (!!result.length) {
        const passFromBase = await connect.checkPassword();
        const passVerification = bcrypt.compareSync(req.body.password, passFromBase[0]['password']);
        if( passVerification){
            //token
            const token = jwt.sign({

                userId: result[0]["id"],
                email: result[0]["email"]

            },keys.jwtKey, { expiresIn: 3600 });

            res.status(200).json({
                    token: `Bearer ${token}`,
                }
            )
        }
        else{
            res.status(401).json({
                message:"неверный пароль"
            })
        }
    } else {
        res.status(404).json({
            message: "Пользователь с таким логином не найдет"
        })
    }

}

module.exports.register =  async function (req, res) {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password;
    const user = await new User( req.body.email, bcrypt.hashSync(password, salt),req.body.name);
    const connect = new connection(user);
    connect.connect();
    const applicant = await connect.checkUserinBase();

    if (!!applicant.length) {
        res.status(406).json({
            message: " Данная почта уже зарегистрирована "
        })
    } else {
        let addingUser  = await connect.add()
        let token;
        const result = await connect.checkUserinBase()
        const passFromBase = await connect.checkPassword();

        const passVerification = bcrypt.compareSync(req.body.password, passFromBase[0]['password']);

        if( passVerification){
            token = jwt.sign({
                userId: result[0]["id"],
                email: result[0]["email"]

            },keys.jwtKey, { expiresIn: 3600 });
        }
            res.status(201).json({
                    message: result,
                    token: `Bearer ${token}`
                }
            )

    }
}

module.exports.users =  async function (req, res) {
    const connect = new connection( );
    connect.connect()
    const usersList = await connect.select()

    if ( !!usersList.length ) {
        res.status(200).json({
            data: usersList
        })
    } else {
        res.status(404).json({
                message: 'Error'
            }
        )

    }
}
