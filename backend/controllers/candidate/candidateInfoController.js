/* eslint-disable no-undef */
const { user, candidateInfo } = require('../../sequelize');

const candidatePersonalInfo = async (req, res) => {
  const userId = req.userId;
  try {
    const candidateData = await user.findOne({ where: { userId: userId } });
    return res.json({ data: candidateData });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

module.exports = { candidatePersonalInfo };
