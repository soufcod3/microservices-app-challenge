import 'reflect-metadata';
import Express, {json, urlencoded} from "express";
import {RegisterRoutes} from "./frameworks/tsoa/routes";
import swaggerUi from "swagger-ui-express";
import {DataSource} from "typeorm";
import cors from "cors";
import {Datasource} from "./services/ORM/Datasource";

const PORT = process.env.PORT || 3008;

const app = Express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));
app.use(urlencoded({
    extended: true
}));
app.use(json());

RegisterRoutes(app);

app.use(Express.static("public"));
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

Datasource.dataSource.initialize()
    .then(() => {
        console.log("Connection to database established");
        app.listen(PORT, () => {
            console.log("Listening on port " + PORT);
        })
    })
    .catch((error) => {
        console.log("Error connecting to database", error);
    });