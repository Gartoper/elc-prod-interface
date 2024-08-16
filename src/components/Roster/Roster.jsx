import s from './style.module.css';
import { useState, useEffect, React } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  child,
  onValue,
} from 'firebase/database';

export function Roster({ rosterData, setRosterData }) {
  const [roleArray, setRoleArray] = useState([]);
  const [heroArray, setHeroArray] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const dbRolesRef = ref(db, '0/roles/0');
    const dbHerosRef = ref(db, '0/heros/0');

    onValue(dbRolesRef, (snapshot) => {
      const data = snapshot.val();
      setRoleArray(Object.values(data));
    });

    onValue(dbHerosRef, (snapshot) => {
      const data = snapshot.val();
      setHeroArray(Object.values(data));
    });
  }, []);

  function handleFormChange(event, index) {
    let data = [...rosterData];
    data[index][event.target.name] = event.target.value;
    setRosterData(data);
  }

  function addFields() {
    let object = {
      pseudoPlayer: '',
      rolePlayer: '',
      heroPlayer: '',
      urlPhotoPlayer: '',
    };
    setRosterData([...rosterData, object]);
  }

  function removeFields(index) {
    console.log(rosterData.length);
    if (rosterData.length >= 2) {
      let data = [...rosterData];
      data.splice(index, 1);
      setRosterData(data);
    }
  }

  return (
    <>
      {rosterData.map((player, index) => {
        return (
          <Card body key={index}>
            <h4>Joueur {index + 1}</h4>
            <Row>
              <Form.Group as={Col} md="2">
                <Form.Control
                  type="text"
                  name="pseudoPlayer"
                  placeholder="Pseudo"
                  onChange={(event) => handleFormChange(event, index)}
                  value={player.pseudoPlayer}
                />
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Select
                  name="rolePlayer"
                  onChange={(event) => {
                    console.log(event.target.value);
                    handleFormChange(event, index);
                  }}
                >
                  <option
                    hidden
                    value
                    key="empty-role"
                    selected={player.rolePlayer === ''}
                  >
                    Rôle
                  </option>
                  {roleArray.map((item, index) => (
                    <option
                      key={index}
                      selected={player.rolePlayer === item.nameRole}
                      value={item.nameRole}
                    >
                      {item.nameRole}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Select
                  name="heroPlayer"
                  onChange={(event) => {
                    console.log(event.target.value);
                    console.log(heroArray);
                    handleFormChange(event, index);
                  }}
                >
                  <option
                    hidden
                    value
                    key="empty-host"
                    selected={player.heroPlayer === ''}
                  >
                    Héro
                  </option>
                  {heroArray.map((item, index) => (
                    <option
                      key={index}
                      selected={player.heroPlayer === item.nameHero}
                      value={item.nameHero}
                    >
                      {item.nameHero}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {/*<Form.Group as={Col} md="2">
                <Form.Control
                  type="text"
                  placeholder="Héro"
                  value={player.heroPlayer}
                />
              </Form.Group>*/}
              <Form.Group as={Col} md="3">
                <Form.Control
                  type="text"
                  name="urlPhotoPlayer"
                  placeholder="URL Photo"
                  onChange={(event) => handleFormChange(event, index)}
                  value={player.urlPhotoPlayer}
                />
              </Form.Group>
              <Form.Group as={Col} md="1">
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => removeFields(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </Button>
              </Form.Group>
            </Row>
          </Card>
        );
      })}
      <Row>
        <Col />
        <Col className="mt-4" md={3}>
          <Button variant="primary" onClick={addFields}>
            Ajouter un autre joueur
          </Button>
        </Col>
        <Col />
      </Row>
    </>
  );
}
