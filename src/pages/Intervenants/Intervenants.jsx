import s from './style.module.css';
import { toast } from 'react-toastify';
import { useState, useEffect, React } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
import { Col, Container, Row } from 'react-bootstrap';

export function Intervenants() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [modalInputValue1, setModalInputValue1] = useState('');
  const [modalInputValue2, setModalInputValue2] = useState('');
  const [intervenantArray, setIntervenantArray] = useState([]);
  const [currentIntervenantID, setCurrentIntervenantID] = useState('');
  const [currentIntervenant, setCurrentIntervenant] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  function handleCloseUpdateModal() {
    setShowUpdateModal(false);
  }
  function handleShowUpdateModal() {
    setShowUpdateModal(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateData();
  }, []);

  async function saveData() {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, '0/intervenants/0'));

    if (inputValue1 !== '' && inputValue2 !== '') {
      set(newDocRef, {
        nameIntervenant: inputValue1,
        twitterIntervenant: inputValue2,
      })
        .then(() => {
          setInputValue1('');
          setInputValue2('');
          toast.success('Intervenant ajouté avec succès');
        })
        .catch((error) => {
          toast.error(
            "Erreur lors de l'ajout de l'intervenant: ",
            error.message
          );
        });
    }
  }

  async function fetchData() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/intervenants/0');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setIntervenantArray(Object.values(data));
    });
  }

  async function updateData() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/intervenants/0');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const tmpArray = Object.keys(data).map((objectId) => {
        return {
          ...data[objectId],
          idIntervenant: objectId,
        };
      });

      setIntervenantArray(tmpArray);
    });
  }

  function saveUpdatedData() {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/intervenants/0/' + currentIntervenantID);

    set(newDocRef, {
      nameIntervenant: modalInputValue1,
      twitterIntervenant: modalInputValue2,
    })
      .then(() => {
        toast.success('Intervenant modifié avec succès');
      })
      .catch((error) => {
        toast.error(
          "Erreur lors de la modification de l'intervenant: ",
          error.message
        );
      });
  }

  async function deleteData(idIntervenant) {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/intervenants/0/' + idIntervenant);
    await remove(dbRef)
      .then(() => {
        toast.success('Intervenant supprimé');
      })
      .catch((error) => {
        toast.error(
          "Erreur lors de la suppression de l'intervenant: ",
          error.message
        );
      });
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col />
        <Col xs={10}>
          <h1>Page Intervenants</h1>
        </Col>
        <Col />
      </Row>
      <Row className="mb-4">
        <Col />
        <Col xs={10}>
          <input
            type="text"
            id="intervenantInput1"
            value={inputValue1}
            placeholder="Pseudo"
            required
            onChange={(e) => setInputValue1(e.target.value)}
          />
          <input
            type="text"
            id="intervenantInput2"
            value={inputValue2}
            placeholder="@pseudo"
            required
            onChange={(e) => setInputValue2(e.target.value)}
          />

          <Button variant="primary" onClick={saveData}>
            SAVE DATA
          </Button>
        </Col>
        <Col />
      </Row>
      <Row>
        <Col />
        <Col xs={6}>
          <Table className="mt-4" striped bordered hover>
            <thead>
              <tr>
                <th>Pseudo</th>
                <th>Tag RS</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {intervenantArray.map((item, index) => (
                <tr key={index}>
                  <td>{item.nameIntervenant}</td>
                  <td>{item.twitterIntervenant}</td>
                  <td>
                    <Button
                      className={s.edit_button}
                      variant="warning"
                      onClick={() => {
                        handleShowUpdateModal();
                        setCurrentIntervenant(item);
                        setCurrentIntervenantID(item.idIntervenant);
                        setModalInputValue1(item.nameIntervenant);
                        setModalInputValue2(item.twitterIntervenant);
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
                        deleteData(item.idIntervenant);
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
        </Col>
        <Col />
      </Row>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ID de l'intervenant: {currentIntervenantID}
          <br />
          ---
          <br />
          currentIntervenant.nameIntervenant:{' '}
          {currentIntervenant.nameIntervenant} <br />
          currentIntervenant.twitterIntervenant:{' '}
          {currentIntervenant.twitterIntervenant}
          <input
            type="text"
            id="modalIntervenantInput1"
            value={modalInputValue1}
            onChange={(e) => setModalInputValue1(e.target.value)}
          />
          <input
            type="text"
            id="modalIntervenantInput2"
            value={modalInputValue2}
            onChange={(e) => setModalInputValue2(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (modalInputValue1 !== '' && modalInputValue2 !== '') {
                saveUpdatedData();
                handleCloseUpdateModal();
              }
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
