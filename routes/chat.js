const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load Chat model
const Chat = require('../models/Chat');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

// Dashboard  Page
router.get('/dashboard', forwardAuthenticated, (req, res) => res.render('dashboard'));
// chat Page
router.get('/chat', ensureAuthenticated, (req, res) => res.render('chat'));

module.exports = router;