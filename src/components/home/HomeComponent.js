import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions/coreActions";

function HomeComponent(props) {

  const { parseJSON, jsonInput } = props;
  const [userInput, setInput] = useState('{}');
  const [expandMapper, toggleNode] = useState({});

  let counter = 1;

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

  const toggleCollapse = (event) => {
    const dataKey = event.target.attributes['data-key-parent'].nodeValue;
    const updateNode = {
      ...expandMapper,
      [`node${dataKey}`]: !expandMapper[`node${dataKey}`]
    }
    toggleNode(updateNode);
  }

  const generateTree = (input, result = [], parent) => {
    for (let key in input) {
      if (input[key] === null || (!Array.isArray(input[key]) && typeof input[key] !== 'object')) {
        result.push(
          <div key={counter} style={{ position: 'relative', marginLeft: '1.5em', padding: '0.25em 0' }}>
            <span className="keyElement">{key}</span> : <span className="valueElement">{String(input[key])}</span>
          </div>
        )
        counter++;
      } else {
        const nestedTree = generateTree({ ...input[key] }, [], key, counter++);
        result.push(nestedTree);
        counter++;
      }
    }
    let wrapParent = null;
    if (parent) {
      wrapParent = (
        <div key={counter} style={{ position: 'relative', marginLeft: '1.5em' }}>
          <span className="objectElement" data-key-parent={counter} onClick={toggleCollapse}>{parent} [{[...result].length}]</span>
          <span className={expandMapper[`node${counter}`] ? 'expand' : 'collapse'}>
            : {([...result])}
          </span>
        </div>
      );
      counter++
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
          {generateTree({ ...jsonInput }, [], null)}
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

