const express = require('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');
var { mongoose } = require('.././db/mongoose');
var { Course } = require('.././models/course');
var { Student } = require('.././models/student');

let router = express.Router();

router.post('/insert', (req, res) => {
    const allStudents = new Array();
    const allCourses = new Array();
    let errStatus;
    const allPromise = new Array();
    const body = req.body;
    const students = body.students, courses = body.course;

    const promiseStudent = new Promise(function (resolve, reject) {
        if (students) {
            students.forEach((student) => {
                if (student && student.id) {
                    allStudents.push(student);
                    updateStudent(student);
                } else {
                    errStatus = "error";
                }
            });
            resolve();
        } else {
            reject("no values in student object")
        }
    });

    const promiseCourse = new Promise(function (resolve, reject) {
        if (courses) {
            courses.forEach((course) => {
                if (course && course.id) {
                    allCourses.push(course);
                    updateCourse(course);
                } else {
                    errStatus = "error";
                }
            });
            resolve();
        } else {
            reject("no values in course object")
        }
    });


    function updateStudent(student) {
        Student.findOneAndUpdate({ id: student.id }, { $set: student }, { new: true }, function (err, doc) {
            if (err || !doc) {
                new Student(student).save();
                console.log("student saved")
            } else
                console.log("student updated");
        });
    }

    function updateCourse(course) {
        Course.findOneAndUpdate({ id: course.id }, { $set: course }, { new: true }, function (err, doc) {
            if (err || !doc) {
                new Course(course).save();
                console.log("course saved")
            } else {
                console.log("course updated")
            }
        });
    }


    allPromise.push(promiseStudent);
    allPromise.push(promiseCourse);
    Promise.all([allPromise]).then(function () {
        if (errStatus === "error") {
            console.log(errStatus);
            res.status(400).send("error");
        } else {
            if (allStudents && allCourses) {
                res.send([{ allStudents }, { allCourses }]);
            } else if (allStudents) {
                res.send({ allStudents });
            } else if (allCourses) {
                res.send({ allCourses });
            }
        }

    });

});

module.exports = router;