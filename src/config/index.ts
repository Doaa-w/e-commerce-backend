import "dotenv/config"

export const dev ={
    app:{port: Number(process.env.PORT) || 5000},
    db:{url : process.env.MONGODB_URL ||  'mongodb://localhost:27017/ecommerce-db'}
}