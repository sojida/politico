import db from '../database/mockdata';

const { parties } = db;

const middleware = {
  getAllParties(req, res, next) {
    req.data = parties;
    next();
  },
};

export default middleware;
