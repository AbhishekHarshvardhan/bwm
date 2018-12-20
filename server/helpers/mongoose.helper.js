module.exports = {
  normalizeMongooseError: function(errors) {
    let normalizeErrors = [];
    for (let properties in errors) {
      if (errors.hasOwnProperty(properties)) {
        normalizeErrors.push({
          title: properties,
          details: `${errors[properties].message} (${errors[properties].value})`
        });
      }
    }
    return normalizeErrors;
  }
};
