const Place = require('../models/Place');
const mongoose = require('mongoose');
const dbURL = process.env.MONGO_DB_URL;

mongoose.connect('mongodb://localhost/comunity-plan')
  .then(() => {
    console.log('seed place');
    let places = [
      {
        place_id: 1,
        description: 'type:edificación, m2: 200, address: Calle Pista, 4, 28011 Madrid, Spain',
        location: { type: 'Point', coordinates: [40.41573, -3.7272500000000264] },
        picPath:'/images/1.png'
      },
      {
        place_id: 2,
        description: 'type: solar, m2: 200, address: Paseo de la chopera, 28045 Madrid, Spain',
        location: { type: 'Point', coordinates: [40.39411282476374, -3.6999088525772095] },
        picPath:'/images/2.png'
      },
      {
        place_id: 3,
        description: 'type: solar, m2: 200, address: Calle Rosa Jardón, 12, 28016 Madrid, Spain',
        location: { type: 'Point', coordinates: [40.46517848053278, -3.668789863586426] },
        picPath:'/images/3.png'
      },
      {
        place_id: 4,
        description: 'type: edificacion, m2: 200, address: Calle Rafael Finat, 75, 28044 Madrid, Spain',
        location: { type: 'Point', coordinates: [40.3779847, -3.7710730000000012] },
        picPath:'/images/4.png'
      },
      {
        place_id: 5,
        description: 'type: edificacion, m2: 200, address: Calle Mayor, 58, 28013 Madrid, Spain',
        location: { type: 'Point', coordinates: [40.4158009, -3.709655399999974] },
        picPath:'/images/5.png'
      },
      {
        place_id: 6,
        description: 'type: edificacion, m2: 200, address: Calle de los Señores de Luzon, 3, 28013 Madrid, Spain',
        location: { type: 'Point', coordinates: [40.4158377, -3.710760299999947] },
        picPath:'/images/6.png'
      },
      {
        place_id: 7,
        description: 'type: edificacion, m2: 200, address: Calle de la Ribera de Curtidores, 8, 28005 Madrid, Spain',
        location: { type: 'Point', coordinates: [40.4087647, -3.7074706999999307] },
        picPath:'/images/7.png'
      },
      {
        place_id: 8,
        description: 'type: edificacion, m2: 200, address: Calle de Guatemala, 24, 28016 Madrid, Spain',
        location: { type: 'Point', coordinates: [40.4592734, -3.6705498000000034] },
        picPath:'/images/8.png'
      },
      {
        place_id: 9,
        description: 'type: solar, m2: 200, address: Calle Eduardo Morales, 28, 28025 Madrid, Spain',
        location: { type: 'Point', coordinates: [40.3878416, -3.7373943000000054] },
        picPath:'/images/9.png'
      },
      {
        place_id: 10,
        description: 'type: solar, m2: 200, address: Calle Hermanos Álvarez Quintero, 3, 28004 Madrid, Spain',
        location: { type: 'Point', coordinates: [40.4275401, -3.6974347000000307] },
        picPath:'/images/10.png'
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
