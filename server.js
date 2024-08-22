import express from "express";
import mysql from "mysql2";
import bodyparser from "body-parser";
import method_override from "method-override";
import configViewEngine from "./config/viewEngine";
import clientRouter from "./routes/client/routesHome";
import adminRouter from "./routes/admin/routesAdmin";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(method_override("_method"));

configViewEngine(app);

app.use("/", clientRouter)
app.use("/admin/", adminRouter)


app.listen(port, () => {
    console.log(`Server running port: http://localhost:${port}`);
})