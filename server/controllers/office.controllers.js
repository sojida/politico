const controllers = {
  getAllOffices(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },
};

export default controllers;
