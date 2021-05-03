export const auth = {
    secret: process.env.AUTH_SECRET || "trololo",
    expires: process.env.AUTH_EXPIRES || "1d",
    rounds: process.env.AUTH_ROUNDS || 10  
}