const passport = require('passport');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

function authController() {
  return {
    login(req, res) {
      res.render('auth/login');
    },
    postLogin(req, res, next) {
      passport.authenticate('local', (err, user, info) => {
        if(err) {
          req.flash('error', info.message)
          return next(err)
        }
        if(!user) {
          req.flash('error', info.message)
          return res.redirect('/login')
        }
        req.logIn(user, (err) => {
          if(err) {
            req.flash('error', info.message)
            return next(err)
        }
        return res.redirect('/')
      })
      })(req, res,next) 
    },
    register(req, res){
        res.render('auth/register')
    },
    register(req, res) {
      res.render('auth/register');
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body;

      // validate request
      if (!name || !email || !password) {
        req.flash('error', 'All fields are required');
        req.flash('name', name);
        req.flash('email', email);
        return res.redirect('/register');
      }

      try {
        // Check if email exists
        const emailExists = await User.exists({ email: email });
        if (emailExists) {
          req.flash('error', 'Email already taken');
          req.flash('name', name);
          req.flash('email', email);
          return res.redirect('/register');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a user
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword, // Use the hashed password
        });

        // Save the user to the database
        await user.save();

        // Redirect after successful registration
        return res.redirect('/');
      } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong');
        return res.redirect('/register');
      }
    },
    logout(req, res) {
     req.logout()
     return res.redirect('/login')
    }
  
  };
}

module.exports = authController;
