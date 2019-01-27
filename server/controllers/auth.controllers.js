const controllers = {
  async registerUser(req, res) {
    res.status(201).json({
      status: 201,
      data: [req.data],
    });
  },

  loginUser(req, res) {
    res.status(200).json({
      status: 200,
      data: [req.data],
    });
  },
};

export default controllers;
