const getTokenFrom = (req) => {
  
    const authorization = req.header('authorization');

    if (authorization && authorization.toLowerCase().includes("bearer")) {
      return authorization.substring(7);
    }

    return null;
  };

module.exports = getTokenFrom;