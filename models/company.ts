import { runQueryMaster } from "../helpers/mysql-connection";

export const saveCompanyData = async (data: any) => {
    let insertQuery = `insert into tbl_company (name,ceo,address,inception_date) values ('${data.company_name}','${data.ceo_name}','${data.address}','${data.inception_date}');`;
    let insertQueryRes = await runQueryMaster(insertQuery);
    if (insertQueryRes) {
        return insertQueryRes.insertId.toString();
    } else {
        return false;
    }
};

export const saveTeamData = async (data: any) => {
    let insertQuery = `insert into tbl_team (comp_id,tl_name) values ('${data.comp_id}','${data.tl_name}');`;
    let insertQueryRes = await runQueryMaster(insertQuery);
    if (insertQueryRes) {
        return insertQueryRes.insertId.toString();
    } else {
        return false;
    }
};


export const getCompanyById = async (data: any) => {
    
    let query = `SELECT * FROM tbl_company WHERE id=${data.comp_id}`;
    let queryResult = await runQueryMaster(query);
    if (queryResult) {
        return queryResult;
    } else {
        return false;
    }
};

export const searchCompByName = async (data: any) => {
   
    let query = `SELECT * FROM tbl_company WHERE name like '%${data.comp_name}%'`;
    let queryResult = await runQueryMaster(query);
    if (queryResult) {
        return queryResult;
    } else {
        return false;
    }
};

export const getAllTeams = async () => {
   
    let query = `select tbl_company.name,tbl_company.ceo,tbl_team.tl_name from tbl_company left join tbl_team on tbl_team.comp_id=tbl_company.id where tbl_team.tl_name is not null`;
    let queryResult = await runQueryMaster(query);
    if (queryResult) {
        return queryResult;
    } else {
        return false;
    }
};