import db from '../database/config.db';
import queries from '../database/queries.db';


const middleware = {
  async registerCandidate(req, res, next) {
    const userId = parseFloat(req.params.id);

    const { office: officeID, party: partyID } = req.body;
    if (!officeID) {
      return res.status(400).json({
        status: 400,
        error: 'office must be present',
      });
    }

    if (!partyID) {
      return res.status(400).json({
        status: 400,
        error: 'party must be present',
      });
    }

    const { rows: office } = await db(queries.selectOfficeById(req.body.office));
    const { rows: party } = await db(queries.selectPartyById(req.body.party));


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
    const { rows: isCandidate } = await db(queries.validateCandidate(userId,
      office[0].id, party[0].id));

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

  async getAllOffices(req, res, next) {
    const { rows } = await db(queries.getAllOffice());
    req.data = rows;
    next();
  },

  async getOfficesById(req, res, next) {
    const id = parseFloat(req.params.id);
    const { rows } = await db(queries.selectOfficeById(id));

    if (!rows.length) {
      return res.status(404).json({
        status: 404,
        error: 'office not found',
      });
    }

    req.data = [...rows];
    return next();
  },

  async createOffice(req, res, next) {
    const officeName = req.body.name;

    const { rows: presentOffice } = await db(queries.selectOfficeByNmae(officeName));

    if (presentOffice.length) {
      return res.status(409).json({
        status: 409,
        error: 'office already present',
      });
    }

    const { rows: newOffice } = await db(queries.createOffice(req.body.name, req.body.type));

    req.data = [...newOffice];
    return next();
  },

  async checkOfficeId(req, res, next) {
    const officeId = req.params.id;

    const { rows: isOffice } = await db(queries.selectOfficeById(officeId));
    if (!isOffice.length) {
      return res.status(404).json({
        status: 404,
        error: 'no such office',
      });
    }

    return next();
  },

  async getResultByOffice(req, res, next) {
    const { rows: officePresent } = await db(queries.getOfficeInVote(req.params.id));

    if (!officePresent.length) {
      return res.status(404).json({
        status: 404,
        error: 'no such office',
      });
    }

    const { rows } = await db(queries.getResultByOffice(req.params.id));

    req.data = rows;
    return next();
  },
};

export default middleware;
