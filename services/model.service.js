const tf = require('@tensorflow/tfjs');

module.exports.predictDisease = async (data) => {
    const model = await tf.loadLayersModel('/model/model.json');
    const prediction = model.predict(data);
    return prediction;
}