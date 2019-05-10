const admin = require('firebase-admin');
admin.initializeApp();

exports.onUserStatusChanged = require('./triggers/onUserStatusChanged');