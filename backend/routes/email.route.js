import express from 'express';
import { createEmail, deleteEmail, getAllEmailById } from '../controllers/email.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router  = express.Router()

router.route("/create").post(isAuthenticated,createEmail)
router.route("/:id").delete(isAuthenticated,deleteEmail)
router.route("/getallemails/:emailId").get(isAuthenticated,getAllEmailById)

export default router