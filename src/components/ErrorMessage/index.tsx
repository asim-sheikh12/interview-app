import React from 'react';

export const ValidationError = (props: any) => {
  console.log(props);
  return (
    <div
      style={{
        color: 'red',
        fontSize: '11px',
        marginTop: '5px',
      }}
    >
      {props.children}
    </div>
  );
};
