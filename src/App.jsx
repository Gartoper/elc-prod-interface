import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import './global.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Layout } from './components/Layout/Layout';
import { Error } from './pages/Error/Error';
import { BroadcastTalents } from './pages/BroadcastTalents/BroadcastTalents';
import { Teams } from './pages/Teams/Teams';
import { Panel } from './pages/Panel/Panel';
import { Home } from './pages/Home/Home';
import { Heros } from './pages/Heros/Heros';
import { Roles } from './pages/Roles/Roles';
import { GameModes } from './pages/GameModes/GameModes';
import { Maps } from './pages/Maps/Maps';
import { Sponsors } from './pages/Sponsors/Sponsors';

export function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="broadcast-talents" element={<BroadcastTalents />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="teams" element={<Teams />} />
          <Route path="heros" element={<Heros />} />
          <Route path="roles" element={<Roles />} />
          <Route path="maps" element={<Maps />} />
          <Route path="game-modes" element={<GameModes />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}
