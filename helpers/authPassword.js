const bcrypt = require("bcrypt");

const authenticatePassword = async (plain, hash) => {
  const result = await bcrypt.compare(plain, hash);
  return result;
};

module.exports = { authenticatePassword };
