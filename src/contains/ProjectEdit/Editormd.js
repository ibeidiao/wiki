import React, { Component } from 'react';
// import $ from 'jquery';

import utils from '@utils/utils';
import Mditor from 'mditor/src/client/index';

// const mditor = null;

class Editormd extends Component {
  componentDidMount() {
    this.mditorInit();
  }

  mditorInit() {
    const textarea = document.getElementById('editor');
    const mditor = Mditor.fromTextarea(textarea);
    mditor.on('ready', () => {
      console.log(mditor.value);
      mditor.value = '** hello **';
      mditor.toolbar.removeItem('help');
      const key = utils.isMac() ? 'command+s' : 'control+s';
      mditor.toolbar.addItem({
        name: 'save',
        title: '保存',
        key,
        handler() {
          console.log(111);
        },
      });
    });
  }

  render() {
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 164px)' }}>
        <textarea id="editor" />
      </div>
    );
  }
}

export default Editormd;
