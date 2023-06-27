import mariadb from "mariadb";
//Initialize Pool
const pool = mariadb.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

export const masterConnection = async function () {
    try {
        return await pool
            .getConnection()
            .then((conn: any) => {
                console.log("Mariadb master connection initiated! ID " + conn.threadId);
                return conn;
            })
            .catch((error: any) => {
                console.error("Error: Master connection Inner Catch: ", error);
                throw error;
            });
    } catch (error) {
        console.error("Error: Master connection: ", error);
        throw error;
    }
};
