require('dotenv').config();
const User = require('../models/User');
const mongoose = require('mongoose');
const dbURL = process.env.MONGO_DB_URL;

mongoose.connect(dbURL)
  .then(() => {
    console.log('seed user');
    let users = [{
      username: 'Boyander',
      name: 'Marc Pomar',
      email: 'marc@ironhack',
      password: '1234',
      picPath: '/profile-images/marcpomar.jpg'
    }, {
      username: 'FranBosquet',
      name: 'Fran Bosquet',
      email: 'fran@ironhack',
      password: '1234',
      picPath: '/profile-images/franbosquet.jpg'
    }, {
      username: 'FerRodri',
      name: 'Fernando Rodriguez',
      email: 'fer@ironhack',
      password: '1234',
      picPath: '/profile-images/fer.jpg'
    }
    ];

    let usersObj = users.map(e => new User(e));

    usersObj.forEach(e => e.save((err, obj) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`New user created [${obj.username}]`);
      }
    }));
  });
