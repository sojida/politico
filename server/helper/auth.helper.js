const seperateNames = (name) => {
  if (!name) {
    return undefined;
  }

  const names = name.trim().split(' ').filter(item => item !== '');
  if (names.length <= 1) {
    return undefined;
  }
  return names;
};

const isAdmin = (req, res, next) => {
  if (!req.user.isadmin) {
    return res.status(401).json({
      status: 401,
      error: 'This user is not an admin',
    });
  }

  return next();
};

const bodyIsString = (req, res, next) => {
  const data = Object.entries(req.body);
  let verified = true;
  const error = [];
  data.forEach((item) => {
    if (typeof item[1] !== 'string') {
      verified = false;
      error.push({ error: `${item[0]} must be a string` });
    }
  });

  if (!verified) {
    return res.status(400).json({
      status: 400,
      error,
    });
  }
  return next();
};

const checkParams = (req, res, next) => {
  const { id } = req.params;
  if (id.trim().length) {
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'id must be a number',
      });
    }
  } else {
    return res.status(400).json({
      status: 400,
      error: 'id must be present',
    });
  }

  return next();
};


export default {
  seperateNames,
  isAdmin,
  bodyIsString,
  checkParams,
};
