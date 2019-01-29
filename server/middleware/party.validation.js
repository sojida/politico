const validateParty = (req, res, next) => {
  let verified = true;
  const error = [];

  const { name, hqAddress, logoUrl } = req.body;

  if (!name || !name.trim()) {
    verified = false;
    error.push({ name: 'name must be present' });
  }

  if (!hqAddress || !hqAddress.trim()) {
    verified = false;
    error.push({ hqAddress: 'hqAddress must be present' });
  }

  if (logoUrl) {
    if ((!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(logoUrl))) {
      verified = false;
      error.push({ logoUrl: 'invalid format' });
    }
  } else {
    verified = false;
    error.push({ logoUrl: 'logo must be present' });
  }

  if (!verified) {
    return res.status(400).json({
      status: 400,
      error,
    });
  }

  return next();
};

export default validateParty;
