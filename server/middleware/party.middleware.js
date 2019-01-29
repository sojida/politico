import db from '../database/mockdata';

const { parties } = db;

const middleware = {
  getAllParties(req, res, next) {
    req.data = parties;
    next();
  },
  getPartiesById(req, res, next) {
    const id = parseFloat(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'id must be a number',
      });
    }

    const party = parties.find(item => item.id === id);

    if (!party) {
      return res.status(404).json({
        status: 404,
        error: 'party not found',
      });
    }

    req.data = party;
    return next();
  },

  editParties(req, res, next) {
    const id = parseFloat(req.params.id);
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({
        status: 400,
        error: 'name must be present',
      });
    }

    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'id must be a number',
      });
    }

    const newPartyName = parties.find(party => party.id === id);

    if (!newPartyName) {
      return res.status(404).json({
        status: 404,
        error: 'party not found',
      });
    }
    newPartyName.name = name;
    req.data = newPartyName;
    return next();
  },

  deleteParty(req, res, next) {
    const id = parseFloat(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'id must be a number',
      });
    }

    const deletedParty = parties.find((party, i) => {
      if (party.id === id) {
        return parties.splice(i, 1);
      }

      return undefined;
    });

    if (!deletedParty) {
      return res.status(404).json({
        status: 404,
        error: 'party not found',
      });
    }

    req.data = deletedParty;
    return next();
  },

  createParties(req, res, next) {
    const partyName = req.body.name.toLowerCase();

    const presentParty = parties.find(party => party.name.toLowerCase() === partyName);
    if (presentParty) {
      return res.status(409).json({
        status: 409,
        error: 'party already present',
      });
    }


    const newId = parties[parties.length - 1].id + 1;
    const newParty = {
      id: newId,
      name: req.body.name,
      hqAddress: req.body.hqAddress,
      logoUrl: req.body.logoUrl,
    };

    parties.push(newParty);
    req.data = newParty;
    return next();
  },
};

export default middleware;
