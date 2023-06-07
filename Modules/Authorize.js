const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');


function verifyUser(request, response, next) {
  

  function valid(err, user) {
    request.user = user;
    next();
  }

  try{
    const token = request.header.authorization.split('')[1];
    jwt.verify(token, getKey, {}, valid);
  }catch (error) {
    next('Not Authorized')
  }
}



// =============== HELPER METHODS, pulled from the jsonwebtoken documentation =================== //
//                 https://www.npmjs.com/package/jsonwebtoken                                     //

// Define a client, this is a connection to YOUR auth0 account, using the URL given in your dashboard
const client = jwksClient({
  // this url comes from your app on the auth0 dashboard
  jwksUri: process.env.JWKS_URI,
});

// Match the JWT's key to your Auth0 Account Key so we can validate it
function getKey(header, callback) {
  console.log(header.kid);
  client.getSigningKey(header.kid, function (err, key) {
    console.log('E', err);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}


module.exports = verifyUser;