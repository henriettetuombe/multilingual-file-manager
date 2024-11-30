const fileQueue = require('../config/queue');

fileQueue.process(async (job) => {
  // Perform file processing tasks here
  console.log(`Processing file with ID: ${job.data.fileId}`);
});