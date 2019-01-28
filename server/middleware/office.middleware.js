import db from '../database/config.db';
import queries from '../database/queries.db';

const middleware = {
  async validateCandidate(req, res, next) {
    const { office, party } = req.body;

    if (!office || !office.trim()) {
      return res.status(400).json({
        status: 400,
        error: 'office must be present',
      });
    }

    if (!party || !party.trim()) {
      return res.status(400).json({
        status: 400,
        error: 'party must be present',
      });
    }

    const { rows: userId } = await db(queries.selectUser(req.params.id));
    if (!userId.length) {
      return res.status(404).json({
        status: 404,
        error: 'user not found',
      });
    }

    return next();
  },

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
    const { rows: isCandidate } = await db(queries.selectCandidate(userId, office[0].id));

    if (isCandidate.length) {
      return res.status(409).json({
        status: 409,
        error: 'user is already running for this office',
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
};

export default middleware;
