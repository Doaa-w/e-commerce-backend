import "dotenv/config";

export const dev = {
    app: {
        port: Number(process.env.PORT) || 3003,
        jwtUserActivationKey: String(process.env.JWT_USER_ACTIVATION_KEY) ,
        jwtUserAccessKey: String(process.env.JWT_USER_ACCESS_KEY) ,
        smtpUsername: String(process.env.SMTP_USERNAME ),
        smtpPassword: String(process.env.SMTP_PASSWORD)  ,
        defaultProductImage: String(process.env.DEFAULT_IMAGE_PATH )
    },
    db: {
        url: String(process.env.MONGODB_URL) ,
    }
};