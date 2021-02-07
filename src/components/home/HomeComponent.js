import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions/coreActions";

function HomeComponent(props) {

  const { parseJSON, jsonInput } = props;
  const [userInput, setInput] = useState('{}');

  const updateInput = (event) => {
    setInput(event.target.value);
  }

  const parseJSONInput = () => {
    try {
      parseJSON(JSON.parse(userInput));
    } catch (error) {
      alert('Error in JSON', error.message);
    }
  }

  const generateTree = (input, result = [], parent, index = 0) => {
    for (let key in input) {
      if (input[key] === null || (!Array.isArray(input[key]) && typeof input[key] !== 'object')) {
        result.push(
          <div key={index} style={{ position: 'relative', marginLeft: '1.5em', padding: '0.25em 0' }}>
            <span className="keyElement">{key}</span> : <span className="valueElement">{String(input[key])}</span>
          </div>
        )
        index++;
      } else {
        const nestedTree = generateTree({ ...input[key] }, [], key, index);
        result.push(nestedTree);
      }
    }
    let wrapParent = null;
    if (parent) {
      wrapParent = (
        <div key={index} style={{ position: 'relative', marginLeft: '1.5em' }}>
          <span className="objectElement">{parent} [{[...result].length}]</span> : {([...result])}
        </div>
      );
      index++;
    }
    return wrapParent || result;
  };

  return (
    <div className="columns is-vcentered" style={{ margin: '0 1em' }}>
      <div className="column">
        <textarea className="textarea" value={userInput} onChange={updateInput} placeholder="Paste your JSON string here" rows="20" style={{ resize: "none" }} ></textarea>
      </div>
      <div className="column is-1 has-text-centered">
        <button className="button is-info" onClick={parseJSONInput}>
          Parse
        </button>
      </div>
      <div className="column">
        <div id="outputResult" style={{ height: '32rem', padding: '1em', border: '1px solid #dbdbdb', backgroundColor: '#fff', borderRadius: '4px', color: '#363636', overflow: 'auto' }}>
          {generateTree(jsonInput, [], null)}
        </div>
      </div>
    </div>
  )
}

export default connect(
  (state) => ({
    jsonInput: state.formatter.jsonInput
  }),
  {
    parseJSON: actions.parseJSON
  }
)(HomeComponent)

