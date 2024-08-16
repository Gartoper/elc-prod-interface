import s from './style.module.css';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function Home() {
  return (
    <>
      <Container fluid>
        <Row className="mt-5">
          <Col />
          <Col xs={10} className="d-flex justify-content-center mt-5">
            <h1>Sélectionnez votre jeu</h1>
          </Col>
          <Col />
        </Row>
        <Row className="mt-5">
          <Col xs={1} />
          <Col xs={4}>
            <Card className={s.overwatch2_card}>
              <NavLink to="/panel" className="text-decoration-none">
                <Card.Img
                  variant="top"
                  src="https://panel.dragonsesport.fr/assets/Overwatch/Logos/Overwatch2.png"
                  className="object-fit-contain mt-5"
                  height="200px"
                  width="200px"
                />
                <Card.Body>
                  <Card.Text className="d-flex justify-content-center fs-2">
                    Overwatch 2
                  </Card.Text>
                </Card.Body>
              </NavLink>
            </Card>
          </Col>
          <Col xs={2} />
          <Col xs={4}>
            <Card className={s.valorant_card}>
              <Card.Img
                variant="top"
                src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version_%28cropped%29.png?20221109133734"
                className="object-fit-contain mt-5"
                height="200px"
                width="200px"
              />
              <Card.Body>
                <Card.Text className="d-flex justify-content-center fs-2">
                  Valorant
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={1} />
        </Row>
      </Container>
    </>
  );
}
