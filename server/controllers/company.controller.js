import Company from '../models/company';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all companies
 * @param req
 * @param res
 * @returns void
 */
export function getCompanies(req, res) {
  Company.find().sort('-dateAdded').exec((err, companies) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ companies });
  });
}

/**
 * Save a company
 * @param req
 * @param res
 * @returns void
 */
export function addCompany(req, res) {
  if (!req.body.company.firstName || !req.body.company.lastName || !req.body.company.company
      || !req.body.company.address) {
    res.status(403).end();
  }

  const newCompany = new Company(req.body.company);

  // Let's sanitize inputs
  newCompany.firstName = sanitizeHtml(newCompany.firstName);
  newCompany.lastName = sanitizeHtml(newCompany.lastName);
  newCompany.company = sanitizeHtml(newCompany.company);
  newCompany.address = sanitizeHtml(newCompany.address);

  newCompany.cuid = cuid();
  newCompany.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ company: saved });
  });
}

/**
 * Get a single company
 * @param req
 * @param res
 * @returns void
 */
export function getCompany(req, res) {
  Company.findOne({ cuid: req.params.cuid }).exec((err, company) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ company });
  });
}

/**
 * Delete a company
 * @param req
 * @param res
 * @returns void
 */
export function deleteCompany(req, res) {
  Company.findOne({ cuid: req.params.cuid }).exec((err, company) => {
    if (err) {
      res.status(500).send(err);
    }

    company.remove(() => {
      res.status(200).end();
    });
  });
}
