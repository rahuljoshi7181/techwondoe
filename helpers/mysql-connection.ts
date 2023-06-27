import { masterConnection } from "./mariadb-pool-cluster";
export const runQueryMaster = async function (statement: string, parameters: any = "", log: any = "") {
    let masterConn;
    try {
        let result;
        masterConn = await masterConnection();
        result = await masterConn.query(statement, parameters);
        return result;
    } catch (error) {
        console.error("Master: Error Processing in Query: ", error);
        throw error;
    } finally {
        if (masterConn) masterConn.release();
    }
};
