export const mainConfig = (): any => ({
    port: process.env.PORT,
    dbUrl: process.env.DATABASE_URL,
    secretKey: process.env.TOKEN_SECRET_KEY
});
