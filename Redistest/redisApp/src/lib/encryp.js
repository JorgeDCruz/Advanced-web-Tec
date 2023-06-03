const bcrypt = require('bcryptjs');

const encryp = {};

encryp.createKey = async (data) => {
    const salt = await bcrypt.genSalt(10);
    const key = await bcrypt.hash(data, salt);
    return key;
};

module.exports = encryp;