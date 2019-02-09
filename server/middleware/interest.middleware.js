import db from '../database/config.db';
import queries from '../database/queries.db';

const middleware = {
  async getAllIntrestee(req, res, next) {
    const { rows } = await db(queries.getAllIntrestee(req.params.id));
    req.data = rows;
    next();
  },

  async getAllCandidates(req, res, next) {
    const { rows } = await db(queries.getAllCandidates(req.params.id));
    req.data = rows;
    next();
  },

  async declearInterest(req, res, next) {
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
    const { rows: users } = await db(queries.selectUserById(userId));
    const { rows: office } = await db(queries.selectOfficeById(req.body.office));
    const { rows: party } = await db(queries.selectPartyById(req.body.party));

    if (!users.length) {
      return res.status(404).json({
        status: 404,
        error: 'no user found',
      });
    }

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
    const { rows: interestPresent } = await db(queries.validateIntrestee(userId,
      office[0].id, party[0].id));

    if (interestPresent.length) {
      return res.status(409).json({
        status: 409,
        error: 'user or party is already interested in this office',
      });
    }

    const { rows: candidates } = await db(
      queries.createInterestee(office[0].id, party[0].id, userId),
    );
    const data = {
      office: office[0].id,
      user: userId,
      candidate: candidates[0].id,
    };

    req.data = data;
    return next();
  },
};

export default middleware;
