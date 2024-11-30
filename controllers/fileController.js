const File = require('../models/file'); // Mongoose File model
const i18n = require('i18next');

// Create a new file entry in the database
exports.createFile = async (req, res) => {
  const { userId, name, size, type, path } = req.body;

  try {
    // Create a new file document
    const file = new File({ userId, name, size, type, path });
    await file.save();

    res.status(201).json(file);
  } catch (error) {
    // Handle error during file creation
    console.error('Error:', error);
    res.status(500).json({ message: i18n.t('errorCreatingFile'), error: error.message });
  }
};

// Retrieve all files from the database
exports.getFiles = async (req, res) => {
  try {
    // Fetch all file documents
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    // Handle error during file fetching
    console.error('Error:', error);
    res.status(500).json({ message: i18n.t('errorFetchingFiles'), error: error.message });
  }
};

// Retrieve a file by its ID from the database
exports.getFileById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the file document by ID
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ message: i18n.t('fileNotFound') });

    res.status(200).json(file);
  } catch (error) {
    // Handle error during file fetching by ID
    console.error('Error:', error);
    res.status(500).json({ message: i18n.t('errorFetchingFileById'), error: error.message });
  }
};

// Update an existing file in the database
exports.updateFile = async (req, res) => {
  const { id } = req.params;
  const { name, size, type, path } = req.body;

  try {
    // Fetch the file document by ID
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ message: i18n.t('fileNotFound') });

    // Update the file properties
    file.name = name || file.name;
    file.size = size || file.size;
    file.type = type || file.type;
    file.path = path || file.path;
    await file.save();

    res.status(200).json(file);
  } catch (error) {
    // Handle error during file update
    console.error('Error:', error);
    res.status(500).json({ message: i18n.t('errorUpdatingFile'), error: error.message });
  }
};

// Delete a file from the database
exports.deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the file document by ID
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ message: i18n.t('fileNotFound') });

    // Delete the file document
    await file.deleteOne();
    res.status(204).send();
  } catch (error) {
    // Handle error during file deletion
    console.error('Error:', error);
    res.status(500).json({ message: i18n.t('errorDeletingFile'), error: error.message });
  }
};
