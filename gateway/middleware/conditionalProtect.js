const protect = require("./auth");

const conditionalProtect = (req, res, next) => {
  const protectedPaths = ["myBlogs"]; // Array of protected paths
  console.log(protectedPaths.some((str) => req.path.includes(str)));
  // Check if the request path matches any protected paths
  if (protectedPaths.some((str) => req.path.includes(str))) {
    // Apply 'protect' middleware to protected paths
    protect(req, res, next);
  } else {
    // Continue to the next middleware/route
    next();
  }
};

module.exports = conditionalProtect;
