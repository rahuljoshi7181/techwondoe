import { Router } from "express";
import AuthController from "../controller/auth";
import { validate } from "../middleware/validator";
import { checkJwt } from "../middleware/checkJwt";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();
// Attach our authentication route.
router.post("/login", validate(true, "userLogin", "common"), asyncHandler(AuthController.login));

export default router;
