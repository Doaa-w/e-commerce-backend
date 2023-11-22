import "dotenv/config"

export const dev ={
    app:{port : Number(process.env.PORT)|| 3003},
    db:{url : process.env.MONGODB_URL ||  'mongodb://0.0.0.0:27017/ecommerce-db'}
}