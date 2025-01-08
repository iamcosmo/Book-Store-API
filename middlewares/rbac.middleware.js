const rbac = (roles) => {
    return (req, res, next) => {
      const userRole = req.headers['x-role'];
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };
  
  export default rbac;
  