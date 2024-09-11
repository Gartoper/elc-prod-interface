import s from './style.module.css';
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import app from '../../firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';

export const SearchBar = forwardRef(function (props, searchBarRef) {
  const { getSearchedTeams } = props;
  const [search, setSearch] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [allTeams, setAllTeams] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
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
      setAllTeams(sortedTeamArray);
    });
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    setFilteredResults(
      allTeams.filter((team) =>
        team.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    handleResult(filteredResults);
  }, [filteredResults]);

  function handleResult(filteredResults) {
    getSearchedTeams(filteredResults);
  }

  function clearSearchInput() {
    setSearch('');
  }

  useImperativeHandle(searchBarRef, () => ({
    clearSearchInput: clearSearchInput,
  }));

  return (
    <>
      <InputGroup>
        <Form.Control
          placeholder="Search a team..."
          onChange={handleSearchChange}
          value={search}
          id="searchbar-teams"
        />
        {search.length > 0 && (
          <InputGroup.Text
            className={s.clear_searchbar_btn}
            onClick={clearSearchInput}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </InputGroup.Text>
        )}
      </InputGroup>
    </>
  );
});
