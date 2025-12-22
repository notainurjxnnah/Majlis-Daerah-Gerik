import React from 'react';
import './CardBox.css';

const CardBox = ({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  actions,
  noPadding = false,
  noShadow = false,
  noBorder = false,
  hoverable = true,
  size,
  variant,
  bordered = false
}) => {
  const cardClassNames = [
    'card-box',
    className,
    noShadow ? 'no-shadow' : '',
    noBorder ? 'no-border' : '',
    hoverable ? 'hoverable' : '',
    size ? size : '',
    variant ? variant : '',
    bordered ? 'bordered' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClassNames}>
      {(title || actions) && (
        <div className="card-box-header">
          <div className="card-box-title-section">
            {title && <h3 className="card-box-title">{title}</h3>}
            {subtitle && <p className="card-box-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="card-box-actions">{actions}</div>}
        </div>
      )}
      <div className={`card-box-content ${noPadding ? 'no-padding' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default CardBox;
