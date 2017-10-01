import { combineEpics } from 'redux-observable';

import apiEpics from './core/api/api.epics';
import userEpics from './core/user/user.epics';
import routeEpics from './core/router/router.epics';
import windowEpics from './core/window/window.epics.js';
import playlistsEpics from './core/playlists/playlists.epics';
import serviceWorkerEpics from './core/service-worker/service-worker.epics';

import { store } from './main';
import { ERRORS_MAP } from './core/api/api.constants';

const handleUncaughtErrors = (error, stream) => {
  //Loging uncaught errors and returning stream (avoids epics to break)

  console.error('Uncaught', error);
  if (error.xhr) {
    store.dispatch({ type: ERRORS_MAP[error.status], payload: error.xhr.response });
  }
  return stream;
};

export const epics = (action$, store) => combineEpics(
  apiEpics,
  userEpics,
  routeEpics,
  windowEpics,
  playlistsEpics,
  serviceWorkerEpics
)(action$, store)
  .catch(handleUncaughtErrors);
