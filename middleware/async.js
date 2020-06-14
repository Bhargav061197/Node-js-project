module.exports = function (handler) {          //handles any exceptions at any api using npm package express-async-errors
    return async (req, res, next) => {
      try {
        await handler(req, res);
      }
      catch(ex) {
        next(ex);
      }
    };  
  }