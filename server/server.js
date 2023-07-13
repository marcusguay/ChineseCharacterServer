



const express = require('express');
const fs = require('fs')
var csv = require('csv')
const app = express();
const path = require("path");
var data = require("./model/chinesechars.json");
var cors = require('cors');

var model = null;

app.use(cors());
app.use(express.static(__dirname + '/model'));


app.get('/GetCharData', (req,res) => { 
  console.log("eq")
  console.log(data)
 res.send(data)
});


app.get('/CharSearch/', (req,res) => { 
 var str = req.query.char;
  const response =[];
  str = Array.from(str);
 console.log(str);

  str.forEach(s => {  
    console.log(s);
    const char = charData.get(s);
   if(char){
  const json = char;
  json.push(s)
  console.log(json);
  response.push(json)
   } else {
    response.push(["Character info is not in database",s]);

   }

  });

  console.log(response);
   res.send(response);
});


hanziData = null;

 function loadDatabase(){
    var dataMap = new Map();
fs.readFile('hanziDB.csv','utf8', (error, data) => { 
 csv.parse(data, {columns: false, trim: true}, function(err, rows) {

    for(const elem of rows) {
      dataMap.set(elem[1],[elem[2],elem[3]]);
    }
  // console.log(rows);
  // console.log(dataMap);
   
});
});

return dataMap;
}

charData = loadDatabase();



const port =  process.env.port || 5000;
app.listen(port, () => console.log('listening on port ' + port + " " + __dirname + '/model'));