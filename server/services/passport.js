const passport = require('passport');
const JwtStrategy = require('passport-jwt').Stategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
/*>>>>>>=============================================<<<<<<*/
const User = require('../models/user');
const config = require('../server/config');
/*>>>>>>=============================================<<<<<<*/
// Setup option for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	// See if the user ID in the payload exists in our DB
	// If it does, call 'done' with that other
	// Otherwise, call done without a user object
	User.findById(payload.sub, (err, user) => {
		if (err) { return done(err, false); }

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);