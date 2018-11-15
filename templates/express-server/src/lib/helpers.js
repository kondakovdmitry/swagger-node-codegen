function validate(schema, obj) {
  const result = schema.validate(obj);
  if (result.error) {
    const error = new Error(result.error.details[0].message);
    error.status = 400;
    throw error;
  }
}

function asyncMiddleware(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = {
  validate,
  asyncMiddleware,
}
