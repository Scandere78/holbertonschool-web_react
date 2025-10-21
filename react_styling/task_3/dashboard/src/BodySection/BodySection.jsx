import React from 'react';
import PropTypes from 'prop-types';

class BodySection extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  render() {
    const { title, children } = this.props;

    return (
      <div className="bodySection p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    );
  }
}

export default BodySection;
