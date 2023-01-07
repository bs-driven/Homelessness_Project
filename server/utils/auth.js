const jwt = require('jsonwebtoken');
// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }){
        let token = req.body.token

        if (!token) {
            return req
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.profile = data;
          } catch {
            console.log('Invalid token');
          }
          return req;
        },
        signToken: function ({ name, email, _id }) {
            const userData = { name, email, _id };
        
            return jwt.sign({ data: userData }, secret, { expiresIn: expiration });
          },

    
};