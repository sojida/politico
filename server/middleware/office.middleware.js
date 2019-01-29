import dbMock from '../database/mockdata';
import db from '../database/config.db';
import queries from '../database/queries.db';

const { offices } = dbMock;

const middleware = {
  async registerCandidate(req, res, next) {
    const userId = parseFloat(req.params.id);
    if (!req.user.isadmin) {
      return res.status(401).json({
        status: 401,
        error: 'This user is not an admin',
      });
    }

    const { rows: office } = await db(queries.selectOffice(req.body.office));
    const { rows: party } = await db(queries.selectParty(req.body.party));


    if (!office.length) {
      return res.status(404).json({
        status: 404,
        error: 'no such office',
      });
    }


    if (!party.length) {
      return res.status(404).json({
        status: 404,
        error: 'no such party',
      });
    }
    const { rows: isCandidate } = await db(queries.selectCandidate(userId, party[0].id));

    if (isCandidate.length) {
      return res.status(409).json({
        status: 409,
        error: 'user or party is already running for this office',
      });
    }

    const { rows: candidates } = await db(
      queries.createCandidte(office[0].id, party[0].id, userId),
    );
    const data = {
      office: office[0].id,
      user: userId,
      candidate: candidates[0].id,
    };

    req.data = data;
    return next();
  },

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

  async checkOfficeId(req, res, next) {
    const officeId = req.params.id;

    const { rows: isOffice } = await db(queries.selectOfficeId(officeId));
    if (!isOffice.length) {
      return res.status(404).json({
        status: 404,
        error: 'no such office',
      });
    }

    return next();
  },

  async getResultByOffice(req, res, next) {
    const data = [];
    const { rows: allCandidates } = await db(queries.getAllCandidates(req.params.id));

    if (!allCandidates.length) {
      return res.status(404).json({
        status: 404,
        error: 'no candidate is running for that office',
      });
    }

    allCandidates.forEach(async (candidate) => {
      const { rows } = await db(queries.getOfficeResult(req.params.id, candidate.id));

      data.push({
        office: req.params.id,
        candidate: candidate.id,
        result: rows.length,
      });
    });

    return setTimeout(() => {
      req.data = data;
      next();
    }, 1000);
  },
};

export default middleware;
