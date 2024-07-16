import passport from 'passport';

export const postLoginHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).send('User already logged in');
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
     
      return res.status(409).send('Invalid email or password, try again or register.');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log('User logged in successfully:', user);
      return res.status(200).send('User logged in successfully');
    });
  })(req, res, next);
};
