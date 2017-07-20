const Place = require('../models/Event');
const mongoose = require('mongoose');
const dbURL = process.env.MONGO_DB_URL;

mongoose.connect('mongodb://localhost/comunity-plan')
  .then(() => {
    console.log('seed event');
    let events = [{
      name: 'Swing Dance Lesson',
      description: 'Tuesdays are for Swing Dance Lessons here at Paseo de la Chopera! Put on your favorite dancing shoes, come out and join us!',
      place_id: 'Paseo de la Chopera',
      deadline: '2017-08-04',
      creator_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      picPath: '/event-images/',
      goal          : 50,
      totalPledged  : 0
    }
    ];

    let eventsObj = events.map(e => new Event(e));

    eventsObj.forEach(e => e.save((err, obj) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`New event created [${obj.name}]`);
      }
    }));
  });
