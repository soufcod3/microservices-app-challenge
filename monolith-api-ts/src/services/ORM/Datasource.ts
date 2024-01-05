import {DataSource} from "typeorm";
import {OrmPost} from "./Entity/OrmPost";
import {Comment} from "./Entity/OrmComment";

export class Datasource {
    static connection: DataSource | undefined;

    static get dataSource() {
        if (this.connection) {
            return this.connection;
        }

        this.connection = new DataSource({
            type: "mysql",
            host: "dbms",
            port: 3306,
            username: "root",
            password: "rootpassword",
            database: "microservices_ecommerce_db",
            entities: [OrmPost, Comment],
            synchronize: true
        });

         return this.connection;
    }

    static get manager() {
        return this.dataSource.manager;
    }
}