import s from './style.module.css';
import {
  useState,
  useEffect,
  useRef,
  React,
  useImperativeHandle,
  forwardRef,
} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
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

export const MapPool = forwardRef(function (currentTeam1, refMapPool) {
  const [numberMaps, setNumberMaps] = useState(1);
  const [textPrevCurrentNext, setTextPrevCurrentNext] = useState('');
  const [gamemodeArray, setGamemodeArray] = useState([]);
  const [mapArray, setMapArray] = useState([]);

  const DEFAULT_GAMEMODE = {
    nameGamemode: 'TBD',
    imgUrlGamemode:
      'https://panel.dragonsesport.fr/assets/Overwatch/Map/TBD.png',
  };

  const DEFAULT_MAP = {
    nameMap: 'TBD',
    imgUrlMap: 'https://panel.dragonsesport.fr/assets/Overwatch/Map/TBD.png',
    videoUrlMap: '',
  };

  const DEFAULT_TEAM = {
    nameTeam: 'Draw',
    imgUrlTeam:
      'https://panel.dragonsesport.fr/assets/Overwatch/Logos/Overwatch2.png',
  };

  const DEFAULT_SCORE = {
    scoreTeam1Match: 0,
    scoreTeam2Match: 0,
    displayedScoreMatch: 'VS',
  };

  const defaultMapPoolData = [
    {
      gamemodeMap: DEFAULT_GAMEMODE,
      map: DEFAULT_MAP,
      scoreTeam1Map: 0,
      scoreTeam2Map: 0,
      resultMap: DEFAULT_TEAM,
      isFinishedMap: false,
    },
    {
      gamemodeMap: DEFAULT_GAMEMODE,
      map: DEFAULT_MAP,
      scoreTeam1Map: 0,
      scoreTeam2Map: 0,
      resultMap: DEFAULT_TEAM,
      isFinishedMap: false,
    },
    {
      gamemodeMap: DEFAULT_GAMEMODE,
      map: DEFAULT_MAP,
      scoreTeam1Map: 0,
      scoreTeam2Map: 0,
      resultMap: DEFAULT_TEAM,
      isFinishedMap: false,
    },
    {
      gamemodeMap: DEFAULT_GAMEMODE,
      map: DEFAULT_MAP,
      scoreTeam1Map: 0,
      scoreTeam2Map: 0,
      resultMap: DEFAULT_TEAM,
      isFinishedMap: false,
    },
    {
      gamemodeMap: DEFAULT_GAMEMODE,
      map: DEFAULT_MAP,
      scoreTeam1Map: 0,
      scoreTeam2Map: 0,
      resultMap: DEFAULT_TEAM,
      isFinishedMap: false,
    },
    {
      gamemodeMap: DEFAULT_GAMEMODE,
      map: DEFAULT_MAP,
      scoreTeam1Map: 0,
      scoreTeam2Map: 0,
      resultMap: DEFAULT_TEAM,
      isFinishedMap: false,
    },
    {
      gamemodeMap: DEFAULT_GAMEMODE,
      map: DEFAULT_MAP,
      scoreTeam1Map: 0,
      scoreTeam2Map: 0,
      resultMap: DEFAULT_TEAM,
      isFinishedMap: false,
    },
  ];

  const [mapPoolData, setMapPoolData] = useState(defaultMapPoolData);
  const [actualScore, setActualScore] = useState(DEFAULT_SCORE);
  const [currentlyPlayedMap, setCurrentlyPlayedMap] = useState(undefined);

  function fetchCurrentlyPlayedMap(dbCurrentlyPlayedMapRef) {
    onValue(dbCurrentlyPlayedMapRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentlyPlayedMap(data);
    });
  }

  useEffect(() => {
    if ((currentlyPlayedMap !== undefined && currentlyPlayedMap.name) !== '')
      updateCurrentlyPlayedMap(currentlyPlayedMap);
  }, [currentlyPlayedMap]);

  useEffect(() => {
    const db = getDatabase(app);
    const dbGamemodesRef = ref(db, '0/gamemodes/0');
    const dbMapsRef = ref(db, '0/maps/0');
    const dbMapPoolRef = ref(db, '0/panel/0/mappool');
    const dbScoreMatchRef = ref(db, '0/panel/0/mappool/scoreMatch');
    const dbCurrentlyPlayedMapRef = ref(db, '0/panel/0/currentlyPlayedMap');

    onValue(dbGamemodesRef, (snapshot) => {
      const data = snapshot.val();
      let sortedGammemodeArray = Object.values(data);
      sortedGammemodeArray.sort(function (a, b) {
        return a.nameGamemode.toLowerCase() > b.nameGamemode.toLowerCase()
          ? 1
          : b.nameGamemode.toLowerCase() > a.nameGamemode.toLowerCase()
          ? -1
          : 0;
      });
      setGamemodeArray(sortedGammemodeArray);
    });

    onValue(dbMapsRef, (snapshot) => {
      const data = snapshot.val();
      let sortedMapArray = Object.values(data);
      sortedMapArray.sort(function (a, b) {
        return a.nameMap.toLowerCase() > b.nameMap.toLowerCase()
          ? 1
          : b.nameMap.toLowerCase() > a.nameMap.toLowerCase()
          ? -1
          : 0;
      });
      setMapArray(sortedMapArray);
    });

    fetchMapPoolData(dbMapPoolRef);
    fetchCurrentlyPlayedMap(dbCurrentlyPlayedMapRef);

    onValue(dbScoreMatchRef, (snapshot) => {
      const data = snapshot.val();

      let displayedData = '';
      data.scoreTeam1Match === 0 && data.scoreTeam2Match === 0
        ? (displayedData = 'VS')
        : (displayedData = data.scoreTeam1Match + '-' + data.scoreTeam2Match);

      refScore.current = {
        scoreTeam1Match: data.scoreTeam1Match,
        scoreTeam2Match: data.scoreTeam2Match,
        displayedScoreMatch: displayedData,
      };
    });
  }, []);

  function fetchMapPoolData(dbMapPoolRef) {
    onValue(dbMapPoolRef, async (snapshot) => {
      const data = snapshot.val();
      setMapPoolData(Object.values(data)[0]);
    });
  }

  const refScore = useRef({
    scoreTeam1Match: actualScore.scoreTeam1Match,
    scoreTeam2Match: actualScore.scoreTeam2Match,
    displayedScoreMatch: actualScore.displayedScoreMatch,
  });

  async function saveMapPool(mapPoolData) {
    const db = getDatabase(app);
    const newDocRef = ref(db, '0/panel/0/mappool');

    /*let formatValue = mapPoolData === '' ? '' : mapPoolData.format;
    let numberMapsValue = mapPoolData === '' ? '' : mapPoolData.numberMaps;
    let textPrevCurrentNextValue =
      mapPoolData === '' ? '' : mapPoolData.textPrevCurrentNext;*/
    let mapsDataValue = mapPoolData === '' ? '' : mapPoolData;
    let scoreMatchValue = refScore.current === '' ? '' : refScore.current;

    let mapList = [];
    mapsDataValue.forEach((arrayIteam) => {
      mapList.push(arrayIteam.map.nameMap);
    });
    let mapListValue = mapList.length === 0 ? [] : mapList;

    set(newDocRef, {
      /*format: formatValue,
      numberMaps: numberMapsValue,
      textPrevCurrentNext: textPrevCurrentNextValue,*/
      mapsData: mapsDataValue,
      scoreMatch: scoreMatchValue,
      totalMapPool: mapListValue,
    })
      .then(() => {})
      .catch((error) => {
        console.error(
          'Erreur lors de la modification de données au map pool dans le panel: ',
          error.message
        );
      });
  }

  function updateCurrentlyPlayedMap(map) {
    if (map !== undefined) {
      const db = getDatabase(app);
      const dbCurrentlyPlayedMapRef = ref(db, '0/panel/0/currentlyPlayedMap');

      set(dbCurrentlyPlayedMapRef, {
        name: map.name,
        videoURL: map.videoURL,
      })
        .then(() => {})
        .catch((error) => {
          console.error(
            'Erreur lors de la modification de la map actuellement jouée dans le panel: ',
            error.message
          );
        });
    }
  }

  function handleGamemodeChange(index, itemGamemode) {
    let data = [...mapPoolData];
    data[index].gamemodeMap =
      itemGamemode === '' ? DEFAULT_GAMEMODE : itemGamemode;
  }

  function handleMapChange(index, itemMap) {
    let data = [...mapPoolData];
    data[index].map = itemMap === '' ? DEFAULT_MAP : itemMap;

    handleCurrentlyPlayedMapChange(data);
  }

  function handleIsFinishedChange(index) {
    let data = [...mapPoolData];
    data[index].isFinishedMap = !data[index].isFinishedMap;

    handleMapResultChange(index, data);
    handleCurrentlyPlayedMapChange(data);
  }

  function handleCurrentlyPlayedMapChange(mapPoolData) {
    let lastPlayedMap = mapPoolData.findLastIndex(isLastPlayedMap);

    if (lastPlayedMap + 1 === mapPoolData.length) {
      setCurrentlyPlayedMap({
        name: mapPoolData[mapPoolData.length - 1].map.nameMap,
        videoURL: mapPoolData[mapPoolData.length - 1].map.videoUrlMap,
      });
    } else {
      setCurrentlyPlayedMap({
        name: mapPoolData[lastPlayedMap + 1].map.nameMap,
        videoURL: mapPoolData[lastPlayedMap + 1].map.videoUrlMap,
      });
    }
  }

  function isLastPlayedMap(map) {
    return map.isFinishedMap === true;
  }

  function handleScoreTeam1MapChange(index, event) {
    let data = [...mapPoolData];
    data[index].scoreTeam1Map = Number(event.target.value);

    handleMapResultChange(index, data);
  }

  function handleScoreTeam2MapChange(index, event) {
    let data = [...mapPoolData];
    data[index].scoreTeam2Map = Number(event.target.value);

    handleMapResultChange(index, data);
  }

  function handleMapResultChangeParent(index, data) {
    if (data[index].isFinishedMap === true) {
      if (data[index].scoreTeam1Map > data[index].scoreTeam2Map) {
        data[index].resultMap = {
          nameTeam: currentTeam1.currentTeam1.name,
          imgUrlTeam: currentTeam1.currentTeam1.imgUrl,
        };
      } else if (data[index].scoreTeam1Map < data[index].scoreTeam2Map) {
        data[index].resultMap = {
          nameTeam: currentTeam1.currentTeam2.name,
          imgUrlTeam: currentTeam1.currentTeam2.imgUrl,
        };
      } else if (data[index].scoreTeam1Map === data[index].scoreTeam2Map) {
        data[index].resultMap = DEFAULT_TEAM;
      }
    } else {
      data[index].resultMap = DEFAULT_TEAM;
    }
  }

  function handleMapResultChange(index, data) {
    if (data[index].isFinishedMap === true) {
      if (data[index].scoreTeam1Map > data[index].scoreTeam2Map) {
        data[index].resultMap = {
          nameTeam: currentTeam1.currentTeam1.name,
          imgUrlTeam: currentTeam1.currentTeam1.imgUrl,
        };
      } else if (data[index].scoreTeam1Map < data[index].scoreTeam2Map) {
        data[index].resultMap = {
          nameTeam: currentTeam1.currentTeam2.name,
          imgUrlTeam: currentTeam1.currentTeam2.imgUrl,
        };
      } else if (data[index].scoreTeam1Map === data[index].scoreTeam2Map) {
        data[index].resultMap = DEFAULT_TEAM;
      }
    } else {
      data[index].resultMap = DEFAULT_TEAM;
    }
    handleScoreMatchChange();
  }

  function handleScoreMatchChange() {
    setActualScore(DEFAULT_SCORE);
    mapPoolData.forEach(function (arrayItem) {
      if (
        currentTeam1.currentTeam1.name === arrayItem.resultMap.nameTeam &&
        arrayItem.isFinishedMap === true
      ) {
        actualScore.scoreTeam1Match++;
      } else if (
        currentTeam1.currentTeam2.name === arrayItem.resultMap.nameTeam &&
        arrayItem.isFinishedMap === true
      ) {
        actualScore.scoreTeam2Match++;
      }
    });

    let displayedData = '';
    actualScore.scoreTeam1Match === 0 && actualScore.scoreTeam2Match === 0
      ? (displayedData = 'VS')
      : (displayedData =
          actualScore.scoreTeam1Match + '-' + actualScore.scoreTeam2Match);

    refScore.current = {
      scoreTeam1Match: actualScore.scoreTeam1Match,
      scoreTeam2Match: actualScore.scoreTeam2Match,
      displayedScoreMatch: displayedData,
    };
  }

  function handleTeamMatchChange() {
    mapPoolData.forEach(function (arrayItem, index) {
      if (arrayItem.isFinishedMap === true) {
        if (arrayItem.scoreTeam1Map > arrayItem.scoreTeam2Map) {
          arrayItem.resultMap = {
            nameTeam: currentTeam1.currentTeam1.name,
            imgUrlTeam: currentTeam1.currentTeam1.imgUrl,
          };
        } else if (arrayItem.scoreTeam1Map < arrayItem.scoreTeam2Map) {
          arrayItem.resultMap = {
            nameTeam: currentTeam1.currentTeam2.name,
            imgUrlTeam: currentTeam1.currentTeam2.imgUrl,
          };
        } else if (arrayItem.scoreTeam1Map === arrayItem.scoreTeam2Map) {
          arrayItem.resultMap = DEFAULT_TEAM;
        }
      }
    });

    saveMapPool(mapPoolData);
  }

  useImperativeHandle(refMapPool, () => {
    return {
      handleTeamMatchChange,
    };
  });

  return (
    <>
      <Row className="mt-5">
        <Col />
        <Col xs="11">
          <Table striped bordered>
            <thead>
              <tr>
                <td></td>
                {Object.values(mapPoolData).map((item, index) => (
                  <th scope="col" key={`map-index-${index}`}>
                    Map{index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Select Mode</th>
                {Object.values(mapPoolData).map((itemMapPool, indexMapPool) => (
                  <td>
                    <Form.Select
                      onChange={(e) => {
                        let inputGamemodeName = e.target.value;
                        let gamemodeObject = '';

                        let isFound = false;
                        for (let i = 0; i < gamemodeArray.length; i++) {
                          if (isFound === true) {
                            break;
                          }
                          if (
                            isFound === false &&
                            gamemodeArray[i].nameGamemode === inputGamemodeName
                          ) {
                            gamemodeObject = gamemodeArray[i];
                            isFound = true;
                          }
                        }
                        handleGamemodeChange(indexMapPool, gamemodeObject);
                        setMapPoolData(Object.values(mapPoolData));
                        saveMapPool(Object.values(mapPoolData));
                      }}
                    >
                      <option key="empty-mode"></option>
                      {gamemodeArray.map((itemGamemode, indexGamemode) => (
                        <option
                          key={`gamemode-${indexGamemode}`}
                          selected={
                            Object.values(mapPoolData)[indexMapPool].gamemodeMap
                              .nameGamemode === itemGamemode.nameGamemode
                          }
                        >
                          {itemGamemode.nameGamemode}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row"></th>
                {Object.values(mapPoolData).map((item, index) => (
                  <td key={index}>
                    <img
                      src={
                        Object.values(mapPoolData)[index].gamemodeMap
                          .imgUrlGamemode
                      }
                      alt={`img-${
                        Object.values(mapPoolData)[index].gamemodeMap
                          .nameGamemode
                      }`}
                      height={60}
                      width={60}
                      className="object-fit-contain"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Select Map</th>
                {Object.values(mapPoolData).map((itemMapPool, indexMapPool) => (
                  <td>
                    <Form.Select
                      onChange={(e) => {
                        let inputMapName = e.target.value;
                        let mapObject = '';

                        let isFound = false;
                        for (let i = 0; i < mapArray.length; i++) {
                          if (isFound === true) {
                            break;
                          }
                          if (
                            isFound === false &&
                            mapArray[i].nameMap === inputMapName
                          ) {
                            mapObject = mapArray[i];
                            isFound = true;
                          }
                        }
                        handleMapChange(indexMapPool, mapObject);
                        setMapPoolData(Object.values(mapPoolData));
                        saveMapPool(Object.values(mapPoolData));
                      }}
                    >
                      <option key="empty-map"></option>
                      {mapArray.map((itemMap, indexMap) => (
                        <option
                          key={`map-${indexMap}`}
                          selected={
                            Object.values(mapPoolData)[indexMapPool].map
                              .nameMap === itemMap.nameMap
                          }
                        >
                          {itemMap.nameMap}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row"></th>
                {Object.values(mapPoolData).map((item, index) => (
                  <td key={index}>
                    <img
                      src={Object.values(mapPoolData)[index].map.imgUrlMap}
                      alt={`img-${
                        Object.values(mapPoolData)[index].map.nameMap
                      }`}
                      height={70}
                      width={70}
                      className="object-fit-cover"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row"></th>
                {Object.values(mapPoolData).map((item, index) => (
                  <td key={index}>
                    <span>
                      {Object.values(mapPoolData)[index].resultMap.nameTeam}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row"></th>
                {Object.values(mapPoolData).map((item, index) => (
                  <td key={index}>
                    <img
                      src={
                        Object.values(mapPoolData)[index].resultMap.imgUrlTeam
                      }
                      alt={`winner-${
                        Object.values(mapPoolData)[index].resultMap.nameTeam
                      }`}
                      height={70}
                      width={70}
                      className="object-fit-contain"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Map finished ?</th>
                {Object.values(mapPoolData).map((itemMapPool, indexMapPool) => (
                  <td>
                    <Form.Check
                      ref={refScore}
                      aria-label={`isMap${
                        Object.values(mapPoolData)[indexMapPool].isFinishedMap
                      }finished`}
                      checked={
                        Object.values(mapPoolData)[indexMapPool].isFinishedMap
                      }
                      onClick={() => {
                        handleIsFinishedChange(indexMapPool);
                        setMapPoolData(Object.values(mapPoolData));
                        saveMapPool(Object.values(mapPoolData));
                      }}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col />
      </Row>
      <Row>
        <Col />
        <Col xs="11">
          <Table striped bordered className="mt-5">
            <thead>
              <tr>
                <th>TEAM</th>
                {Object.values(mapPoolData).map((item, index) => (
                  <td key={index}>
                    <img
                      src={
                        Object.values(mapPoolData)[index].gamemodeMap
                          .imgUrlGamemode
                      }
                      alt={`img-${
                        Object.values(mapPoolData)[index].gamemodeMap
                          .nameGamemode
                      }`}
                      height={60}
                      width={60}
                      className="object-fit-contain"
                    />
                  </td>
                ))}
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{currentTeam1.currentTeam1.name}</th>
                {Object.values(mapPoolData).map((itemMapPool, indexMapPool) => (
                  <td>
                    <Form.Control
                      ref={refScore}
                      type="number"
                      value={
                        Object.values(mapPoolData)[indexMapPool].scoreTeam1Map
                      }
                      min={0}
                      onChange={(event) => {
                        handleScoreTeam1MapChange(indexMapPool, event);

                        setMapPoolData(Object.values(mapPoolData));
                        saveMapPool(Object.values(mapPoolData));
                      }}
                    />
                  </td>
                ))}
                <th>{refScore.current.scoreTeam1Match}</th>
              </tr>
              <tr>
                <th scope="row">{currentTeam1.currentTeam2.name}</th>
                {Object.values(mapPoolData).map((itemMapPool, indexMapPool) => (
                  <td>
                    <Form.Control
                      ref={refScore}
                      type="number"
                      value={
                        Object.values(mapPoolData)[indexMapPool].scoreTeam2Map
                      }
                      min={0}
                      onChange={(event) => {
                        handleScoreTeam2MapChange(indexMapPool, event);

                        setMapPoolData(Object.values(mapPoolData));
                        saveMapPool(Object.values(mapPoolData));
                      }}
                    />
                  </td>
                ))}
                <th>{refScore.current.scoreTeam2Match}</th>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col />
      </Row>
    </>
  );
});
