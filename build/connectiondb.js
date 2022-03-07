"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurationdb_1 = __importDefault(require("./configurationdb"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgpromise = pg_promise_1.default();
const pool = pgpromise(configurationdb_1.default);
pool.connect().then(connection => {
    console.log('Conexión establecida con ', configurationdb_1.default.database.database);
    connection.done();
}).catch(error => {
    console.log('Error -->', error);
});
