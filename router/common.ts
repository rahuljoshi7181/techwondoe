import { Router } from "express";
import { validate } from "../middleware/validator";
import { asyncHandler } from "../middleware/asyncHandler";
import Company from "../controller/company";
import { checkRole } from "../middleware/checkRoles";
import { Roles } from "../state/userState";
import { checkJwt } from "../middleware/checkJwt";

const common = Router();

common.post("/create-company", checkJwt, checkRole([Roles.ADMIN]), validate(true, "createCompany", "common"), asyncHandler(Company.saveCompanyData));
common.post("/create-team", checkJwt, checkRole([Roles.ADMIN]), validate(true, "createTeam", "common"), asyncHandler(Company.saveCompanyTeam));
common.get("/get-company-info", checkJwt, checkRole([Roles.ADMIN,Roles.USER]), validate(true, "getCompany", "common"), asyncHandler(Company.getCompanyById));
common.get("/get-company-using-name", checkJwt, checkRole([Roles.ADMIN,Roles.USER]), validate(true, "getCompanyName", "common"), asyncHandler(Company.searchCompByName));
common.get("/get-all-teams", checkJwt, checkRole([Roles.ADMIN,Roles.USER]), asyncHandler(Company.getAllTeams));
export default common;
