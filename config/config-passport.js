import passport from "passport";
import passportJWT from "passport-jwt";
import "dotenv/config";
import { User } from "../schema/user.js";

export default function setJWTStrategy() {
  const secret = process.env.SECRET;
  const ExtractJWT = passportJWT.ExtractJwt;
  const Strategy = passportJWT.Strategy;
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new Strategy(params, function (payload, done) {
      const user = User.find({ _id: payload.id });
      if (!user) {
        return done(new Error("User not found"));
      }
      return done(null, user);
    })
  );
}
