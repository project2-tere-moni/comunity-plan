require('dotenv').config();
const Event = require('../models/Event');
const User = require('../models/User');
const mongoose = require('mongoose');
const dbURL = process.env.MONGO_DB_URL;

mongoose.connect(dbURL)
  .then(() => {
    console.log('seed event');
    let events = [{
      name: 'Swing Dance Lesson',
      description: 'Tuesdays are for Swing Dance Lessons here at Paseo de la Chopera! Put on your favorite dancing shoes, come out and join us!',
      place_id: 'Paseo de la Chopera',
      deadline: '2017-08-04',
      _username: "Boyander",
      picPath: '/event-images/claseswing.jpg',
      goal          : 50,
      totalPledged  : 15
    }, {
      name: 'Basic Carpentry Workshop',
      description: 'Learn how to plan a project and work with both power and hand tools while finishing a basic box construction. Learn how to plan a project and work with both power and hand tools while finishing a basic box construction. Taught by The Bower\'s own experienced in-house woodworkers.',
      place_id: 'Pista',
      deadline: '2017-08-11',
      _username: "FranBosquet",
      picPath: '/event-images/claseswing.jpg',
      goal          : 50,
      totalPledged  : 12
    }, {
      name: 'Outdoor cinema summer edition',
      description: 'As part of our growing cinema programme we\'ll be bringing a summer blockbuster back to the big screen. Check back regularly for updates.',
      place_id: 'Señores de Luzon',
      deadline: '2017-09-01',
      _username: "FerRodri",
      picPath: '/event-images/cineverano.jpg',
      goal          : 50,
      totalPledged  : 20
    }, {
      name: '2nd Annual Kid\'s Adventure Games',
      description: 'This is a fun and confidence building outdoor experience for kids ages 6-14. A great day out for the whole family!',
      place_id: 'Hermanos Álvarez Quintero',
      deadline: '2017-07-27',
      _username: "Boyander",
      picPath: '/event-images/juegosinfantiles.jpg',
      goal          : 50,
      totalPledged  : 20
    }, {
      name: 'Concert in La Latina',
      description: 'Carlos Garo and Terry Oldfield perform tracks from their new album Sky Dancer.',
      place_id: 'Ribera de Curtidores',
      deadline: '2017-07-25',
      _username: "FranBosquet",
      picPath: '/event-images/concierto.jpg',
      goal          : 50,
      totalPledged  : 20
    }, {
      name: 'Summer Theatre Performance School',
      description: 'Following the success of the Summer Theatre Performance School in January we are pleased to announce the SUMMER THEATRE PERFORMANCE SCHOOL which will be held at Rosa Jardón.',
      place_id: 'Rosa Jardón',
      deadline: '2017-07-30',
      _username: "FerRodri",
      picPath: '/event-images/teatroairelibre.jpg',
      goal          : 50,
      totalPledged  : 15
    }, {
      name: 'Flea Market Weekend!',
      description: 'Pop along to our weekly Flea Market at The Food + Flea! Delight in good food, vintage clothing, music, local designer/makers, antiques and more!',
      place_id: 'Guatemala',
      deadline: '2017-08-01',
      _username: "Boyander",
      picPath: '/event-images/mercadillo.jpg',
      goal          : 50,
      totalPledged  : 10
    }, {
      name: 'Free Yoga Lessons',
      description: 'Now is your chance to get a taste of the dynamic, trust building, core stabilizing, and therapeutic benefits of Yoga.',
      place_id: 'Eduardo Morales',
      deadline: '2017-08-03',
      _username: "FranBosquet",
      picPath: '/event-images/claseyoga.jpg',
      goal          : 50,
      totalPledged  : 5
    }, {
      name: 'Ecology Workshop & Field Techniques',
      description: 'Over the next two weeks Open Jar are in Madrid investigating the soil ecosystems around El Rio Manzaneres in collaboration with INLAND and Huerta Matadero',
      place_id: 'Rafael Finat',
      deadline: '2017-07-28',
      _username: "FerRodri",
      picPath: '/event-images/ecologia3.jpg',
      goal          : 50,
      totalPledged  : 23
    }
    ];

    let eventsObj = events.map(e => {
      return User.findOne({username:e._username}).exec().then( user => {
        delete e._username;
        e["creator_id"] = user._id;
        return new Event(e).save()
              .then(obj => console.log(`New event created [${obj.name}]`));
      }).catch(e => console.log(e));
    });
    Promise.all(eventsObj).then( () => console.log("All objects created"));

  });
