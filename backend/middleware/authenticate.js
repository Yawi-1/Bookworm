const { expressjwt: expressJwt } = require("express-jwt");

const authenticated = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

module.exports = authenticated;
