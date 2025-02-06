function role(allowedRoles) {
    return (req, res, next) => {
      if (allowedRoles.includes(req.role)) {
        next();
      } else {
        return res
          .status(403)
          .json({ error: 'You do not have permission to view this content' });
      }
    };
  }
  
  module.exports = role;