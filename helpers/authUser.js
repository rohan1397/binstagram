const authenticateUser = async (model, id) => {
  const isUser = await model.findById(id);
  if (isUser) {
    return true;
  } else {
    return false;
  }
};

module.exports = authenticateUser;
