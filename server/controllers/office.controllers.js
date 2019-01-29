const controllers = {
  getAllOffices(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },

  getOfficeById(req, res) {
    res.status(200).json({
      status: 200,
      data: [req.data],
    });
  },

  creatOffice(req, res) {
    res.status(201).json({
      status: 201,
      data: [req.data],
      message: 'office created successfully',
    });
  },

  registerCandidate(req, res) {
    res.status(201).json({
      status: 201,
      data: req.data,
    });
  },

  getResults(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },
};

export default controllers;
