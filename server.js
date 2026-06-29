require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'crudAssignmentDB';
const collectionName = process.env.COLLECTION_NAME || 'students';

app.use(express.json());

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  age: Number,
  grade: String
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema, collectionName);

app.get('/', (req, res) => {
  res.json({
    message: 'MongoDB CRUD Assignment Server',
    database: dbName,
    collection: collectionName,
    routes: [
      'GET /students',
      'POST /students',
      'GET /students/:id',
      'PUT /students/:id',
      'DELETE /students/:id'
    ]
  });
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    if (students.length === 0) {
      return res.json({ message: 'No student data found yet.', students: [] });
    }
    return res.json(students);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/student', async (req, res) => {
  try {
    const students = await Student.find();
    if (students.length === 0) {
      return res.json({ message: 'No student data found yet.', students: [] });
    }
    return res.json(students);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/students/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Student not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri, { dbName });
    console.log(`Connected to MongoDB database: ${dbName}`);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.error(`Check that DB_NAME and COLLECTION_NAME in .env match your Compass database and collection.`);
    console.error('Also make sure your Atlas IP is allowed.');
    process.exit(1);
  }
}

startServer();
