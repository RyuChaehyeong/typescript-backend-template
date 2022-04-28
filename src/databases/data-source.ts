import "reflect-metadata"
import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

export const dbConnection : ConnectionOptions = {
    type: "mysql",
    host: "",
    port: 3306,
    username: "",
    password: "",
    database: "pratice",
    synchronize: true,
    logging: true,
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [],
    subscribers: [],
}


