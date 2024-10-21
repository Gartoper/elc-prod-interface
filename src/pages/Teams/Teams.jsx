import s from './style.module.css';
import { toast } from 'react-toastify';
import React, { useState, useEffect, useRef } from 'react';
import { Roster } from '../../components/Roster/Roster';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
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
  const [teamArray, setTeamArray] = useState(() => {
    const storedTeams = localStorage.getItem('allTeams');
    return storedTeams ? JSON.parse(storedTeams) : [];
  });
  const [currentTeamID, setCurrentTeamID] = useState('');
  const [currentTeam, setCurrentTeam] = useState('');
  const [sponsorArray, setSponsorArray] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage, setTeamsPerPage] = useState(10);
  const searchBarRef = useRef();

  const defaultRosterData = [
    { pseudoPlayer: '', rolePlayer: '', heroPlayer: '', urlPhotoPlayer: '' },
    { pseudoPlayer: '', rolePlayer: '', heroPlayer: '', urlPhotoPlayer: '' },
    { pseudoPlayer: '', rolePlayer: '', heroPlayer: '', urlPhotoPlayer: '' },
    { pseudoPlayer: '', rolePlayer: '', heroPlayer: '', urlPhotoPlayer: '' },
    { pseudoPlayer: '', rolePlayer: '', heroPlayer: '', urlPhotoPlayer: '' },
  ];

  const nothingSponsor = {
    nameSponsor: 'Nothing',
    urlLogoSponsor: 'https://panel.dragonsesport.fr/assets/Nothing.png',
  };

  const [defaultSponsor, setDefaultSponsor] = useState(nothingSponsor);
  const defaultSponsorsData = [
    defaultSponsor,
    defaultSponsor,
    defaultSponsor,
    defaultSponsor,
    defaultSponsor,
  ];

  const [rosterData, setRosterData] = useState(defaultRosterData);
  const [sponsorsData, setSponsorsData] = useState(defaultSponsorsData);

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
    setSponsorsData(defaultSponsorsData);
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

  const CustomSponsorSearchMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [sponsorValue, setSponsorValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Taper le nom du sponsor..."
            onChange={(e) => setSponsorValue(e.target.value.toLowerCase())}
            value={sponsorValue}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !sponsorValue ||
                child.props.children.toLowerCase().includes(sponsorValue)
            )}
          </ul>
        </div>
      );
    }
  );

  useEffect(() => {
    const db = getDatabase();
    const dbSponsorRef = ref(db, '0/sponsors/0');

    onValue(dbSponsorRef, (snapshot) => {
      const data = snapshot.val();
      let sortedSponsorArray = Object.values(data);
      sortedSponsorArray.sort(function (a, b) {
        return a.nameSponsor.toLowerCase() > b.nameSponsor.toLowerCase()
          ? 1
          : b.nameSponsor.toLowerCase() > a.nameSponsor.toLowerCase()
          ? -1
          : 0;
      });
      setSponsorArray(sortedSponsorArray);
    });

    fetchData();
    fetchDefaultSponsorsData();
  }, []);

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    setTeamDefaultLogo();
  }, [inputValue3]);

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeamsOnPage = teamArray.slice(indexOfFirstTeam, indexOfLastTeam);
  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
    setTimeout(() => {
      document
        .getElementById('pageTitle')
        .scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }

  async function fetchDefaultSponsorsData() {
    const db = getDatabase(app);
    const dbRef = ref(
      db,
      '0/sponsors/0/' + process.env.REACT_APP_ID_SPONSOR_NOTHING
    );

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setDefaultSponsor({
        nameSponsor: data.nameSponsor,
        urlLogoSponsor: data.urlLogoSponsor,
      });
    });
  }

  async function fetchData() {
    setAllTeamsInCache();
  }

  async function updateData() {
    setAllTeamsInCache();
  }

  async function setTeamDefaultLogo() {
    if (inputValue3 === '') {
      await setInputValue3(
        'https://panel.dragonsesport.fr/assets/Overwatch/Logos/Overwatch2.png'
      );
    }
  }

  const CustomSponsor1Toggle = React.forwardRef(
    ({ children, onClick }, ref) => (
      <InputGroup>
        <Dropdown.Toggle
          variant="secondary"
          size="lg"
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </Dropdown.Toggle>
        <Button
          variant="outline-danger"
          onClick={() => {
            let data = [...sponsorsData];
            data[0] = {
              nameSponsor: defaultSponsor.nameSponsor,
              urlLogoSponsor: defaultSponsor.urlLogoSponsor,
            };
            setSponsorsData(data);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </Button>
      </InputGroup>
    )
  );

  const CustomSponsor2Toggle = React.forwardRef(
    ({ children, onClick }, ref) => (
      <InputGroup>
        <Dropdown.Toggle
          variant="secondary"
          size="lg"
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </Dropdown.Toggle>
        <Button
          variant="outline-danger"
          onClick={() => {
            let data = [...sponsorsData];
            data[1] = {
              nameSponsor: defaultSponsor.nameSponsor,
              urlLogoSponsor: defaultSponsor.urlLogoSponsor,
            };
            setSponsorsData(data);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </Button>
      </InputGroup>
    )
  );

  const CustomSponsor3Toggle = React.forwardRef(
    ({ children, onClick }, ref) => (
      <InputGroup>
        <Dropdown.Toggle
          variant="secondary"
          size="lg"
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </Dropdown.Toggle>
        <Button
          variant="outline-danger"
          onClick={() => {
            let data = [...sponsorsData];
            data[2] = {
              nameSponsor: defaultSponsor.nameSponsor,
              urlLogoSponsor: defaultSponsor.urlLogoSponsor,
            };
            setSponsorsData(data);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </Button>
      </InputGroup>
    )
  );

  const CustomSponsor4Toggle = React.forwardRef(
    ({ children, onClick }, ref) => (
      <InputGroup>
        <Dropdown.Toggle
          variant="secondary"
          size="lg"
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </Dropdown.Toggle>
        <Button
          variant="outline-danger"
          onClick={() => {
            let data = [...sponsorsData];
            data[3] = {
              nameSponsor: defaultSponsor.nameSponsor,
              urlLogoSponsor: defaultSponsor.urlLogoSponsor,
            };
            setSponsorsData(data);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </Button>
      </InputGroup>
    )
  );

  const CustomSponsor5Toggle = React.forwardRef(
    ({ children, onClick }, ref) => (
      <InputGroup>
        <Dropdown.Toggle
          variant="secondary"
          size="lg"
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </Dropdown.Toggle>
        <Button
          variant="outline-danger"
          onClick={() => {
            let data = [...sponsorsData];
            data[4] = {
              nameSponsor: defaultSponsor.nameSponsor,
              urlLogoSponsor: defaultSponsor.urlLogoSponsor,
            };
            setSponsorsData(data);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </Button>
      </InputGroup>
    )
  );

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
          sponsors: sponsorsData,
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
            setSponsorsData(defaultSponsorsData);
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
    setAllTeamsInCache();
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
    setCurrentPage(1);
  }

  function handleClearSearchInput() {
    searchBarRef.current.clearSearchInput();
  }

  function setAllTeamsInCache() {
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
      localStorage.setItem('allTeams', JSON.stringify(sortedTeamArray));
    });
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col />
        <Col xs={10}>
          <h1 id="pageTitle">Page Equipes</h1>
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
        <Col className="d-flex justify-content-end">
          <Pagination>
            {[...Array(Math.ceil(teamArray.length / teamsPerPage))].map(
              (_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => {
                    paginate(i + 1);
                  }}
                >
                  {i + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </Col>
      </Row>
      <Row>
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
            {currentTeamsOnPage.map((item, index) => (
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
                          setSponsorsData(item.sponsors);
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
      </Row>
      <Row>
        <Col className="d-flex justify-content-start">
          <Pagination>
            {[...Array(Math.ceil(teamArray.length / teamsPerPage))].map(
              (_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => {
                    paginate(i + 1);
                  }}
                >
                  {i + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </Col>
      </Row>
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
            <h1
              style={{ color: 'white', textDecoration: 'underline' }}
              className="mb-3"
            >
              Informations générales
            </h1>
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
                <h1
                  style={{ color: 'white', textDecoration: 'underline' }}
                  className="mt-5"
                >
                  Roster
                </h1>
                <Roster rosterData={rosterData} setRosterData={setRosterData} />
              </Row>
              <Row>
                <Row>
                  <h1
                    style={{ color: 'white', textDecoration: 'underline' }}
                    className="mt-5"
                  >
                    Sponsors
                  </h1>
                </Row>
                <Row className="justify-content-center mt-4">
                  <Col>
                    <ButtonGroup className="d-flex justify-content-center">
                      <Dropdown>
                        <Dropdown.Toggle as={CustomSponsor1Toggle}>
                          {sponsorsData[0].nameSponsor === '' ? (
                            <span className={s.no_sponsor_txt}>
                              Pas de Sponsor #1
                            </span>
                          ) : (
                            <span>{sponsorsData[0].nameSponsor}</span>
                          )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomSponsorSearchMenu}>
                          {sponsorArray.map((item, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                let data = [...sponsorsData];
                                data[0] = {
                                  nameSponsor: item.nameSponsor,
                                  urlLogoSponsor: item.urlLogoSponsor,
                                };
                                setSponsorsData(data);
                              }}
                            >
                              {item.nameSponsor}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                  </Col>
                  <Col>
                    <ButtonGroup className="d-flex justify-content-center">
                      <Dropdown>
                        <Dropdown.Toggle as={CustomSponsor2Toggle}>
                          {sponsorsData[1].nameSponsor === '' ? (
                            <span className={s.no_sponsor_txt}>
                              Pas de Sponsor #2
                            </span>
                          ) : (
                            <span>{sponsorsData[1].nameSponsor}</span>
                          )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomSponsorSearchMenu}>
                          {sponsorArray.map((item, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                let data = [...sponsorsData];
                                data[1] = {
                                  nameSponsor: item.nameSponsor,
                                  urlLogoSponsor: item.urlLogoSponsor,
                                };
                                setSponsorsData(data);
                              }}
                            >
                              {item.nameSponsor}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                  </Col>
                  <Col>
                    <ButtonGroup className="d-flex justify-content-center">
                      <Dropdown>
                        <Dropdown.Toggle as={CustomSponsor3Toggle}>
                          {sponsorsData[2].nameSponsor === '' ? (
                            <span className={s.no_sponsor_txt}>
                              Pas de Sponsor #3
                            </span>
                          ) : (
                            <span>{sponsorsData[2].nameSponsor}</span>
                          )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomSponsorSearchMenu}>
                          {sponsorArray.map((item, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                let data = [...sponsorsData];
                                data[2] = {
                                  nameSponsor: item.nameSponsor,
                                  urlLogoSponsor: item.urlLogoSponsor,
                                };
                                setSponsorsData(data);
                              }}
                            >
                              {item.nameSponsor}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                  </Col>
                  <Col>
                    <ButtonGroup className="d-flex justify-content-center">
                      <Dropdown>
                        <Dropdown.Toggle as={CustomSponsor4Toggle}>
                          {sponsorsData[3].nameSponsor === '' ? (
                            <span className={s.no_sponsor_txt}>
                              Pas de Sponsor #4
                            </span>
                          ) : (
                            <span>{sponsorsData[3].nameSponsor}</span>
                          )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomSponsorSearchMenu}>
                          {sponsorArray.map((item, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                let data = [...sponsorsData];
                                data[3] = {
                                  nameSponsor: item.nameSponsor,
                                  urlLogoSponsor: item.urlLogoSponsor,
                                };
                                setSponsorsData(data);
                              }}
                            >
                              {item.nameSponsor}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                  </Col>
                  <Col>
                    <ButtonGroup className="d-flex justify-content-center">
                      <Dropdown>
                        <Dropdown.Toggle as={CustomSponsor5Toggle}>
                          {sponsorsData[4].nameSponsor === '' ? (
                            <span className={s.no_sponsor_txt}>
                              Pas de Sponsor #5
                            </span>
                          ) : (
                            <span>{sponsorsData[4].nameSponsor}</span>
                          )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomSponsorSearchMenu}>
                          {sponsorArray.map((item, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                let data = [...sponsorsData];
                                data[4] = {
                                  nameSponsor: item.nameSponsor,
                                  urlLogoSponsor: item.urlLogoSponsor,
                                };
                                setSponsorsData(data);
                              }}
                            >
                              {item.nameSponsor}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                  </Col>
                </Row>
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
