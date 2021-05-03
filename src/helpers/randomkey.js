import crypto from 'crypto'

let randomkey = async () => {
    try {
        return await crypto.randomBytes(16).toString('hex');
    } catch (e) {
        console.log(e);
    }
}

export default {
    randomkey
}
