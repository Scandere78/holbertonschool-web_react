import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';

class CourseList extends React.Component {
  static propTypes = {
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        credit: PropTypes.number.isRequired,
      })
    ),
  };

  static defaultProps = {
    courses: [],
  };

  render() {
    const { courses } = this.props;

    return (
      <div className="w-[80%] lg:w-[90%] mx-auto my-8">
        <table className="w-full">
          <thead>
            <CourseListRow isHeader={true} textFirstCell="Available courses" />
            <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <CourseListRow isHeader={false} textFirstCell="No course available yet" />
            ) : (
              courses.map((course) => (
                <CourseListRow
                  key={course.id}
                  isHeader={false}
                  textFirstCell={course.name}
                  textSecondCell={course.credit}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CourseList;
