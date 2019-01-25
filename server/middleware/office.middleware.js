import db from '../database/mockdata';

const { offices } = db;

const middlewares = {
  getAllOffices(req, res, next) {
    req.data = offices;
    next();
  },

};

export default middlewares;
