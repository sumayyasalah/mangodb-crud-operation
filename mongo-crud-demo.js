require('dotenv').config();

const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  age: Number,
  grade: String
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

async function runCrudDemo() {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB at', mongoUri);

  await Student.deleteMany({});
  console.log('\nCollection cleared for a fresh demo.');

  console.log('\n1) insertOne()');
  const insertedOne = await Student.create({
    name: 'Asha',
    course: 'Full Stack Development',
    age: 21,
    grade: 'A'
  });
  console.log(insertedOne);

  console.log('\n2) insertMany()');
  const insertedMany = await Student.insertMany([
    { name: 'Ravi', course: 'Data Science', age: 22, grade: 'B' },
    { name: 'Mina', course: 'Full Stack Development', age: 20, grade: 'A' },
    { name: 'Kiran', course: 'Cloud Computing', age: 23, grade: 'C' }
  ]);
  console.log(insertedMany);

  console.log('\n3) find()');
  const allStudents = await Student.find({});
  console.log(allStudents);

  console.log('\n4) findOne()');
  const oneStudent = await Student.findOne({ course: 'Full Stack Development' });
  console.log(oneStudent);

  console.log('\n5) updateOne()');
  const updatedOne = await Student.findOneAndUpdate(
    { name: 'Asha' },
    { $set: { grade: 'A+' } },
    { new: true }
  );
  console.log(updatedOne);

  console.log('\n6) updateMany()');
  const updatedMany = await Student.updateMany(
    { course: 'Full Stack Development' },
    { $set: { grade: 'B+' } }
  );
  console.log(updatedMany);

  console.log('\n7) deleteOne()');
  const deletedOne = await Student.deleteOne({ name: 'Ravi' });
  console.log(deletedOne);

  console.log('\n8) deleteMany()');
  const deletedMany = await Student.deleteMany({ course: 'Cloud Computing' });
  console.log(deletedMany);

  console.log('\nFinal documents in collection:');
  const remainingStudents = await Student.find({});
  console.log(remainingStudents);
}

runCrudDemo()
  .catch((error) => {
    console.error('MongoDB CRUD demo failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
