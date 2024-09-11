import s from './style.module.css';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef, React } from 'react';
import { Roster } from '../../components/Roster/Roster';
import { SearchBar } from '../../components/SearchBar/SearchBar';
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

export function Teams() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  const [inputValue6, setInputValue6] = useState('');
  const [inputValue7, setInputValue7] = useState('');
  const [teamArray, setTeamArray] = useState([]);
  const [currentTeamID, setCurrentTeamID] = useState('');
  const [currentTeam, setCurrentTeam] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const searchBarRef = useRef();

  const defaultRosterData = [
    { pseudoPlayer: '', rolePlayer: '', heroPlayer: '', urlPhotoPlayer: '' },
    { pseudoPlayer: '', rolePlayer: '', heroPlayer: '', urlPhotoPlayer: '' },
    { pseudoPlayer: '', rolePlayer: '', heroPlayer: '', urlPhotoPlayer: '' },
    { pseudoPlayer: '', rolePlayer: '', heroPlayer: '', urlPhotoPlayer: '' },
    { pseudoPlayer: '', rolePlayer: '', heroPlayer: '', urlPhotoPlayer: '' },
  ];

  const [rosterData, setRosterData] = useState(defaultRosterData);

  function handleCloseAddModal() {
    setInputValue1('');
    setInputValue2('');
    setInputValue3('');
    setInputValue4('');
    setInputValue5('');
    setInputValue5('');
    setInputValue6('');
    setInputValue7('');
    setRosterData(defaultRosterData);
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
    setTeamDefaultLogo();
  }, [inputValue3]);

  async function fetchData() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/teams/0');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      let sortedTeamArray = Object.values(data);
      sortedTeamArray.sort(function (a, b) {
        return a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : b.name.toLowerCase() > a.name.toLowerCase()
          ? -1
          : 0;
      });
      setTeamArray(sortedTeamArray);
    });
  }

  async function updateData() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/teams/0');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const tmpArray = Object.keys(data).map((objectId) => {
        return {
          ...data[objectId],
          idTeam: objectId,
        };
      });
      let sortedTeamArray = tmpArray;
      sortedTeamArray.sort(function (a, b) {
        return a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : b.name.toLowerCase() > a.name.toLowerCase()
          ? -1
          : 0;
      });
      setTeamArray(sortedTeamArray);
    });
  }

  async function setTeamDefaultLogo() {
    if (inputValue3 === '') {
      await setInputValue3(
        'https://panel.dragonsesport.fr/assets/Overwatch/Logos/Overwatch2.png'
      );
    }
  }

  function saveData(event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      //let empty
    } else {
      const db = getDatabase(app);
      let newDocRef;
      if (showUpdateModal) {
        newDocRef = ref(db, '0/teams/0/' + currentTeamID);
      } else {
        newDocRef = push(ref(db, '0/teams/0'));
      }

      setTeamDefaultLogo();

      if (inputValue1 !== '' && inputValue2 !== '') {
        set(newDocRef, {
          name: inputValue1,
          shortName: inputValue2,
          imgUrl: inputValue3,
          color: inputValue4,
          score: inputValue5,
          palmares: inputValue6,
          commentary: inputValue7,
          players: rosterData,
        })
          .then(() => {
            setInputValue1('');
            setInputValue2('');
            setInputValue3('');
            setInputValue4('');
            setInputValue5('');
            setInputValue6('');
            setInputValue7('');
            setRosterData(defaultRosterData);
            handleCloseUpdateModal();
            toast.success(
              showUpdateModal
                ? 'Equipe modifiée avec succès'
                : 'Equipe ajoutée avec succès'
            );
          })
          .catch((error) => {
            toast.error("Erreur lors de l'ajout de l'équipe: ", error.message);
          });
      }
    }
    handleClearSearchInput();
  }

  async function deleteData(idTeam) {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/teams/0/' + idTeam);
    await remove(dbRef)
      .then(() => {
        toast.success('Equipe supprimée');
      })
      .catch((error) => {
        toast.error(
          "Erreur lors de la suppression de l'équipe: ",
          error.message
        );
      });
    handleClearSearchInput();
  }

  function getSearchedTeams(teams) {
    setTeamArray(teams);
  }

  function handleClearSearchInput() {
    searchBarRef.current.clearSearchInput();
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col />
        <Col xs={10}>
          <h1>Page Equipes</h1>
        </Col>
        <Col />
      </Row>
      <Row className="mb-4">
        <Col xs={4}>
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
            Nouvelle équipe
          </Button>
        </Col>
        <Col xs={3}>
          <SearchBar getSearchedTeams={getSearchedTeams} ref={searchBarRef} />
        </Col>
      </Row>
      <Table className="mt-4" striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: '8%' }}>Nom équipe</th>
            <th style={{ width: '8%' }}>Logo</th>
            <th style={{ width: '18%' }}>Joueurs</th>
            <th style={{ width: '32%' }}>Divers</th>
            <th style={{ width: '12%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamArray.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <img
                  src={item.imgUrl}
                  height={70}
                  width={70}
                  alt={item.name}
                  className="object-fit-contain"
                />
              </td>

              <td className="p-0">
                <Table hover className="mb-0">
                  <tbody>
                    {item.players.map((player, index) => (
                      <tr key={index}>
                        <td>{player.pseudoPlayer}</td>
                        <td>{player.rolePlayer}</td>
                        <td>{player.heroPlayer}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </td>
              <td>
                <Row xs={12} className="mx-2">
                  Couleur: {item.color}
                </Row>
                <Row xs={12} className="mx-2">
                  Abbréviation: {item.shortName}
                </Row>
                <Row xs={12} className="mx-2">
                  Score/Rank: {item.score}
                </Row>
                <Row xs={12} className="mx-2 mt-4 mb-4">
                  Palmarès: {item.palmares}
                </Row>
                <Row xs={12} className="mx-2">
                  Commentaires: {item.commentary}
                </Row>
              </td>
              <td>
                {item.idTeam !== process.env.REACT_APP_ID_TEAM_TBD && (
                  <>
                    <Button
                      className={s.edit_button}
                      variant="warning"
                      onClick={() => {
                        handleShowUpdateModal();
                        setCurrentTeam(item);
                        setCurrentTeamID(item.idTeam);
                        setInputValue1(item.name);
                        setInputValue2(item.shortName);
                        setInputValue3(item.imgUrl);
                        setInputValue4(item.color);
                        setInputValue5(item.score);
                        setInputValue6(item.palmares);
                        setInputValue7(item.commentary);
                        setRosterData(item.players);
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
                        deleteData(item.idTeam);
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
                  </>
                )}
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
        size="xl"
      >
        <Form onSubmit={saveData}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: 'white' }} className="fs-3">
              Ajouter une équipe
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col xs={12}>
              <Row className="mb-4">
                <Form.Group as={Col} md="7">
                  <FloatingLabel label="Nom équipe">
                    <Form.Control
                      type="text"
                      value={inputValue1}
                      required
                      onChange={(e) => setInputValue1(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} md="5">
                  <FloatingLabel label="Nom équipe (short)">
                    <Form.Control
                      type="text"
                      value={inputValue2}
                      required
                      onChange={(e) => setInputValue2(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} md="5">
                  <FloatingLabel label="URL logo">
                    <Form.Control
                      type="text"
                      value={inputValue3}
                      onChange={(e) => setInputValue3(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} md="6">
                  <FloatingLabel label="Couleur équipe" className="mb-3">
                    <Form.Control
                      type="text"
                      value={inputValue4}
                      onChange={(e) => setInputValue4(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <FloatingLabel label="Score/RANK" className="mb-3">
                    <Form.Control
                      type="text"
                      value={inputValue5}
                      onChange={(e) => setInputValue5(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <FloatingLabel label="Palmarès" className="mb-3">
                <Form.Control
                  as="textarea"
                  className={s.textarea_input}
                  value={inputValue6}
                  onChange={(e) => setInputValue6(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel label="Commentaires" className="mb-3">
                <Form.Control
                  as="textarea"
                  className={s.textarea_input}
                  value={inputValue7}
                  onChange={(e) => setInputValue7(e.target.value)}
                />
              </FloatingLabel>
              <Row className="mb-4">
                <Roster rosterData={rosterData} setRosterData={setRosterData} />
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
