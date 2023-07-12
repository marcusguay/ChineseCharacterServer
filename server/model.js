const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
var model;


async function loadModel(){
  console.log("Loading model");
  const handler = tf.io.fileSystem("model\\model.json");
 model = await tf.loadLayersModel(handler);
 console.log(model.summary());
 
 model.compile({
  optimizer: tf.train.adam(0.001), 
  loss: 'categoricalCrossentropy', 
  metrics: ['accuracy'] 
});

}



loadModel();
