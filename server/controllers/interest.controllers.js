const controllers = {
  getAllIntrested(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },

  getAllCandidates(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },

  registerInterest(req, res) {
    res.status(201).json({
      status: 201,
      data: req.data,
      message: 'Interest successful',
    });
  },
};

export default controllers;
