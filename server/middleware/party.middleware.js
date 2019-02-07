import db from '../database/config.db';
import queries from '../database/queries.db';

const middleware = {
  async getAllParties(req, res, next) {
    const { rows } = await db(queries.getAllParties());
    req.data = rows;
    next();
  },

  async getPartiesById(req, res, next) {
    const id = parseFloat(req.params.id);
    const { rows: party } = await db(queries.selectPartyById(id));


    if (!party.length) {
      return res.status(404).json({
        status: 404,
        error: 'party not found',
      });
    }

    req.data = [...party];
    return next();
  },

  async editParties(req, res, next) {
    const id = parseFloat(req.params.id);
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({
        status: 400,
        error: 'name must be present',
      });
    }

    const { rows: party } = await db(queries.selectPartyById(id));
    const { rows: partyName } = await db(queries.selectPartyByNmae(name));

    if (!party.length) {
      return res.status(404).json({
        status: 404,
        error: 'party not found',
      });
    }

    if (partyName.length) {
      return res.status(409).json({
        status: 409,
        error: `${partyName[0].name} already exists`,
      });
    }

    const { rows: newParty } = await db(queries.updatePartyName(req.body.name.trim(), id));

    req.data = [...newParty];
    return next();
  },

  async deleteParty(req, res, next) {
    const id = parseFloat(req.params.id);
    const { rows: deletedParty } = await db(queries.deleteParty(id));

    if (!deletedParty.length) {
      return res.status(404).json({
        status: 404,
        error: 'party not found',
      });
    }

    req.data = [...deletedParty];
    return next();
  },

  async createParties(req, res, next) {
    const { rows: presentParty } = await db(queries.selectPartyByNmae(req.body.name.trim()));
    if (presentParty.length) {
      return res.status(409).json({
        status: 409,
        error: `${presentParty[0].name} already exists`,
      });
    }

    if (req.files) {
      if (req.files.logoUrl) {
        req.body.logoUrl = `${Date.now()}-${req.files.logoUrl.name}`;
        req.files.logoUrl.mv(`./server/uploads/${req.body.logoUrl}`, err => err);
      }
    }

    const { rows: newParty } = await db(queries.createParty(
      req.body.name.trim(),
      req.body.hqAddress.trim(),
      req.body.logoUrl.trim(),
    ));

    req.data = [...newParty];
    return next();
  },
};

export default middleware;
