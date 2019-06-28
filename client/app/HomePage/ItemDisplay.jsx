import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ItemForm = styled.form``;

const ItemName = styled.label`
  display: inline-block;
  font-size: 125%;
`;

const NumberRequired = styled.input`
  display: inline-block;
  width: 30px;
  margin-left: 10px;
  transform: scale(1.45);
`;

export default Object.assign(
  ({ item: { name }, count, handleValueChange }) => (
    <ItemForm onSubmit={e => e.preventDefault()}>
      <ItemName>{name}:</ItemName>
      <NumberRequired type="number" value={count} onChange={e => handleValueChange(e, name)} min="0" max="99" />
    </ItemForm>
  ),
  {
    propTypes: {
      item: PropTypes.shape({ name: PropTypes.string }),
      count: PropTypes.number,
      handleValueChange: PropTypes.func,
    },
  }
);
