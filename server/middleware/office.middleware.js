import db from '../database/mockdata';

const { offices } = db;


const middleware = {
  getAllOffices(req, res, next) {
    req.data = offices;
    next();
  },

  getOfficesById(req, res, next) {
    const id = parseFloat(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'id must be a number',
      });
    }

    const office = offices.find(item => item.id === id);

    if (!office) {
      return res.status(404).json({
        status: 404,
        error: 'office not found',
      });
    }

    req.data = office;
    return next();
  },

  createOffice(req, res, next) {
    const officeName = req.body.name.toLowerCase();

    const presentOffice = offices.find(office => office.name.toLowerCase() === officeName);
    if (presentOffice) {
      return res.status(409).json({
        status: 409,
        error: 'office already present',
      });
    }

    const newId = offices[offices.length - 1].id + 1;
    const newOffice = {
      id: newId,
      name: req.body.name,
      type: req.body.type,
    };

    offices.push(newOffice);
    req.data = newOffice;
    return next();
  },
};

export default middleware;
