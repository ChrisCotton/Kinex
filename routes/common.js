const express = require('express');
const router = express.Router();
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/current_user', requireAuth, (req, res, next) => {
    const { firstName, lastName, createdUsers } = req.user;
    res.json({
        firstName,
        lastName,
        createdUsers
    });
})

module.exports = router;
