const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
import model from '../models';
const { usuario } = model;
const { role } = model;

module.exports = function(passport) {
  //console.log("esto administrador passport")
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'nodeauthsecret',
  };
  
  passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {    
    //console.log(jwt_payload)
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
        console.log(user.role[0].nombre, " esto es ")
        if(user.role.length == 0){
            return done(null, false)
        }else{
            var data
            for(var i = 0; i < user.role.length; i++){
                if(user.role[i].nombre == 'administrador'){
                    data = user.role[i].nombre
                }
            }
            if(data == "administrador"){
                return done(null, user); 
            }else{
              return done(null, false)
            }  
        }
          
      })
      .catch((error) => { return done(error, false); });
  }));
};
