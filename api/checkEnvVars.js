function checkVariables() {
  const subscriptionKey = process.env.SPEECH_SERVICE_KEY;
  if (!subscriptionKey) {
    throw new Error('Environment variable for your subscription key is not set.');
  }
  const serviceRegion = process.env.SPEECH_SERVICE_REGION;
  if (!serviceRegion) {
    throw new Error('Environment variable for your SPEECH SERVICE REGION is not set.');
  }
}

exports.checkVariables = checkVariables;
