# Assignment 13 - Database Task

This project demonstrates MongoDB CRUD operations using Node.js, Express, and Mongoose.

## What this assignment includes

The server performs the required CRUD operations on a students collection:

- insertOne() / create
- find()
- findOne()
- updateOne()
- updateMany()
- deleteOne()
- deleteMany()

## Project files

- [server.js](server.js) - Express server with CRUD routes
- [mongo-crud-demo.js](mongo-crud-demo.js) - MongoDB demo script
- [.env](.env) - MongoDB connection settings

## How to run

1. Make sure your MongoDB Atlas connection string is correct in [.env](.env).
2. Run the server:

```powershell
node .\server.js
```

3. Open these URLs:

- http://localhost:3000/
- http://localhost:3000/students
- http://localhost:3000/student

## Sample student data

You can insert a student using this JSON body in Postman or Thunder Client:

```json
{
  "name": "Asha",
  "course": "Full Stack Development",
  "age": 21,
  "grade": "A"
}
```

## MongoDB Shell commands

```javascript
use crudAssignmentDB;

db.students.insertOne({ name: 'Asha', course: 'Full Stack Development', age: 21, grade: 'A' });
db.students.find();
db.students.findOne({ course: 'Full Stack Development' });
db.students.updateOne({ name: 'Asha' }, { $set: { grade: 'A+' } });
db.students.deleteOne({ name: 'Asha' });
```

## Assignment note

This assignment is completed by connecting to MongoDB, storing student data, and performing CRUD operations through the server and MongoDB commands.
