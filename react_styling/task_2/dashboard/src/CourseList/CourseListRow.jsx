import React from 'react';
import PropTypes from 'prop-types';

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  const backgroundColor = isHeader ? '#deb5b5' : '#CDCDCD';
  const opacity = isHeader ? 0.66 : 0.45;

  const style = {
    backgroundColor,
    opacity,
  };

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr style={style}>
          <th colSpan="2" className="border border-gray-400">{textFirstCell}</th>
        </tr>
      );
    } else {
      return (
        <tr style={style}>
          <th className="border border-gray-400">{textFirstCell}</th>
          <th className="border border-gray-400">{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr style={style}>
        <td className="border border-gray-400 pl-8">{textFirstCell}</td>
        <td className="border border-gray-400 pl-8">{textSecondCell}</td>
      </tr>
    );
  }
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

export default CourseListRow;
