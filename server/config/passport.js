const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
import model from '../models';
const { usuario } = model;
const { role } = model;

module.exports = function(passport) {
  //console.log(passport, " dddd ")
  //console.log(" esto es passport")
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'nodeauthsecret',
  };
  
  passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {    
    console.log(jwt_payload, "   esto es lo que quiero ver ")
    usuario
      .findOne({
        where:{id : jwt_payload.id},
        include: [
          {
              model: role,
              as: 'role'
          }]
      })
      .then((user) => {         
        console.log(user, " <<<<<<<<<<<<<<<<<<<<<<<<<")
        if(user.role[0].nombre == "administrador" || user.role[0].nombre == "usuario"){
          return done(null, user); 
        }else{
          return done(null, false)
        }    
      })
      .catch((error) => { return done(error, false) });
  }));
};


