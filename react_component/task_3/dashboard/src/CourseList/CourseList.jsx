import React from 'react';
import PropTypes from 'prop-types';

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
      <table>
        <thead>
          <tr>
            <th>Course name</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="2">No course available yet</td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.credit}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
}

export default CourseList;
