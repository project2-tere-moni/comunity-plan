const Place = require('../models/Place');
const mongoose = require('mongoose');
const dbURL = process.env.MONGO_DB_URL;

mongoose.connect(dbURL)
  .then(() => {
    let places = [
      {
        place_id: 1,
        description: 'edificación',
        location: { type: 'Point', coordinates: [-3.7272500000000264,40.41573] },
        picPath:'/images/1'
      },
      {
        place_id: 2,
        description: 'solar',
        location: { type: 'Point', coordinates: [-3.6999088525772095,40.39411282476374] },
        picPath:'/images/2'
      },
      {
        place_id: 3,
        description: 'solar',
        location: { type: 'Point', coordinates: [3.668789863586426,40.46517848053278] },
        picPath:'/images/3'
      },
      {
        place_id: 4,
        description: 'edificacion',
        location: { type: 'Point', coordinates: [-3.7710730000000012,40.3779847] },
        picPath:'/images/4'
      },
      {
        place_id: 5,
        description: 'edificacion',
        location: { type: 'Point', coordinates: [-3.709655399999974,40.4158009] },
        picPath:'/images/5'
      },
      {
        place_id: 6,
        description: 'edificacion',
        location: { type: 'Point', coordinates: [-3.710760299999947,40.4158377] },
        picPath:'/images/6'
      },
      {
        place_id: 7,
        description: 'edificacion',
        location: { type: 'Point', coordinates: [-3.7074706999999307,40.4087647] },
        picPath:'/images/7'
      },
      {
        place_id: 8,
        description: 'edificacion',
        location: { type: 'Point', coordinates: [3.6705498000000034,40.4592734] },
        picPath:'/images/8'
      },
      {
        place_id: 9,
        description: 'solar',
        location: { type: 'Point', coordinates: [-3.7373943000000054,40.3878416] },
        picPath:'/images/9'
      },
      {
        place_id: 10,
        description: 'edificacion',
        location: { type: 'Point', coordinates: [-3.6974347000000307,40.4275401] },
        picPath:'/images/10'
      }
    ];

    let placesObj = places.map( p => new Place(p));

    placesObj.forEach( p => p.save( (err, obj) =>{
      if(err){
        console.log(err);
      }else{
        console.log(`New place created [${obj.place_id}]`);
      }
    }));
  });
