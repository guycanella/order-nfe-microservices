import * as dotenv from 'dotenv'

dotenv.config()

export const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT) || 3001,
    DATABASE_URL: process.env.DATABASE_URL || '',
    RABBITMQ_URL: process.env.RABBITMQ_URL || '',
}