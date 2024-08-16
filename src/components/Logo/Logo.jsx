import { Link } from 'react-router-dom';
import s from './style.module.css';

export function Logo({ image, title, subtitle }) {
  return (
    <div>
      <div className={s.container}>
        <Link to="/">
          <img className={s.img} src={image} alt="logo" />
        </Link>
        {title && <span className={s.title}>{title}</span>}
      </div>
      {subtitle && <span className={s.subtitle}>{subtitle}</span>}
    </div>
  );
}
