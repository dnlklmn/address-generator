import * as React from "react";
import { useState, useRef } from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import { capitalizeFirstLetter } from "./helpers/helper";

let countValue: any = 24;

let ellipsisValue: any = "none";

function App() {
  let [countDisplay, setCountDisplay] = useState(countValue);
  let [chainValue, setChainValue] = useState();

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

  const handleFocus = (event: any) => event.target.select();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    regenerate();
    e.target.select();
  };
  const handleKeypress = (e: any) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      handleSubmit(e);
    }
  };

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
          ellipsisValue,
          countValue,
          chainValue,
        },
      },
      "*"
    );
  }

  function chain(e: any) {
    setChainValue(e.target.value);
    parent.postMessage(
      {
        pluginMessage: {
          type: "regenerate",
          chainValue,
          countValue,
          ellipsisValue,
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
  let [regenerateVisible, setRegenerateVisible] = useState(false);
  let [regenerateAllVisible, setRegenerateAllVisible] = useState(false);
  let [deselectVisible, setDeselectVisible] = useState(false);

  // 0 ellipsis,
  // 1 numberOfCharacters,
  // 2 node ? 1 : 0,
  // 3 chain,
  // 4 node ? node.type : 0,
  // 5 selectedTextObjects.length,
  // 6 selectedOtherObjects.length,

  onmessage = (event) => {
    setCountDisplay(event.data.pluginMessage[1]);
    (document.getElementById("chain") as HTMLInputElement).value =
      event.data.pluginMessage[3];
    (document.getElementById("ellipsis") as HTMLInputElement).value =
      event.data.pluginMessage[0];
    setChainValue(event.data.pluginMessage[3]);

    // which button to show
    if (event.data.pluginMessage[6] > 0) {
      setCreateVisible(false);
      setRegenerateVisible(false);
      setRegenerateAllVisible(false);
      setDeselectVisible(true);
    }
    if (event.data.pluginMessage[5] >= 2 && event.data.pluginMessage[6] === 0) {
      setCreateVisible(false);
      setRegenerateVisible(false);
      setRegenerateAllVisible(true);
      setDeselectVisible(false);
    }
    if (
      event.data.pluginMessage[5] === 1 &&
      event.data.pluginMessage[6] === 0
    ) {
      setCreateVisible(false);
      setRegenerateVisible(true);
      setRegenerateAllVisible(false);
      setDeselectVisible(false);
    }
    if (
      event.data.pluginMessage[5] === 0 &&
      event.data.pluginMessage[6] === 0
    ) {
      setCreateVisible(true);
      setRegenerateVisible(false);
      setRegenerateAllVisible(false);
      setDeselectVisible(false);
    }
  };

  const selectEll = (
    <select
      name="ellipsis"
      id="ellipsis"
      onChange={function e(e: any) {
        ellipsis(e);
      }}
    >
      {ellipsisList}
    </select>
  );
  const selectChain = (
    <select name="chain" id="chain" onChange={(e) => chain(e)}>
      {chainList}
    </select>
  );

  return (
    <div style={{ padding: 8 }}>
      <h2>Random Address Generatorrr</h2>
      <div className="form">
        <div className="flex-horizontal">
          <div className="select-wrapper">
            <label htmlFor="chain">Chain</label>
            {selectChain}
          </div>
          <div className="select-wrapper">
            <label htmlFor="ellipsis">Ellipsis</label>
            {selectEll}
          </div>
        </div>
        <div style={{ height: 16, width: 1 }}></div>
        <div>
          <label>Number of characters</label>
          <div style={{ display: "flex", height: "auto" }}>
            <button
              style={{ width: "30%", marginTop: 4 }}
              className="secondary"
              id="regenerate"
              onClick={function () {
                countValue = countValue - 1;
                setCountDisplay(countDisplay - 1);
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
              }}
            >
              -
            </button>
            <div style={{ width: 24 }}></div>
            <input
              id="countNumber"
              type="number"
              value={countDisplay}
              step="2"
              style={{ width: "66%" }}
              onKeyDown={handleKeypress}
              onFocus={handleFocus}
              onBlur={function (e) {
                countValue = Number((e.target as HTMLInputElement).value);
                setCountDisplay(Number((e.target as HTMLInputElement).value));
              }}
              onChange={function (e) {
                countValue = Number((e.target as HTMLInputElement).value);
                setCountDisplay(Number((e.target as HTMLInputElement).value));
              }}
            />
            <div style={{ width: 24, height: "100%" }}></div>
            <button
              style={{ width: "30%", marginTop: 4 }}
              className="secondary"
              id="regenerate"
              onClick={function () {
                countValue = countValue + 1;
                setCountDisplay(countDisplay + 1);
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
              }}
            >
              +
            </button>
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
            style={{ display: regenerateVisible ? "block" : "none" }}
            className="secondary"
            id="regenerate"
            onClick={function () {
              handleSubmit;
              regenerate();
            }}
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
            style={{ display: regenerateAllVisible ? "block" : "none" }}
            className="secondary"
            id="regenerate-all"
            onClick={() => regenerate()}
          >
            Regenerate All
          </button>
          <button
            style={{ display: deselectVisible ? "block" : "none" }}
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
