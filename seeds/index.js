const mongoose = require('mongoose')
const cities = require('./cities')
const Campground = require('../models/campground')
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error!"));
db.once("open", ()=>{
    console.log("Database connected");
    
})

const sample = array => array[Math.floor(Math.random()*array.length)]

const seedDb = async()=>{
    await Campground.deleteMany({});
    for(let i =0 ; i<300; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) +10;
       const camp =  new Campground({
            author: '670e449a7125a0f4ea278430',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
             geometry: {
                type: "Point",
                coordinates: [
                   cities[random1000].longitude,
                   cities[random1000].latitude
                ]
            },
            image:  [
                {
                  url: 'https://res.cloudinary.com/dgyy5xbcq/image/upload/v1729158329/yelpcamp/rzf609pgzea8o33okd2z.jpg', 
                  filename: 'yelpcamp/rzf609pgzea8o33okd2z',       
                     
                },
                {
                  url: 'https://res.cloudinary.com/dgyy5xbcq/image/upload/v1729158332/yelpcamp/isubiifioen57227u6ui.jpg', 
                  filename: 'yelpcamp/isubiifioen57227u6ui',       
                  
                },
                {
                  url: 'https://res.cloudinary.com/dgyy5xbcq/image/upload/v1729158332/yelpcamp/pz8ckhkefc6hmsqrletz.jpg', 
                  filename: 'yelpcamp/pz8ckhkefc6hmsqrletz',       
                  
                }
              ],
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit sunt ut quae porro eligendi labore quam quibusdam facere a cum hic beatae, quas ex minima facilis, dolor, quasi amet est?",
            price
        })
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.Collection.close();
})