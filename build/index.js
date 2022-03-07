"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const indexroutes_1 = __importDefault(require("./routes/indexroutes"));
const ingenieroroutes_1 = __importDefault(require("./routes/ingenieroroutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('PORT', process.env.PORT || 8098);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({
            extended: true
        }));
    }
    start() {
        this.app.listen(this.app.get('PORT'), () => {
            console.log('Server active in port', this.app.get('PORT'));
        });
    }
    routes() {
        this.app.use('/', indexroutes_1.default);
        this.app.use('/api/ingeniero', ingenieroroutes_1.default);
    }
}
const server = new Server();
server.start();
