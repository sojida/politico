const controllers = {
  voteCandidate: (req, res) => {
    res.status(201).json({
      status: 201,
      data: req.data,
      message: 'You voted successfuly',
    });
  },

  getUserVotes: (req, res) => {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },
};

export default controllers;
