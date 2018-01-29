const express = require('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');
var { mongoose } = require('.././db/mongoose');
var { Course } = require('.././models/course');
var { Student } = require('.././models/student');

let router = express.Router();

router.post('/insert', async (req, res) => {
    let allStudents = new Array();
    let allCourses = new Array();

    const body = req.body;
    const students = body.students, course = body.course;
    const loopArr = students.length >= course.length ? students : course;
    loopArr.forEach((obj, i) => {
        if (students[i]) {
            allStudents.push(students[i]);
            Student.findOneAndUpdate({ id: students[i].id }, { $set: students[i] }, { new: true }, function (err, doc) {
                if (err || !doc) {
                    new Student(students[i]).save();
                }
                else {
                    console.log("succesfully updated: Student");
                }
            });
        }
        if (course[i]) {
            allCourses.push(course[i]);
            Course.findOneAndUpdate({ id: course[i].id }, { $set: course[i] }, { new: true }, function (err, doc) {
                if (err || !doc) {
                    new Course(course[i]).save();
                } else {
                    console.log("succesfully updated: Course");
                }
            })
        }
    });
    if (allStudents.length > 0 && allCourses.length > 0) {
        res.send([{ allStudents }, { allCourses }]);
    } else if (allStudents.length > 0) {
        res.send({ allStudents });
    } else if (allCourses.length > 0) {
        res.send({ allCourses });
    } else {
        res.status(400).send("error");
    }
});

module.exports = router;