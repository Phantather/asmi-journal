import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface SiteLinkProps {
  title: string;
  path?: string;
  className?: string;
  icon?: ReactNode;
}

export const SiteLink: FC<SiteLinkProps> = ({
  title = '',
  path = '',
  icon = '',
  className = '',
}) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `text-[15px] whitespace-nowrap ${className} ` + (isActive ? 'text-primary' : '')
      }
    >
      {icon}
      {title}
    </NavLink>
  );
};
