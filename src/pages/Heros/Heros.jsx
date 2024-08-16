import s from './style.module.css';
import { toast } from 'react-toastify';
import { useState, useEffect, React } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import app from '../../firebaseConfig';
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from 'firebase/database';

export function Heros() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [heroArray, setHeroArray] = useState([]);
  const [roleArray, setRoleArray] = useState([]);
  const [currentHeroID, setCurrentHeroID] = useState('');
  const [currentHero, setCurrentHero] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  function handleCloseAddModal() {
    setInputValue1('');
    setInputValue2('');
    setInputValue3('');
    setShowAddModal(false);
  }
  function handleShowAddModal() {
    setShowAddModal(true);
  }

  function handleCloseUpdateModal() {
    setShowUpdateModal(false);
    handleCloseAddModal();
  }

  function handleShowUpdateModal() {
    setShowUpdateModal(true);
    handleShowAddModal();
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    setHeroDefaultLogo();
  }, [inputValue3]);

  useEffect(() => {
    const db = getDatabase();
    const dbRolesRef = ref(db, '0/roles/0');

    onValue(dbRolesRef, (snapshot) => {
      const data = snapshot.val();
      setRoleArray(Object.values(data));
    });
  }, []);

  async function fetchData() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/heros/0');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setHeroArray(Object.values(data));
    });
  }

  async function updateData() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/heros/0');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const tmpArray = Object.keys(data).map((objectId) => {
        return {
          ...data[objectId],
          idHero: objectId,
        };
      });

      setHeroArray(tmpArray);
    });
  }

  async function setHeroDefaultLogo() {
    if (inputValue3 === '') {
      await setInputValue3(
        'https://panel.dragonsesport.fr/assets/Overwatch/Hero/Hero.png'
      );
    }
  }

  function saveData(event) {
    console.log(inputValue1);
    console.log(inputValue2);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      //let empty
    } else {
      const db = getDatabase(app);
      let newDocRef;
      if (showUpdateModal) {
        newDocRef = ref(db, '0/heros/0/' + currentHeroID);
      } else {
        newDocRef = push(ref(db, '0/heros/0'));
      }

      setHeroDefaultLogo();

      if (inputValue1 !== '' && inputValue2 !== '') {
        set(newDocRef, {
          nameHero: inputValue1,
          roleHero: inputValue2,
          imgUrlHero: inputValue3,
        })
          .then(() => {
            setInputValue1('');
            setInputValue2('');
            setInputValue3('');
            handleCloseUpdateModal();
            toast.success(
              showUpdateModal
                ? 'Héro modifié avec succès'
                : 'Héro ajouté avec succès'
            );
          })
          .catch((error) => {
            toast.error("Erreur lors de l'ajout du héro: ", error.message);
          });
      }
    }
  }

  async function deleteData(idHero) {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/heros/0/' + idHero);
    await remove(dbRef)
      .then(() => {
        toast.success('Héro supprimé');
      })
      .catch((error) => {
        toast.error('Erreur lors de la suppression du héro: ', error.message);
      });
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col />
        <Col xs={10}>
          <h1>Page Héros</h1>
        </Col>
        <Col />
      </Row>
      <Row className="mb-4">
        <Col xs={2}>
          <Button
            variant="primary"
            onClick={() => {
              handleShowAddModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            Nouveau Héro
          </Button>
        </Col>
        <Col xs={10} />
      </Row>
      <Table className="mt-4" striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nom héro</th>
            <th>Rôle</th>
            <th>Icône</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {heroArray.map((item, index) => (
            <tr key={index}>
              <td>{item.nameHero}</td>
              <td>{item.roleHero}</td>
              <td>
                <img
                  src={item.imgUrlHero}
                  height={80}
                  width={80}
                  alt={item.nameHero}
                  className="object-fit-contain"
                />
              </td>
              <td>
                <Button
                  className={s.edit_button}
                  variant="warning"
                  onClick={() => {
                    handleShowUpdateModal();
                    setCurrentHero(item);
                    setCurrentHeroID(item.idHero);
                    setInputValue1(item.nameHero);
                    setInputValue2(item.roleHero);
                    setInputValue3(item.imgUrlHero);
                  }}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    className={s.edit_icon}
                  >
                    <path
                      id="Shape"
                      d="M.75,17.5A.751.751,0,0,1,0,16.75V12.569a.755.755,0,0,1,.22-.53L11.461.8a2.72,2.72,0,0,1,3.848,0L16.7,2.191a2.72,2.72,0,0,1,0,3.848L5.462,17.28a.747.747,0,0,1-.531.22ZM1.5,12.879V16h3.12l7.91-7.91L9.41,4.97ZM13.591,7.03l2.051-2.051a1.223,1.223,0,0,0,0-1.727L14.249,1.858a1.222,1.222,0,0,0-1.727,0L10.47,3.91Z"
                      transform="translate(3.25 3.25)"
                      fill="#141124"
                    />
                  </svg>
                  <span>Update</span>
                </Button>
                <Button
                  className={s.delete_button}
                  variant="danger"
                  onClick={() => {
                    deleteData(item.idHero);
                  }}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 -0.5 21 21"
                    className={s.delete_icon}
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-179.000000, -360.000000)"
                        fill="#ffffff"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <path
                            d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z"
                            id="delete-[#1487]"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span>Delete</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        data-bs-theme="dark"
        show={showAddModal}
        onHide={() => {
          showUpdateModal ? handleCloseUpdateModal() : handleCloseAddModal();
        }}
        size="lg"
      >
        <Form onSubmit={saveData}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: 'white' }} className="fs-3">
              Ajouter un héro
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col xs={12}>
              <Row className="mb-4">
                <Form.Group as={Col} md="7">
                  <FloatingLabel label="Nom héro">
                    <Form.Control
                      type="text"
                      value={inputValue1}
                      required
                      onChange={(e) => setInputValue1(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} md="5">
                  <Form.Select
                    name="roleHero"
                    onChange={(event) => {
                      setInputValue2(event.target.value);
                    }}
                  >
                    <option
                      hidden
                      value
                      key="empty-role"
                      selected={inputValue2 === ''}
                    >
                      Rôle
                    </option>
                    {roleArray.map((item, index) => (
                      <option
                        key={index}
                        selected={inputValue2 === item.nameRole}
                        value={item.nameRole}
                      >
                        {item.nameRole}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {/*<Form.Group as={Col} md="5">
                  <FloatingLabel label="Rôle héro">
                    <Form.Control
                      type="text"
                      value={inputValue2}
                      required
                      onChange={(e) => setInputValue2(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>*/}
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} md="5">
                  <FloatingLabel label="URL image héro">
                    <Form.Control
                      type="text"
                      value={inputValue3}
                      onChange={(e) => setInputValue3(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                showUpdateModal
                  ? handleCloseUpdateModal()
                  : handleCloseAddModal();
              }}
            >
              Close
            </Button>
            <Button type="submit">Valider</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
