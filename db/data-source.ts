import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
const path = require('path');

// config();
// const configService = new ConfigService();

console.log(
    path.join(__dirname, `..`, `..`, `env`, `.env.${process.env.NODE_ENV}`),
);

config({
    path: path.join(
        __dirname,
        `..`,
        `..`,
        `env`,
        `.env.${process.env.NODE_ENV}`,
    ),
});

// const synchronizeFlag = process.env.NODE_ENV === 'test' ? true : false;

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    migrationsRun: process.env.NODE_ENV === 'test' ? true : false,
    // synchronize: synchronizeFlag
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
