import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom';

import HomePage from './components/HomePage'
import RegisterCourse from './components/course/RegisterCourse'
import ListOfCourses from './components/course/ListOfCourses'
import CourseDetail from './components/course/CourseDetail'
import RegisterStudent from './components/student/RegisterStudent'
import ListOfStudents from './components/student/ListOfStudents';
import StudentDetail from './components/student/StudentDetail';

export default () => (
    <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/courses" exact component={ListOfCourses} />
        <Route path="/students" exact component={ListOfStudents} />
        <Route path="/courses/register" exact component={RegisterCourse} />
        <Route path="/courses/detail/:id" exact component={CourseDetail} />
        <Route path="/courses/edit/:id" exact component={RegisterCourse} />
        <Route path="/students/register" exact component={RegisterStudent} />
        <Route path="/students/detail/:id" exact component={StudentDetail} />
        <Route path="/students/edit/:id" exact component={RegisterStudent} />
        <Redirect from="*" to="/" />
    </Switch>
)