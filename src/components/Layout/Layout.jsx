import s from './style.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Sidebar } from '../Sidebar/Sidebar';
import { Logo } from '../Logo/Logo';
import logoImg from '../../assets/images/logo-elc.png';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <Container fluid data-bs-theme="dark">
      <Row style={{ height: '100vh' }}>
        <Col xs={2} className={s.sidebar}>
          <Logo image={logoImg} subtitle="Esport Live Central" />
          <Sidebar />
        </Col>
        <Col xs={10} className={s.main_content}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
