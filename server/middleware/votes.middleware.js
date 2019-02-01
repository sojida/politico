import db from '../database/config.db';
import queries from '../database/queries.db';

const middleware = {
  async validateVotes(req, res, next) {
    const { candidate, office } = req.body;
    if (!candidate) {
      return res.status(400).json({
        status: 400,
        error: 'candidate must be present',
      });
    }

    if (!office) {
      return res.status(400).json({
        status: 400,
        error: 'office must be present',
      });
    }

    const { rows: isCandidate } = await db(queries.checkCandidate(req.body.candidate));
    if (!isCandidate.length) {
      return res.status(404).json({
        status: 404,
        error: 'no such candidate',
      });
    }

    const { rows: isoffice } = await db(queries.checkOffice(req.body.office));
    if (!isoffice.length) {
      return res.status(404).json({
        status: 404,
        error: 'no such office',
      });
    }

    const { rows } = await db(queries.checkVote(req.user.id, req.body.office));
    if (rows.length) {
      return res.status(409).json({
        status: 409,
        error: 'you have already voted for this office',
      });
    }


    return next();
  },

  async createVotes(req, res, next) {
    const officeId = parseFloat(req.body.office);
    const candidateId = parseFloat(req.body.candidate);

    const { rows } = await db(queries.createVote('NOW', req.user.id, officeId, candidateId));

    req.data = {
      office: rows[0].office,
      candidate: rows[0].candidate,
      voter: req.user.id,
    };

    return next();
  },
};


export default middleware;
