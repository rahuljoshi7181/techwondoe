import { NextFunction, Request, Response } from "express";
import { saveCompanyData,saveTeamData,getCompanyById,searchCompByName,getAllTeams} from "../models/company";

class Company {
    static response = { status: false, code: 403, message: "Something Bad Happen!", data: {}, errors: "" };

    static saveCompanyData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let companyData = await saveCompanyData(req.body);
            if (companyData) {
                this.response.status = true;
                this.response.code = 200;
                this.response.data = [{ id: companyData }];
                this.response.message = "Success";
            }
            res.status(200).json(this.response);
        } catch (err: any) {
            this.response.message = err;
            res.status(403).json(this.response);
        }
    };

    static saveCompanyTeam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let teamData = await saveTeamData(req.body);
            if (teamData) {
                this.response.status = true;
                this.response.code = 200;
                this.response.data = [{ id: teamData }];
                this.response.message = "Success";
            }
            res.status(200).json(this.response);
        } catch (error: any) {
            this.response.message = error;
            res.status(403).json(this.response);
        }
    };

    static getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let teamData = await getCompanyById(req.query);
            if (teamData) {
                this.response.status = true;
                this.response.code = 200;
                this.response.data = teamData;
                this.response.message = "Success";
            }
            res.status(200).json(this.response);
        } catch (error: any) {
            this.response.message = error;
            res.status(403).json(this.response);
        }
    };

    static searchCompByName = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let teamData = await searchCompByName(req.query);
            if (teamData) {
                this.response.status = true;
                this.response.code = 200;
                this.response.data = teamData;
                this.response.message = "Success";
            }
            res.status(200).json(this.response);
        } catch (error: any) {
            this.response.message = error;
            res.status(403).json(this.response);
        }
    };

    static getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let teamData = await getAllTeams();
            if (teamData) {
                this.response.status = true;
                this.response.code = 200;
                this.response.data = teamData;
                this.response.message = "Success";
            }
            res.status(200).json(this.response);
        } catch (error: any) {
            this.response.message = error;
            res.status(403).json(this.response);
        }
    };
}

export default Company;
