import { Router } from 'express';
import * as CompanyController from '../controllers/company.controller';
const router = new Router();

// Get all Companies
router.route('/companies').get(CompanyController.getCompanies);

// Get one company by cuid
router.route('/companies/:cuid').get(CompanyController.getCompany);

// Add a new Company
router.route('/companies').post(CompanyController.addCompany);

// Delete a company by cuid
router.route('/companies/:cuid').delete(CompanyController.deleteCompany);

export default router;
