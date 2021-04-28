import jwt from 'jsonwebtoken';
import Models from '../models/AllModels'

async function checkToken(token){
    let data = null;
    try {
        const { usuarioid } = await jwt.decode(token); //id usuario
        data = usuarioid; 
    } catch (e) {
        return false;
    }
    const user = await Models.Usuario.findOne({usuarioid: data, estado: 1})
    if(user){
        const token = await jwt.sign({usuarioid: data}, 'agikuidkjflasjfasdsadkw', {expiresIn:'1d'})
        return {token, rol: user.rol}
    } else{
        return false
    }
}

let encode = async (usuarioid) => {
    const token = await jwt.sign({usuarioid: usuarioid}, 'agikuidkjflasjfasdsadkw', {expiresIn: '1d'})
    return token
}

let decode = async (token) => {
    try {
        const {usuarioid} = await jwt.verify(token, 'agikuidkjflasjfasdsadkw');
        const user = await Models.Usuario.findOne({usuarioid, estado: 1});
        if(user){
            return user
        } else{
            return false
        }
    } catch (e) {
        const newToken = await checkToken(token);
        return newToken
    }
}

export default {
    encode,
    decode
}