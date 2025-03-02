const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("./models/User");

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
            }).save();
        }
        return done(null, user);
    })
);

passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
            user = await new User({
                username: profile.username,
                email: profile.emails[0].value,
                githubId: profile.id,
            }).save();
        }
        return done(null, user);
    })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
