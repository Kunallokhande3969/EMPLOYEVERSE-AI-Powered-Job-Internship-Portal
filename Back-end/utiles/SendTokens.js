// In SendTokens.js
const sendtoken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const expireDays = Number(process.env.COOKIE_EXPIRE) || 7; // fallback to 7 days
  const cookieDomain = process.env.COOKIE_DOMAIN || undefined;

  const options = {
    expires: new Date(Date.now() + expireDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  };

  if (cookieDomain) {
    options.domain = cookieDomain;
  }

  try {
    // Try to set cookie; if this fails, catch and return a safe JSON error
    res.status(statusCode).cookie('token', token, options).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    console.error('SendTokens: failed to set cookie', err);
    // Return error response without throwing
    res.status(500).json({ success: false, message: 'Failed to set auth cookie' });
  }
};

module.exports = { sendtoken };