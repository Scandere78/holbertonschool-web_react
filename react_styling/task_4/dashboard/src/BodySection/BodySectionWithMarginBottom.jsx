import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';

class BodySectionWithMarginBottom extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  render() {
    const { title, children } = this.props;

    return (
      <div className="bodySectionWithMargin mb-8">
        <BodySection title={title}>
          {children}
        </BodySection>
      </div>
    );
  }
}

export default BodySectionWithMarginBottom;
