const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/client'));
const uri = process.env.ATLAS_URI;
//Connecting to the mongodb database(using mlab)
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (error) => {
  if (error) {
    console.log(error)
  }
  else {
    console.log("MongoDB database connection established successfully");
  }
}
);

//Our template for our data when we store it
var currencySchema = new mongoose.Schema({
  slno: Number,
  symbol: String,
  name: String,
});

//Making that template into a model we can use to add, delete, and find out data. This model will be made into the currency collection when we start adding data.
var Currency = mongoose.model("Currency", currencySchema);

//Easier way to add to the database
// Currency.create({
//   slno: 4,
//   symbol: "JPY",
//   name: "Japanese Yen"
// }, function(error, data){
//   if(error){
//       console.log("Problem adding data to collection");
//   }else{
//       console.log("Data added: ");
//       console.log(data);
//   }
// });
var allCurrency;
var resultData =[];
Currency.find({}, function (error, data) {
  if (error) {
    console.log("Problem finding data");
  } else {
    allCurrency = data.map((item,index)=>{
      var temp ={};
      temp.symbol = item.symbol;
      temp.name = item.name;
      resultData.push(temp);
      });
  }
})

//Api call to fetch data to frontend
app.get('/api/currencies', function (req, res) {
  res.json(resultData);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


