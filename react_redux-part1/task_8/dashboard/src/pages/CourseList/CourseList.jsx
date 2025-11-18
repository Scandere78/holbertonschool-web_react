import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CourseListRow from "./CourseListRow/CourseListRow";
import WithLogging from "../../components/HOC/WithLogging";
import { fetchCourses } from "../../features/courses/coursesSlice";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  courseList: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem 0',
  },
  table: {
    width: '80%',
    borderCollapse: 'collapse',
  },
});

function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className={css(styles.courseList)}>
      <table id="CourseList" className={css(styles.table)}>
        {courses.length > 0 ? (
          <>
            <thead>
              <CourseListRow isHeader={true} textFirstCell="Available courses" />
              <CourseListRow
                isHeader={true}
                textFirstCell="Course name"
                textSecondCell="Credit"
              />
            </thead>
            <tbody>
              {courses.map((c) => (
                <CourseListRow
                  key={c.id}
                  textFirstCell={c.name}
                  textSecondCell={String(c.credit)}
                />
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <CourseListRow isHeader={true} textFirstCell="No course available yet" />
          </tbody>
        )}
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
