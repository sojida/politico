const controllers = {
  getAllParties(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },

  getPartiesById(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },

  editParties(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
      message: `${req.data[0].name} edited successfully`,
    });
  },

  deleteParties(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
      message: `${req.data[0].name} deleted successfully`,
    });
  },

  createParties(req, res) {
    res.status(201).json({
      status: 201,
      data: req.data,
      message: 'party created successfully',
    });
  },
};

export default controllers;
