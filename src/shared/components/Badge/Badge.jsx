import React from 'react';
import PropTypes from 'prop-types';
import './Badge.css';

/**
 * Badge Component - Display status, category, or label
 * @param {Object} props
 * @param {string} props.variant - Badge style: 'rating', 'age', 'genre', 'success', 'warning', 'error', 'info'
 * @param {React.ReactNode} props.children - Badge content
 * @param {React.ReactNode} props.icon - Optional icon
 * @param {string} props.className - Additional CSS classes
 */
const Badge = ({
  variant = 'genre',
  children,
  icon,
  className = '',
  ...props
}) => {
  const badgeClasses = [
    'badge',
    `badge-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {icon && <span className="badge-icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf(['rating', 'age', 'genre', 'success', 'warning', 'error', 'info']),
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  className: PropTypes.string,
};

export default Badge;
