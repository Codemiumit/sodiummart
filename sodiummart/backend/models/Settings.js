const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'SodiumMart'
  },
  siteLogo: {
    type: String,
    default: ''
  },
  contactEmail: {
    type: String,
    default: 'contact@sodiummart.com'
  },
  contactPhone: {
    type: String,
    default: '+1 234 567 890'
  },
  address: {
    type: String,
    default: '123 Commerce Street, City, Country'
  },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' }
  }
});

module.exports = mongoose.model('Settings', settingsSchema);
