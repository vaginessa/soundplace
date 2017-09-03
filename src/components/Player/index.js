import { h, Component } from 'preact';

import pureSubscribe from 'redux-pure-subscribe';
import pure from '../../util/pure-decorator';
@pure()
export default class Player extends Component {

  state = {
    status: 'paused'
  };

  syncState = (state) => {

  };

  componentDidMount() {
    const audioAPI = document.querySelector('#player');
    const { store } = this.context;
    this.unsubscribe = pureSubscribe(store, this.syncState);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render(props, state) {

    return (
      <div id='player'>
        <h2>This is our temporary player</h2>
        <audio controls>
          <source src="http://verkat.free.fr/files/Guitar%20Hero%20OST%20-%20Complete%20Soundtrack%20By%20Snake/Franz%20Ferdinand%20-%20Take%20Me%20Out.mp3" type="audio/mpeg"/>
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}
