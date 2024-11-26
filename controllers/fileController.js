const { File } = require('../models');
const i18n = require('i18next');

// Create a new file entry in the database
exports.createFile = async (req, res) => {
  const { userId, name, size, type, path } = req.body;

  try {
    // Create a new file record
    const file = await File.create({ userId, name, size, type, path });
    res.status(201).json(file);
  } catch (error) {
    // Handle error during file creation
    console.error('Error:', error);
    res.status(500).json({ message: i18n.t('errorCreatingFile'), error });
  }
};

// Retrieve all files from the database
exports.getFiles = async (req, res) => {
  try {
    // Fetch all file records
    const files = await File.findAll();
    res.status(200).json(files);
  } catch (error) {
    // Handle error during file fetching
    console.error('Error:', error);
    res.status(500).json({ message: i18n.t('errorFetchingFiles'), error });
  }
};

// Retrieve a file by its ID from the database
exports.getFileById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    // Fetch the file record by primary key
    const file = await File.findByPk(id);
    if (!file) return res.status(404).json({ message: i18n.t('fileNotFound') });
    res.status(200).json(file);
  } catch (error) {
    // Handle error during file fetching by ID
    console.error('Error:', error);
    res.status(500).json({ message: i18n.t('errorFetchingFileById'), error });
  }
};

// Update an existing file in the database
exports.updateFile = async (req, res) => {
  const id = Number(req.params.id);
  const { name, size, type, path } = req.body;

  try {
    // Fetch the file record by primary key
    const file = await File.findByPk(id);
    if (!file) return res.status(404).json({ message: i18n.t('fileNotFound') });

    // Update the file properties
    file.name = name;
    file.size = size;
    file.type = type;
    file.path = path;
    await file.save();
    
    res.status(200).json(file);
  } catch (error) {
    // Handle error during file update
    console.error('Error:', error);
    res.status(500).json({ message: i18n.t('errorUpdatingFile'), error });
  }
};

// Delete a file from the database
exports.deleteFile = async (req, res) => {
  const id = Number(req.params.id);

  try {
    // Fetch the file record by primary key
    const file = await File.findByPk(id);
    if (!file) return res.status(404).json({ message: i18n.t('fileNotFound') });
    
    // Delete the file record
    await file.destroy();
    res.status(204).send();
  } catch (error) {
    // Handle error during file deletion
    console.error('Error:', error);
    res.status(500).json({ message: i18n.t('errorDeletingFile'), error });
  }
};