const User = require('../models/user.model');
const Plan = require('../models/plan.model.js');

module.exports = async function ValidateApiKey(req, res, next) {
  const { apikey } = req.headers;
  if (!apikey) return res.status(400).json({ msg: 'Missing a apiKey header' });

  const user = await User.findOne({ apiKey: apikey });
  if (!user) return res.status(400).json({ msg: 'Invalid API Key' });
  req.user = user;

  const userPlan = await Plan.findById(user.plan);
  if (!userPlan.allowApiAccess) return res.status(401).json({ msg: 'Your current plan does not support api access' });

  return next();
};
