const File = require('./models/file'); // Adjust the path to your Mongoose File model

async function createFile(fileData) {
  try {
    const file = new File(fileData);
    await file.save();
    console.log('File created:', file);
  } catch (error) {
    console.error('Error creating file:', error.message);
  }
}

async function getAllFiles() {
  try {
    const files = await File.find();
    console.log('Files:', files);
  } catch (error) {
    console.error('Error fetching files:', error.message);
  }
}

async function getFileById(fileId) {
  try {
    const file = await File.findById(fileId);
    if (file) {
      console.log('File:', file);
    } else {
      console.log('File not found');
    }
  } catch (error) {
    console.error('Error fetching file:', error.message);
  }
}

async function updateFile(fileId, updatedData) {
  try {
    const file = await File.findById(fileId);
    if (file) {
      Object.assign(file, updatedData);
      await file.save();
      console.log('File updated:', file);
    } else {
      console.log('File not found');
    }
  } catch (error) {
    console.error('Error updating file:', error.message);
  }
}

async function deleteFile(fileId) {
  try {
    const file = await File.findById(fileId);
    if (file) {
      await file.deleteOne();
      console.log('File deleted');
    } else {
      console.log('File not found');
    }
  } catch (error) {
    console.error('Error deleting file:', error.message);
  }
}

// Example usage
(async () => {
  await createFile({ userId: '648fcba0ab12cd1234567890', name: 'example.txt', size: 1234, type: 'text/plain', path: '/path/to/file' });
  await getAllFiles();
  await getFileById('648fcba0ab12cd1234567890'); // Replace with an actual MongoDB ObjectId
  await updateFile('648fcba0ab12cd1234567890', { name: 'updated_example.txt', size: 5678 });
  await deleteFile('648fcba0ab12cd1234567890');
})();
