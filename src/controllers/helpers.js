import bcrypt from 'bcryptjs';

const helpers = {};


//Comparamos contraseña
helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
};

//Encriptamos la contraseña
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

export default helpers;

