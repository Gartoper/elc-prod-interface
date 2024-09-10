import s from './style.module.css';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export function Sidebar() {
  return (
    <ul className={s.list_link}>
      <li>
        <NavLink
          to="/"
          style={({ isActive }) => {
            return {
              color: isActive ? '#da0000' : '#ffffff',
            };
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-house-door-fill me-2 mb-1"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
          </svg>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/teams"
          style={({ isActive }) => {
            return {
              color: isActive ? '#da0000' : '#ffffff',
            };
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-people-fill me-2 mb-1"
            viewBox="0 0 16 16"
          >
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
          </svg>
          Equipes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/broadcast-talents"
          style={({ isActive }) => {
            return {
              color: isActive ? '#da0000' : '#ffffff',
            };
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-patch-check-fill me-2 mb-1"
            viewBox="0 0 16 16"
          >
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
          </svg>
          Intervenants
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/maps"
          style={({ isActive }) => {
            return {
              color: isActive ? '#da0000' : '#ffffff',
            };
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-map-fill me-2 mb-1"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"
            />
          </svg>
          Maps
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/heros"
          style={({ isActive }) => {
            return {
              color: isActive ? '#da0000' : '#ffffff',
            };
          }}
        >
          <svg
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            viewBox="0 0 234 260"
            enableBackground="new 0 0 234 260"
            className="me-2 mb-1"
          >
            <path d="M232.043,157.557L216.22,2l-32.915,51.122c0,0-28.733-21.024-66.301-21.024c-37.577,0-60.744,17.332-60.744,17.332L9.57,2  L1.957,157.557h4.675C11.901,213.818,59.385,258,117,258s105.099-44.182,110.368-100.443H232.043z M47.147,109.233  c2.105-7.719,11.19-11.065,17.794-6.556l35.635,24.35H42.293L47.147,109.233z M169.194,102.677  c6.604-4.508,15.698-1.163,17.803,6.556l4.845,17.794h-58.283L169.194,102.677z M117,238.185c-46.68,0-85.26-35.314-90.447-80.628  h180.893C202.26,202.871,163.68,238.185,117,238.185z M146.646,200.214H90.891v-16.932h55.755V200.214z" />
          </svg>
          Héros
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/roles"
          style={({ isActive }) => {
            return {
              color: isActive ? '#da0000' : '#ffffff',
            };
          }}
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            className="me-2 mb-1"
          >
            <path d="m2.75 9.25 1.5 2.5 2 1.5m-4.5 0 1 1m1.5-2.5-1.5 1.5m3-1 8.5-8.5v-2h-2l-8.5 8.5" />
            <path d="m10.25 12.25-2.25-2.25m2-2 2.25 2.25m1-1-1.5 2.5-2 1.5m4.5 0-1 1m-1.5-2.5 1.5 1.5m-7.25-5.25-4.25-4.25v-2h2l4.25 4.25" />
          </svg>
          Rôles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/panel"
          style={({ isActive }) => {
            return {
              color: isActive ? '#da0000' : '#ffffff',
            };
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-tv me-2 mb-1"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5M13.991 3l.024.001a1.5 1.5 0 0 1 .538.143.76.76 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.5 1.5 0 0 1-.143.538.76.76 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.5 1.5 0 0 1-.538-.143.76.76 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.5 1.5 0 0 1 .143-.538.76.76 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2" />
          </svg>
          Panel
        </NavLink>
      </li>
      <li>
        <a
          href="https://elc-prod-interface-default-rtdb.europe-west1.firebasedatabase.app/0/panel.json"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="me-2 mb-1"
          >
            <g id="System / Data">
              <path
                d="M18 12V17C18 18.6569 15.3137 20 12 20C8.68629 20 6 18.6569 6 17V12M18 12V7M18 12C18 13.6569 15.3137 15 12 15C8.68629 15 6 13.6569 6 12M18 7C18 5.34315 15.3137 4 12 4C8.68629 4 6 5.34315 6 7M18 7C18 8.65685 15.3137 10 12 10C8.68629 10 6 8.65685 6 7M6 12V7"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          API Panel{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12px"
            height="12px"
            fill="currentColor"
            className="bi bi-box-arrow-up-right ms-2 mb-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
            />
            <path
              fillRule="evenodd"
              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
            />
          </svg>
        </a>
      </li>
      <li>
        <a
          href="https://vdo.ninja/?director=EsportLiveCentral&password=Production07092024"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="me-2 mb-1"
          >
            <g id="System / Data">
              <path
                d="M18 12V17C18 18.6569 15.3137 20 12 20C8.68629 20 6 18.6569 6 17V12M18 12V7M18 12C18 13.6569 15.3137 15 12 15C8.68629 15 6 13.6569 6 12M18 7C18 5.34315 15.3137 4 12 4C8.68629 4 6 5.34315 6 7M18 7C18 8.65685 15.3137 10 12 10C8.68629 10 6 8.65685 6 7M6 12V7"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          VDO Ninja{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12px"
            height="12px"
            fill="currentColor"
            className="bi bi-box-arrow-up-right ms-2 mb-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
            />
            <path
              fillRule="evenodd"
              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
            />
          </svg>
        </a>
      </li>
      <li>
        <a
          href="https://panel.dragonsesport.fr/assets/Overwatch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="me-2 mb-1"
          >
            <g id="System / Data">
              <path
                d="M18 12V17C18 18.6569 15.3137 20 12 20C8.68629 20 6 18.6569 6 17V12M18 12V7M18 12C18 13.6569 15.3137 15 12 15C8.68629 15 6 13.6569 6 12M18 7C18 5.34315 15.3137 4 12 4C8.68629 4 6 5.34315 6 7M18 7C18 8.65685 15.3137 10 12 10C8.68629 10 6 8.65685 6 7M6 12V7"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          Assets{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12px"
            height="12px"
            fill="currentColor"
            className="bi bi-box-arrow-up-right ms-2 mb-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
            />
            <path
              fillRule="evenodd"
              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
            />
          </svg>
        </a>
      </li>
      <li>
        {/*<NavLink
          to="/logout"
          className={s.logout_btn}
          style={({ isActive }) => {
            return {
              color: isActive ? '#da0000' : '#ffffff',
            };
          }}
        >
          Logout
        </NavLink>*/}
      </li>
    </ul>
  );
}
