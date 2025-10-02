import React from 'react';

const NotificationItem = ({ type = 'default', html, value }) => {
  // Style inline basé sur le type
  const getStyle = () => {
    if (type === 'urgent') {
      return { color: 'red' };
    }
    return { color: 'blue' };
  };

  // Si html est fourni, utiliser dangerouslySetInnerHTML
  if (html) {
    return (
      <li 
        style={getStyle()}
        data-priority={type}
        data-notification-type={type}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // Sinon, afficher la valeur normalement
  return (
    <li 
      style={getStyle()}
      data-priority={type}
      data-notification-type={type}
    >
      {value}
    </li>
  );
};

export default NotificationItem;