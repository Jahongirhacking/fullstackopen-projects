import React from "react";
import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
