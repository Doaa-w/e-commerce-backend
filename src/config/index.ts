import "dotenv/config";

export const dev = {
    app: {
        port: Number(process.env.PORT) || 3003,
        jwtUserActivationKey: process.env.JWT_USER_ACTIVATION_KEY || 'default_secret_key',
        jwtUserAccessKey: process.env.JWT_USER_ACCESS_KEY || 'default_secret_access_key',
        smtpUsername: process.env.SMTP_USERNAME || 'default_smtp_username',
        smtpPassword: process.env.SMTP_PASSWORD || 'default_smtp_password',
        defaultProductImage: process.env.DEFAULT_IMAGE_PATH || 'default-image-path'
    },
    db: {
        url: process.env.MONGODB_URL ||  'mongodb://localhost:27017/ecommerce-db'
    }
};