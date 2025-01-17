import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '../Layout/Button';
import defer from './defer';

function FormButton(props) {
  const { disabled, mounted, ...others } = props;
  return (
    <Button
      disabled={!mounted || !!disabled}
      type="submit"
      variant="contained"
      {...others}
    />
  );
}

FormButton.propTypes = {
  disabled: PropTypes.bool,
  mounted: PropTypes.bool,
};

export default defer(FormButton);