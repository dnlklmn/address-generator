import * as React from "react";
import { useState, useRef } from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import { capitalizeFirstLetter } from "./helpers/helper";

let ellipsisValue: string = "none";
let chainValue: string = "any";

function App() {
  let [countValue, setCountValue] = useState(24);

  function create() {
    parent.postMessage(
      {
        pluginMessage: {
          type: "create",
          countValue,
          ellipsisValue,
          chainValue,
        },
      },
      "*"
    );
  }

  function regenerate() {
    parent.postMessage(
      {
        pluginMessage: {
          type: "regenerate",
          countValue,
          ellipsisValue,
          chainValue,
        },
      },
      "*"
    );
  }

  function deselectNonText() {
    parent.postMessage(
      {
        pluginMessage: {
          type: "deselect-non-text",
          countValue,
          ellipsisValue,
          chainValue,
        },
      },
      "*"
    );
  }

  function ellipsis(e: any) {
    ellipsisValue = e.target.value;
    parent.postMessage(
      {
        pluginMessage: {
          type: "regenerate",
          countValue,
          ellipsisValue,
          chainValue,
        },
      },
      "*"
    );
  }

  function chain(e: any) {
    chainValue = e.target.value;
    parent.postMessage(
      {
        pluginMessage: {
          type: "regenerate",
          countValue,
          ellipsisValue,
          chainValue,
        },
      },
      "*"
    );
  }

  function count(e: any) {
    setCountValue(e.target.value);
    parent.postMessage(
      {
        pluginMessage: {
          type: "regenerate",
          countValue,
          ellipsisValue,
          chainValue,
        },
      },
      "*"
    );
  }

  const chainOptions: string[] = ["any", "polkadot", "ethereum", "kusama"];
  const ellipsisOptions: string[] = ["none", "start", "center", "end"];

  let chainList = chainOptions.map((network, i) => {
    return (
      <option key={i * Math.random()} value={network.toString()}>
        {capitalizeFirstLetter(network)}
      </option>
    );
  });

  let ellipsisList = ellipsisOptions.map((location, i) => {
    return (
      <option key={i * Math.random()} value={location.toString()}>
        {capitalizeFirstLetter(location)}
      </option>
    );
  });

  let [createVisible, setCreateVisible] = useState(true);

  onmessage = (event) => {
    console.log(event.data[5]);
    if (event[5] === true) {
      setCreateVisible(false);
    }
  };

  return (
    <div style={{ padding: 8 }}>
      <h2>Random Address Generatorrr</h2>
      <div className="form">
        <div className="flex-horizontal">
          <div className="select-wrapper">
            <label htmlFor="chain">Chain</label>
            <select name="chain" id="chain" onChange={(e) => chain(e)}>
              {chainList}
            </select>
          </div>
          <div className="select-wrapper">
            <label htmlFor="ellipsis">Ellipsis</label>
            <select
              name="ellipsis"
              id="ellipsis"
              onChange={function e(e) {
                ellipsis(e);
              }}
            >
              {ellipsisList}
            </select>
          </div>
        </div>
        <div style={{ height: 16, width: 1 }}></div>
        <div>
          <label>Number of characters</label>
          <div style={{ display: "flex" }}>
            <input
              id="countNumber"
              type="number"
              value={countValue}
              step="2"
              style={{ width: "33%" }}
              onChange={(e) => count(e)}
            />
            <div style={{ width: 32 }}></div>
            <input
              className="range"
              id="countRange"
              type="range"
              value={countValue}
              step="2"
              min="0"
              max="48"
              style={{ backgroundColor: "var(--figma-color-background)" }}
              onChange={(e) => count(e)}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignContent: "space-between",
          }}
        >
          <button
            className="secondary"
            id="regenerate"
            onClick={() => regenerate()}
          >
            Regenerate
          </button>
          <button
            style={{ display: createVisible ? "block" : "none" }}
            className="primary"
            id="create"
            onClick={() => create()}
          >
            Create New
          </button>
          <button
            className="primary"
            id="regenerate-all"
            onClick={() => regenerate()}
          >
            Regenerate All
          </button>
          <button
            className="secondary"
            id="deselect-non-text"
            onClick={deselectNonText}
          >
            Deselect Non-Text Objects
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));
