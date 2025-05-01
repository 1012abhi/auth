import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { userModel } from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check by googleId OR email
        let user = await userModel.findOne({
          $or: [
            { googleId: profile.id },
            { email: profile.emails[0].value }
          ]
        });

        if (!user) {
          user = await userModel.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            isVerified: true,
          });
        } else {
          // Optionally update googleId if missing
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check by googleId OR email
        let user = await userModel.findOne({
          $or: [
            { googleId: profile.id },
            { email: profile.emails[0].value }
          ]
        });

        if (!user) {
          user = await userModel.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            isVerified: true,
          });
        } else {
          // Optionally update googleId if missing
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
console.log("CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);


// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;