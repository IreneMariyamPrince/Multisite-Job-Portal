/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user,webSources } = require('../sequelize');
const { UserStatus,WebSourceStatus } = require('../constants/constants');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the email exists in the database
    const userData = await user.findOne({ where: { email } });

    // If no user found with the email, respond with an error
    if (!userData) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    // If passwords don't match, respond with an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If email and password are correct, generate a JWT token
    const token = jwt.sign({ userId: userData.userId , userRole: userData.userRoleId }, process.env.JWT_SECRET, {
      expiresIn: '1h', // You can adjust the expiration time as needed
    });

    // Redirect users based on their roles
    switch (userData.userRoleId) {
      case 1:
        return res.json({ success: true, token, redirectTo: '/admin/dashboard' });
      case 2:
        return res.json({ success: true, token, redirectTo: '/region/dashboard' });
      case 3:
        return res.json({ success: true, token, redirectTo: '/employer/dashboard' });
      case 4:
        return res.json({ success: true, token, redirectTo: '/candidate/dashboard' });
      default:
        return res.json({ success: true, token, redirectTo: '/' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const passwordResetConfirm = async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Update user's password in the database
    const userToUpdate = await user.findOne({ where: { email: decodedToken.email } });
    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userToUpdate.update({ password: hashedPassword, userStatus: UserStatus.ACTIVE })
    const webSourceInfo = await webSources.findOne({where:userToUpdate.userId })
    await webSourceInfo.update({webInfoStatus:WebSourceStatus.ACTIVE })
    return res.status(200).json({ success: 'Password Reset Successfully' });
  } catch (error) {
    console.error('Failed to reset password:', error);
    return res.status(500).json({ error: 'Failed to reset password, Token expired' });
  }
};

module.exports = {
  login,
  passwordResetConfirm,
};
