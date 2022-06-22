import React from 'react';
import Popup from 'reactjs-popup';
import JSONViewer from 'react-json-viewer';
const Popup_ = (props) => {
  let getContent = () => {
    return (props.content===null || props.content===undefined) ? {"error": "Connection error"}:{status: props.content.status, statusText: props.content.statusText, data: props.content.data}
  }
  return <Popup
    open={props.isOpen}
    onClose={() => props.onClose()}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Result </div>
        <div className="content">
            <JSONViewer
                json={getContent()}
            />
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
              console.log('Popup closed ');
              close();
            }}
          >
            close
          </button>
        </div>
      </div>
    )}
  </Popup>
};

export const PopUp =  Popup_