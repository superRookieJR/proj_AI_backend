// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const tf = require('@tensorflow/tfjs-node');
// const path = require('path');
// const Jimp = require('jimp');

// let model;

// const upload = multer({ dest: 'uploads/' });

// // Load the TensorFlow model
// async function loadModel() {
//   console.log("PATH")
//   console.log(path.join(__dirname, '../../model\/rock_paper_scissors_model.h5'))
//   model = await tf.loadLayersModel(path.join(__dirname, '../../model/rock_paper_scissors_model.h5'));
//   console.log('Model loaded successfully');
// }
// // Convert an uploaded image file to a Tensor
// async function processImage(filePath) {
//   const image = await Jimp.read(filePath);
//   image.resize(224, 224); // Resize to the required dimensions for your model

//   // Convert the image to a TensorFlow tensor
//   const imageData = new Uint8Array(image.bitmap.data);
//   const tensor = tf.tensor3d(imageData, [image.bitmap.height, image.bitmap.width, 4]); // Assuming the image has 4 channels (RGBA)
//   const normalized = tensor.div(255.0); // Normalize the pixel values to [0, 1]

//   return normalized.reshape([1, 224, 224, 3]); // Reshape to match the input shape required by your model (e.g., [1, 224, 224, 3])
// }

// // Route to handle image uploads and predictions
// router.post('/predict-image', upload.single('image'), async (req, res) => {
//   try {
//     if (!model) {
//       return res.status(500).send('Model not loaded');
//     }

//     const filePath = req.file.path;
//     const tensor = await processImage(filePath);

//     const predictions = model.predict(tensor);
//     const outputData = predictions.arraySync(); // Convert the tensor to a JavaScript array

//     res.json({ predictions: outputData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error making predictions');
//   }
// });

// loadModel()

// module.exports = router