import s from './style.module.css';
import doubleArrowImg from '../../assets/images/double-arrow.png';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { MapPool } from '../../components/MapPool/MapPool';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import DropdownButton from 'react-bootstrap/DropdownButton';
import app from '../../firebaseConfig';
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  child,
  onValue,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';

export function Panel() {
  const [broadcastTalentArray, setBroadcastTalentArray] = useState([]);
  const [formatArray, setFormatArray] = useState([]);
  const [currentHost, setCurrentHost] = useState('');
  const [currentCaster1, setCurrentCaster1] = useState('');
  const [currentCaster2, setCurrentCaster2] = useState('');
  const [currentAnalyst, setCurrentAnalyst] = useState('');
  const [currentInterview1, setCurrentInterview1] = useState('');
  const [currentInterview2, setCurrentInterview2] = useState('');
  const [currentFormat, setCurrentFormat] = useState('');
  const [teamArray, setTeamArray] = useState([]);
  const [currentTeam1, setCurrentTeam1] = useState({});
  const [currentTeam2, setCurrentTeam2] = useState({});
  const [currentTournamentTitle, setCurrentTournamentTitle] = useState('');
  const [currentMapPoolData, setCurrentMapPoolData] = useState([]);
  const [currentlyPlayedMap, setCurrentlyPlayedMap] = useState('');

  const CustomTeamToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Dropdown.Toggle
      variant="dark"
      size="lg"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Dropdown.Toggle>
  ));

  const CustomHostToggle = React.forwardRef(({ children, onClick }, ref) => (
    <InputGroup>
      <Dropdown.Toggle
        variant="dark"
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
          setCurrentHost('');
          saveHost('');
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-x-fill"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"
          />
        </svg>
      </Button>
    </InputGroup>
  ));

  const CustomCaster1Toggle = React.forwardRef(({ children, onClick }, ref) => (
    <InputGroup>
      <Dropdown.Toggle
        variant="dark"
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
          setCurrentCaster1('');
          saveCaster1('');
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-x-fill"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"
          />
        </svg>
      </Button>
    </InputGroup>
  ));

  const CustomCaster2Toggle = React.forwardRef(({ children, onClick }, ref) => (
    <InputGroup>
      <Dropdown.Toggle
        variant="dark"
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
          setCurrentCaster2('');
          saveCaster2('');
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-x-fill"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"
          />
        </svg>
      </Button>
    </InputGroup>
  ));

  const CustomAnalystToggle = React.forwardRef(({ children, onClick }, ref) => (
    <InputGroup>
      <Dropdown.Toggle
        variant="dark"
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
          setCurrentAnalyst('');
          saveAnalyst('');
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-x-fill"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"
          />
        </svg>
      </Button>
    </InputGroup>
  ));

  const CustomInterview1Toggle = React.forwardRef(
    ({ children, onClick }, ref) => (
      <InputGroup>
        <Dropdown.Toggle
          variant="dark"
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
            setCurrentInterview1('');
            saveInterview1('');
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-x-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"
            />
          </svg>
        </Button>
      </InputGroup>
    )
  );

  const CustomInterview2Toggle = React.forwardRef(
    ({ children, onClick }, ref) => (
      <InputGroup>
        <Dropdown.Toggle
          variant="dark"
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
            setCurrentInterview2('');
            saveInterview2('');
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-x-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"
            />
          </svg>
        </Button>
      </InputGroup>
    )
  );

  const CustomTeamSearchMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

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
            placeholder="Taper le nom de l'équipe..."
            onChange={(e) => setValue(e.target.value.toLowerCase())}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().includes(value)
            )}
          </ul>
        </div>
      );
    }
  );

  const CustomBroadcastTalentSearchMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [broadcastTalentValue, setBroadcastTalentValue] = useState('');

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
            placeholder="Taper le nom de l'intervenant..."
            onChange={(e) =>
              setBroadcastTalentValue(e.target.value.toLowerCase())
            }
            value={broadcastTalentValue}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !broadcastTalentValue ||
                child.props.children
                  .toLowerCase()
                  .includes(broadcastTalentValue)
            )}
          </ul>
        </div>
      );
    }
  );

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, '0/broadcastTalents/0');
    const dbFormatRef = ref(db, '0/formats/0');
    const dbScoreMatchRef = ref(db, '0/panel/0/mappool/scoreMatch');
    const dbTournamentTitleRef = ref(db, '0/panel/0/tournamentTitle');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      let sortedBroadcastTalentArray = Object.values(data);
      sortedBroadcastTalentArray.sort(function (a, b) {
        return a.nameBroadcastTalent.toLowerCase() >
          b.nameBroadcastTalent.toLowerCase()
          ? 1
          : b.nameBroadcastTalent.toLowerCase() >
            a.nameBroadcastTalent.toLowerCase()
          ? -1
          : 0;
      });
      setBroadcastTalentArray(sortedBroadcastTalentArray);
    });

    onValue(dbFormatRef, (snapshot) => {
      const data = snapshot.val();
      setFormatArray(Object.values(data));
    });

    onValue(dbScoreMatchRef, (snapshot) => {
      const data = snapshot.val();
      refScore.current = {
        scoreTeam1Match: data.scoreTeam1Match,
        scoreTeam2Match: data.scoreTeam2Match,
      };
    });

    onValue(dbTournamentTitleRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentTournamentTitle(data === null ? '' : Object.values(data)[0]);
    });

    fetchHost();
    fetchCaster1();
    fetchCaster2();
    fetchAnalyst();
    fetchInterview1();
    fetchInterview2();
    fetchFormat();
    fetchTeam1();
    fetchTeam2();
    fetchTournamentTitle();
    fetchCurrentMapPoolData();
    fetchCurrentlyPlayedMap();
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const dbTeamsRef = ref(db, '0/teams/0');

    onValue(dbTeamsRef, (snapshot) => {
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
  }, []);

  const refScore = useRef(null);
  const refMapPool = useRef();
  const refTournamentTitle = useRef(currentTournamentTitle);

  async function fetchHost() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/broadcastTalent/0/host');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentHost(Object.values(data)[0]);
    });
  }

  async function fetchCaster1() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/broadcastTalent/0/caster1');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentCaster1(Object.values(data)[0]);
    });
  }

  async function fetchCaster2() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/broadcastTalent/0/caster2');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentCaster2(Object.values(data)[0]);
    });
  }

  async function fetchAnalyst() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/broadcastTalent/0/analyst');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentAnalyst(Object.values(data)[0]);
    });
  }

  async function fetchInterview1() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/broadcastTalent/0/itw1');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentInterview1(Object.values(data)[0]);
    });
  }

  async function fetchInterview2() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/broadcastTalent/0/itw2');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentInterview2(Object.values(data)[0]);
    });
  }

  async function fetchFormat() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/format');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentFormat(Object.values(data)[1]);
    });
  }

  async function fetchTeam1() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/team1');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentTeam1(data);
    });
  }

  async function fetchTeam2() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/team2');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentTeam2(data);
    });
  }

  async function fetchTournamentTitle() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/tournamentTitle');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentTournamentTitle(data === null ? '' : Object.values(data)[0]);
    });
  }

  async function fetchCurrentMapPoolData() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/mappool');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentMapPoolData(Object.values(data)[0]);
    });
  }

  function fetchCurrentlyPlayedMap() {
    const db = getDatabase(app);
    const dbRef = ref(db, '0/panel/0/currentlyPlayedMap');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) setCurrentlyPlayedMap(Object.values(data)[0]);
    });
  }

  async function saveHost(broadcastTalent) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/broadcastTalent/0/host');

    let pseudoValue =
      broadcastTalent === '' ? '' : broadcastTalent.nameBroadcastTalent;
    let twitterValue =
      broadcastTalent === '' ? '' : broadcastTalent.twitterBroadcastTalent;

    set(newDocRef, {
      pseudo: pseudoValue,
      twitter: twitterValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          "Erreur lors de l'ajout de l'host dans le panel: ",
          error.message
        );
      });
  }

  async function saveCaster1(broadcastTalent) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/broadcastTalent/0/caster1');

    let pseudoValue =
      broadcastTalent === '' ? '' : broadcastTalent.nameBroadcastTalent;
    let twitterValue =
      broadcastTalent === '' ? '' : broadcastTalent.twitterBroadcastTalent;

    set(newDocRef, {
      pseudo: pseudoValue,
      twitter: twitterValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          "Erreur lors de l'ajout du caster1 dans le panel: ",
          error.message
        );
      });
  }

  async function saveCaster2(broadcastTalent) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/broadcastTalent/0/caster2');

    let pseudoValue =
      broadcastTalent === '' ? '' : broadcastTalent.nameBroadcastTalent;
    let twitterValue =
      broadcastTalent === '' ? '' : broadcastTalent.twitterBroadcastTalent;

    set(newDocRef, {
      pseudo: pseudoValue,
      twitter: twitterValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          "Erreur lors de l'ajout du caster2 dans le panel: ",
          error.message
        );
      });
  }

  async function saveAnalyst(broadcastTalent) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/broadcastTalent/0/analyst');

    let pseudoValue =
      broadcastTalent === '' ? '' : broadcastTalent.nameBroadcastTalent;
    let twitterValue =
      broadcastTalent === '' ? '' : broadcastTalent.twitterBroadcastTalent;

    set(newDocRef, {
      pseudo: pseudoValue,
      twitter: twitterValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          "Erreur lors de l'ajout de l'analyste dans le panel: ",
          error.message
        );
      });
  }

  async function saveInterview1(broadcastTalent) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/broadcastTalent/0/itw1');

    let pseudoValue =
      broadcastTalent === '' ? '' : broadcastTalent.nameBroadcastTalent;
    let twitterValue =
      broadcastTalent === '' ? '' : broadcastTalent.twitterBroadcastTalent;

    set(newDocRef, {
      pseudo: pseudoValue,
      twitter: twitterValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          "Erreur lors de l'ajout de itw1 dans le panel: ",
          error.message
        );
      });
  }

  async function saveInterview2(broadcastTalent) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/broadcastTalent/0/itw2');

    let pseudoValue =
      broadcastTalent === '' ? '' : broadcastTalent.nameBroadcastTalent;
    let twitterValue =
      broadcastTalent === '' ? '' : broadcastTalent.twitterBroadcastTalent;

    set(newDocRef, {
      pseudo: pseudoValue,
      twitter: twitterValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          "Erreur lors de l'ajout de itw2 dans le panel: ",
          error.message
        );
      });
  }

  async function saveFormat(format) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/format');

    let valueBO = format === '' ? '' : format.formatBO;
    let valueFT = format === '' ? '' : format.formatFT;

    set(newDocRef, {
      formatBO: valueBO,
      formatFT: valueFT,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          "Erreur lors de l'ajout du format dans le panel: ",
          error.message
        );
      });
  }

  async function saveTeam1(team) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/team1');

    let nameValue = team === '' ? '' : team.name;
    let shortNameValue = team === '' ? '' : team.shortName;
    let imgUrlValue = team === '' ? '' : team.imgUrl;
    let colorValue = team === '' ? '' : team.color;
    let scoreValue = team === '' ? '' : team.score;
    let palmaresValue = team === '' ? '' : team.palmares;
    let commentaryValue = team === '' ? '' : team.commentary;
    let playersValue = team === '' ? [] : team.players;

    set(newDocRef, {
      name: nameValue,
      shortName: shortNameValue,
      imgUrl: imgUrlValue,
      color: colorValue,
      score: scoreValue,
      palmares: palmaresValue,
      commentary: commentaryValue,
      players: playersValue,
    })
      .then(() => {
        refMapPool.current?.handleTeamMatchChange();
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'ajout de team1 dans le panel: ",
          error.message
        );
      });
  }

  async function saveTeam2(team) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/team2');

    let nameValue = team === '' ? '' : team.name;
    let shortNameValue = team === '' ? '' : team.shortName;
    let imgUrlValue = team === '' ? '' : team.imgUrl;
    let colorValue = team === '' ? '' : team.color;
    let scoreValue = team === '' ? '' : team.score;
    let palmaresValue = team === '' ? '' : team.palmares;
    let commentaryValue = team === '' ? '' : team.commentary;
    let playersValue = team === '' ? [] : team.players;

    set(newDocRef, {
      name: nameValue,
      shortName: shortNameValue,
      imgUrl: imgUrlValue,
      color: colorValue,
      score: scoreValue,
      palmares: palmaresValue,
      commentary: commentaryValue,
      players: playersValue,
    })
      .then(() => {
        refMapPool.current?.handleTeamMatchChange();
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'ajout de team2 dans le panel: ",
          error.message
        );
      });
  }

  function saveSwitchTeam1(team) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/team1');

    let nameValue = team === '' ? '' : team.name;
    let shortNameValue = team === '' ? '' : team.shortName;
    let imgUrlValue = team === '' ? '' : team.imgUrl;
    let colorValue = team === '' ? '' : team.color;
    let scoreValue = team === '' ? '' : team.score;
    let palmaresValue = team === '' ? '' : team.palmares;
    let commentaryValue = team === '' ? '' : team.commentary;
    let playersValue = team === '' ? [] : team.players;

    set(newDocRef, {
      name: nameValue,
      shortName: shortNameValue,
      imgUrl: imgUrlValue,
      color: colorValue,
      score: scoreValue,
      palmares: palmaresValue,
      commentary: commentaryValue,
      players: playersValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          'Erreur lors du switch de team1 dans le panel: ',
          error.message
        );
      });
  }

  function saveSwitchTeam2(team) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/team2');

    let nameValue = team === '' ? '' : team.name;
    let shortNameValue = team === '' ? '' : team.shortName;
    let imgUrlValue = team === '' ? '' : team.imgUrl;
    let colorValue = team === '' ? '' : team.color;
    let scoreValue = team === '' ? '' : team.score;
    let palmaresValue = team === '' ? '' : team.palmares;
    let commentaryValue = team === '' ? '' : team.commentary;
    let playersValue = team === '' ? [] : team.players;

    set(newDocRef, {
      name: nameValue,
      shortName: shortNameValue,
      imgUrl: imgUrlValue,
      color: colorValue,
      score: scoreValue,
      palmares: palmaresValue,
      commentary: commentaryValue,
      players: playersValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          'Erreur lors du switch de team2 dans le panel: ',
          error.message
        );
      });
  }

  function saveSwitchMapPoolData(mapPoolData) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/mappool');
    const dbCurrentlyPlayedMapRef = ref(db, '0/panel/0/currentlyPlayedMap');

    onValue(dbCurrentlyPlayedMapRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentlyPlayedMap(Object.values(data)[0]);
    });

    let mapsDataValue = mapPoolData === '' ? '' : mapPoolData;
    let scoreMatchValue = refScore.current === '' ? '' : refScore.current;

    let mapList = [];
    mapsDataValue.forEach((arrayIteam) => {
      mapList.push(arrayIteam.map.nameMap);
    });
    let mapListValue = mapList.length === 0 ? [] : mapList;

    set(newDocRef, {
      mapsData: mapsDataValue,
      scoreMatch: scoreMatchValue,
      totalMapPool: mapListValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          'Erreur lors du switch de map pool dans le panel: ',
          error.message
        );
      });

    set(dbCurrentlyPlayedMapRef, {
      name: currentlyPlayedMap,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          'Erreur lors du switch de map pool dans le panel (map actuellement jouée dans le panel): ',
          error.message
        );
      });
  }

  //fonction utile au final ?
  function handleScoreMatchSwitch() {
    let data = [...currentMapPoolData];
    data.forEach(function (arrayItem, index) {
      if (arrayItem.resultMap.nameTeam === currentTeam1.name) {
        arrayItem.resultMap = {
          nameTeam: currentTeam1.name,
          imgUrlTeam: currentTeam1.imgUrl,
        };
      } else if (arrayItem.resultMap.nameTeam === currentTeam2.name) {
        arrayItem.resultMap = {
          nameTeam: currentTeam2.name,
          imgUrlTeam: currentTeam2.imgUrl,
        };
      }

      let tmpScoreMap = arrayItem.scoreTeam1Map;
      arrayItem.scoreTeam1Map = arrayItem.scoreTeam2Map;
      arrayItem.scoreTeam2Map = tmpScoreMap;
    });
    setCurrentMapPoolData(data);
  }

  function handleSwitchTeams() {
    var tmpTeam = currentTeam1;
    setCurrentTeam1(currentTeam2);
    saveSwitchTeam1(currentTeam2);
    setCurrentTeam2(tmpTeam);
    saveSwitchTeam2(tmpTeam);

    var tmpScore = refScore.current;

    refScore.current = {
      scoreTeam1Match: tmpScore.scoreTeam2Match,
      scoreTeam2Match: tmpScore.scoreTeam1Match,
    };
    handleScoreMatchSwitch();

    saveSwitchMapPoolData(currentMapPoolData);
  }

  function resetPanel() {
    const db = getDatabase(app);
    const broadcastTalentRef = ref(db, '0/panel/0/broadcastTalent/0/');
    const teamsRef = ref(db, '0/teams/0');
    const mappoolRef = ref(db, '0/panel/0/mappool');
    const team1Ref = ref(db, '0/panel/0/team1');
    const team2Ref = ref(db, '0/panel/0/team2');
    const currentlyPlayedMapRef = ref(db, '0/panel/0/currentlyPlayedMap');

    let broadcastTalentEmptyValue = {
      pseudo: '',
      twitter: '',
    };

    let mappoolEmptyValue = [];

    onValue(mappoolRef, (snapshot) => {
      const data = snapshot.val();
      mappoolEmptyValue = data;

      mappoolEmptyValue.mapsData.forEach((arrayItem, index) => {
        mappoolEmptyValue.mapsData[index] = {
          gamemodeMap: {
            imgUrlGamemode:
              'https://panel.dragonsesport.fr/assets/Overwatch/Map/TBD.png',
            nameGamemode: 'TBD',
          },
          isFinishedMap: false,
          map: {
            gamemodeMap: 'Neutre',
            imgUrlMap:
              'https://panel.dragonsesport.fr/assets/Overwatch/Map/TBD.png',
            nameMap: 'TBD',
          },
          resultMap: {
            imgUrlTeam:
              'https://panel.dragonsesport.fr/assets/Overwatch/Logos/Overwatch2.png',
            nameTeam: 'Draw',
          },
          scoreTeam1Map: 0,
          scoreTeam2Map: 0,
        };
      });

      mappoolEmptyValue.scoreMatch = {
        scoreTeam1Match: 0,
        scoreTeam2Match: 0,
      };

      mappoolEmptyValue.totalMapPool.forEach((mapName, index) => {
        mappoolEmptyValue.totalMapPool[index] = 'TBD';
      });
    });

    set(broadcastTalentRef, {
      analyst: broadcastTalentEmptyValue,
      caster1: broadcastTalentEmptyValue,
      caster2: broadcastTalentEmptyValue,
      host: broadcastTalentEmptyValue,
      itw1: broadcastTalentEmptyValue,
      itw2: broadcastTalentEmptyValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          'Erreur lors du reset des broadcastTalent dans le panel: ',
          error.message
        );
      });

    set(mappoolRef, {
      mapsData: mappoolEmptyValue.mapsData,
      scoreMatch: mappoolEmptyValue.scoreMatch,
      totalMapPool: mappoolEmptyValue.totalMapPool,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          'Erreur lors du reset du map pool dans le panel: ',
          error.message
        );
      });

    set(currentlyPlayedMapRef, {
      name: 'TBD',
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          'Erreur lors du reset du map pool dans le panel (map actuellement jouée dans le panel): ',
          error.message
        );
      });

    let teamEmptyValue = {};

    onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();
      let isFound = false;
      for (let i = 0; i < Object.values(data).length; i++) {
        if (isFound === true) {
          break;
        }
        if (isFound === false && Object.values(data)[i].name === 'TBD') {
          teamEmptyValue = Object.values(data)[i];

          isFound = true;
        }
      }
    });

    set(team1Ref, teamEmptyValue)
      .then(() => {})
      .catch((error) => {
        console.error(
          'Erreur lors du reset de team1 dans le panel: ',
          error.message
        );
      });

    set(team2Ref, teamEmptyValue)
      .then(() => {})
      .catch((error) => {
        console.error(
          'Erreur lors du reset de team2 dans le panel: ',
          error.message
        );
      });
  }

  function updatePanel() {
    fetch(process.env.REACT_APP_UPDATE_PANEL_GSHEET_LINK)
      .then((response) => response.text())
      .then((data) => {
        toast.success('Output GSheet updated');
      })
      .catch((error) => {
        toast.error('Error when updating Output GSheet:', error);
      });
  }

  function saveTournamentTitle() {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/tournamentTitle');

    let tournamentTitleValue = refTournamentTitle.current.value;

    set(newDocRef, {
      name: tournamentTitleValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          'Erreur lors de la modification du titre tournoi dans le panel: ',
          error.message
        );
      });
  }

  return (
    <>
      <Row className={s.cast_setup_banner}>
        <Col>
          <Button
            variant="danger"
            className="px-4 fs-5"
            onClick={() => {
              resetPanel();
            }}
          >
            RESET PANEL
          </Button>
          <Button
            variant="success"
            className="px-4 fs-5 ms-3"
            onClick={() => {
              updatePanel();
            }}
          >
            UPDATE
          </Button>
        </Col>
      </Row>
      <Container fluid>
        <Row className="my-3">
          <Row>
            <Col xs={2}>
              <h3 className={s.broadcast_talent_title}>Host</h3>
            </Col>
            <Col xs={2}>
              <h3 className={s.broadcast_talent_title}>Caster #1</h3>
            </Col>
            <Col xs={2}>
              <h3 className={s.broadcast_talent_title}>Caster #2</h3>
            </Col>
            <Col xs={2}>
              <h3 className={s.broadcast_talent_title}>Analyste</h3>
            </Col>
            <Col xs={2}>
              <h3 className={s.broadcast_talent_title}>ITW #1</h3>
            </Col>
            <Col xs={2}>
              <h3 className={s.broadcast_talent_title}>ITW #2</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <ButtonGroup className="d-flex justify-content-center">
                <Dropdown>
                  <Dropdown.Toggle as={CustomHostToggle}>
                    {currentHost === '' ? (
                      <span className={s.no_broadcast_talent_txt}>
                        Pas de Host
                      </span>
                    ) : (
                      <span>{currentHost}</span>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomBroadcastTalentSearchMenu}>
                    {broadcastTalentArray.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setCurrentHost(item.nameBroadcastTalent);
                          saveHost(item);
                        }}
                      >
                        {item.nameBroadcastTalent}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>
            <Col xs={2}>
              <ButtonGroup className="d-flex justify-content-center">
                <Dropdown>
                  <Dropdown.Toggle as={CustomCaster1Toggle}>
                    {currentCaster1 === '' ? (
                      <span className={s.no_broadcast_talent_txt}>
                        Pas de Caster #1
                      </span>
                    ) : (
                      <span>{currentCaster1}</span>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomBroadcastTalentSearchMenu}>
                    {broadcastTalentArray.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setCurrentCaster1(item.nameBroadcastTalent);
                          saveCaster1(item);
                        }}
                      >
                        {item.nameBroadcastTalent}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>
            <Col xs={2}>
              <ButtonGroup className="d-flex justify-content-center">
                <Dropdown>
                  <Dropdown.Toggle as={CustomCaster2Toggle}>
                    {currentCaster2 === '' ? (
                      <span className={s.no_broadcast_talent_txt}>
                        Pas de Caster #2
                      </span>
                    ) : (
                      <span>{currentCaster2}</span>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomBroadcastTalentSearchMenu}>
                    {broadcastTalentArray.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setCurrentCaster2(item.nameBroadcastTalent);
                          saveCaster2(item);
                        }}
                      >
                        {item.nameBroadcastTalent}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>
            <Col xs={2}>
              <ButtonGroup className="d-flex justify-content-center">
                <Dropdown>
                  <Dropdown.Toggle as={CustomAnalystToggle}>
                    {currentAnalyst === '' ? (
                      <span className={s.no_broadcast_talent_txt}>
                        Pas d'Analyste
                      </span>
                    ) : (
                      <span>{currentAnalyst}</span>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomBroadcastTalentSearchMenu}>
                    {broadcastTalentArray.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setCurrentAnalyst(item.nameBroadcastTalent);
                          saveAnalyst(item);
                        }}
                      >
                        {item.nameBroadcastTalent}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>
            <Col xs={2}>
              <ButtonGroup className="d-flex justify-content-center">
                <Dropdown>
                  <Dropdown.Toggle as={CustomInterview1Toggle}>
                    {currentInterview1 === '' ? (
                      <span className={s.no_broadcast_talent_txt}>
                        Pas d'Interviewer #1
                      </span>
                    ) : (
                      <span>{currentInterview1}</span>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomBroadcastTalentSearchMenu}>
                    {broadcastTalentArray.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setCurrentInterview1(item.nameBroadcastTalent);
                          saveInterview1(item);
                        }}
                      >
                        {item.nameBroadcastTalent}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>
            <Col xs={2}>
              <ButtonGroup className="d-flex justify-content-center">
                <Dropdown>
                  <Dropdown.Toggle as={CustomInterview2Toggle}>
                    {currentInterview2 === '' ? (
                      <span className={s.no_broadcast_talent_txt}>
                        Pas d'Interviewer #2
                      </span>
                    ) : (
                      <span>{currentInterview2}</span>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomBroadcastTalentSearchMenu}>
                    {broadcastTalentArray.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setCurrentInterview2(item.nameBroadcastTalent);
                          saveInterview2(item);
                        }}
                      >
                        {item.nameBroadcastTalent}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col>
            <Card style={{ backgroundColor: '#00A2C7' }}>
              <Card.Header>
                <Card.Img
                  variant="top"
                  src={currentTeam1.imgUrl}
                  className="object-fit-contain"
                  height="200px"
                  width="200px"
                />
              </Card.Header>
              <Card.Title>
                {currentTeam1 && (
                  <h3 className={s.card_title_team_name}>
                    {currentTeam1.name}
                  </h3>
                )}
              </Card.Title>
              <Card.Body>
                <Row>
                  <Col xs={3} />
                  <Col xs={6}>
                    <ButtonGroup>
                      <Dropdown>
                        <Dropdown.Toggle as={CustomTeamToggle}>
                          Changer équipe
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomTeamSearchMenu}>
                          {teamArray.map((item, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                console.log(item);
                                setCurrentTeam1(item);
                                saveTeam1(item);
                                console.log(item.name);
                              }}
                            >
                              {item.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                  </Col>
                  <Col xs={3} />
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={5} style={{ backgroundColor: '#10970a' }}>
            <Row>
              <Card className={s.control_panel}>
                <Card.Body>
                  <Row>
                    <Col xs="2" />
                    <Col xs="1">
                      <span>
                        <b className="fs-1">
                          {refScore.current !== null && (
                            <span>{refScore.current.scoreTeam1Match}</span>
                          )}
                        </b>
                      </span>
                    </Col>
                    <Col xs="6">
                      <InputGroup>
                        <DropdownButton
                          variant="light"
                          title="Format"
                          id="segmented-dropdown-button-format"
                        >
                          {formatArray.map((item, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                setCurrentFormat(item.formatFT);
                                saveFormat(item);
                              }}
                            >
                              {item.formatBO}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                        <Form.Control
                          disabled
                          aria-label="Format dropdown button"
                          value={currentFormat}
                        />
                      </InputGroup>
                    </Col>
                    <Col xs="1">
                      <span>
                        <b className="fs-1">
                          {refScore.current !== null && (
                            <span>{refScore.current.scoreTeam2Match}</span>
                          )}
                        </b>
                      </span>
                    </Col>
                    <Col xs="2" />
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <img
                src={doubleArrowImg}
                alt="btn-switch-teams"
                className={s.swap_icon}
                height="200px"
                width="200px"
                onClick={() => {
                  handleSwitchTeams();
                }}
              ></img>
            </Row>
            <Row className="justify-content-center">
              <Col xs="10">
                <Form.Control
                  ref={refTournamentTitle}
                  type="text"
                  defaultValue={currentTournamentTitle}
                  placeholder="Titre tournoi"
                  onChange={(e) => {
                    setCurrentTournamentTitle(e.target.value);
                    saveTournamentTitle();
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Card style={{ backgroundColor: '#b22222' }}>
              <Card.Header>
                <Card.Img
                  variant="top"
                  src={currentTeam2.imgUrl}
                  className="object-fit-contain"
                  height="200px"
                  width="200px"
                />
              </Card.Header>
              <Card.Title>
                {currentTeam2 && (
                  <h3 className={s.card_title_team_name}>
                    {currentTeam2.name}
                  </h3>
                )}
              </Card.Title>
              <Card.Body>
                <Row>
                  <Col xs={3} />
                  <Col xs={6}>
                    <ButtonGroup>
                      <Dropdown>
                        <Dropdown.Toggle as={CustomTeamToggle}>
                          Changer équipe
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomTeamSearchMenu}>
                          {teamArray.map((item, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                console.log(item);
                                setCurrentTeam2(item);
                                saveTeam2(item);
                                console.log(item.name);
                              }}
                            >
                              {item.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                  </Col>
                  <Col xs={3} />
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <MapPool
            ref={refMapPool}
            forwardedRef={refScore}
            currentTeam1={currentTeam1}
            currentTeam2={currentTeam2}
          />
        </Row>
      </Container>
    </>
  );
}
