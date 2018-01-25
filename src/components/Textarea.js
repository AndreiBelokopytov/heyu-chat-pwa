import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Textarea.scss';

function Textarea ({
  className,
  modifier,
  ...other
}) {
  const modifierClasses = modifier.split(' ')
    .map(item => `textarea--${item}`);

  const textareaClass = classnames(
    'textarea',
    className,
    modifierClasses.join(' ')
  );
  return (
    <textarea
      className={textareaClass}
      {...other}
    />
  );
}

Textarea.propTypes = {
  className: PropTypes.string,
  modifier: PropTypes.string
};

export default Textarea;
