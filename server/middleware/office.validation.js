const validateOffice = (req, res, next) => {
  let verified = true;
  const error = [];

  const { type, name } = req.body;
  const typesOfGov = ['Federal', 'State', 'Local', 'Legislative'];

  if (!type || !type.trim()) {
    verified = false;
    error.push({ type: 'type must be present' });
  }

  if (!typesOfGov.includes(type)) {
    verified = false;
    error.push({ type: 'please specify a valid type: Federal, State, Local or Legislative' });
  }

  if (!name || !name.trim()) {
    verified = false;
    error.push({ name: 'name must be present' });
  }

  if (!isNaN(parseFloat(name))) {
    verified = false;
    error.push({ name: 'name should not be only numbers' });
  }

  if (!isNaN(parseFloat(type))) {
    verified = false;
    error.push({ type: 'type should not be only numbers' });
  }

  if (!verified) {
    return res.status(400).json({
      status: 400,
      error,
    });
  }

  return next();
};

export default validateOffice;
