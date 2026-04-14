"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ debug: true });
const accountRoutes_js_1 = __importDefault(require("./routes/accountRoutes.js"));
const db_js_1 = require("./config/db.js");
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const corsOptions_js_1 = __importDefault(require("./config/corsOptions.js"));
const credentials_js_1 = __importDefault(require("./middleware/credentials.js"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const port = process.env.port || 4000;
app.use((0, cookie_parser_1.default)());
app.use(credentials_js_1.default);
app.use((0, cors_1.default)(corsOptions_js_1.default));
app.use(express_1.default.json());
(0, db_js_1.connectDB)();
app.use("/api/auth", authRoutes_js_1.default);
app.use("/api", credentials_js_1.default, accountRoutes_js_1.default);
app.listen(port, () => {
    return `App is listening on port ${port}`;
});
