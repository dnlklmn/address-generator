import * as React from "react";
import { useState, useRef } from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";
import { capitalizeFirstLetter } from "./helpers/helper";
import { count } from "console";

let currentChain = "any";
let currentEllipsis = "none";
let currentCount = 24;

function App() {
  const handleFocus = (event: any) => event.target.select();
  const handleSubmit = () => {};
  const handleKeypress = (e: any) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      handleSubmit();
    }
  };

  //dropdown items
  const chainOptions: string[] = ["any", "polkadot", "ethereum", "kusama"];
  const ellipsisOptions: string[] = ["none", "start", "center", "end"];

  let chainList = chainOptions.map((network, i) => {
    return (
      <option value={network} key={i * Math.random()}>
        {capitalizeFirstLetter(network)}
      </option>
    );
  });

  let ellipsisList = ellipsisOptions.map((location, i) => {
    return (
      <option value={location} key={i * Math.random()}>
        {capitalizeFirstLetter(location)}
      </option>
    );
  });

  let [countDisplay, setCountdisplay] = useState(currentCount);
  let [buttonCreate, setButtonCreate] = useState("create");
  let [createVisible, setCreateVisible] = useState(true);

  // update dropdowns  - used on incoming message
  function selectElement(id: any, valueToSelect: any) {
    (document.getElementById(id) as HTMLInputElement).value = valueToSelect;
  }

  // 0 firstLetter
  // 1 numberOfObjectsSelected
  // 2 selectedTextObjects,
  // 3 selectedOtherObjects,
  // 4 ellipsis,
  // 5 numberOfCharacters,

  // on incoming message
  onmessage = (event) => {
    // check prefixes
    currentCount = event.data.pluginMessage.numberOfCharacters;
    setCountdisplay(event.data.pluginMessage.numberOfCharacters);

    // set dropdowns
    currentEllipsis = event.data.pluginMessage.ellipsis;
    currentChain = event.data.pluginMessage.chain;

    // set button visibility
    if (event.data.pluginMessage.numberOfObjectsSelected > 0) {
      setButtonCreate("regenerate");
    }
    if (event.data.pluginMessage.numberOfObjectsSelected === 0) {
      setButtonCreate("create");
      currentChain = "any";
      currentEllipsis = "none";
    }
    if (event.data.pluginMessage.selectedOtherObjects.length > 0) {
      setCreateVisible(false);
    }
    if (event.data.pluginMessage.selectedOtherObjects.length === 0) {
      setCreateVisible(true);
    }

    selectElement("chain", currentChain);
    selectElement("ellipsis", currentEllipsis);
  };

  // buttons
  const CreateButton = () => (
    <button
      className="primary"
      id="create"
      onClick={() => {
        parent.postMessage(
          {
            pluginMessage: {
              type: buttonCreate === "create" ? "create" : "regenerate",
              currentChain: currentChain,
              currentEllipsis: currentEllipsis,
              currentCount: currentCount,
            },
          },
          "*"
        );
      }}
    >
      {buttonCreate === "create" ? "Create New" : "Regenerate"}
    </button>
  );

  const DeselectButton = () => (
    <button
      className="secondary"
      id="deselect-non-text"
      onClick={() => {
        parent.postMessage(
          {
            pluginMessage: {
              type: "deselect-non-text",
              currentChain: currentChain,
              currentEllipsis: currentEllipsis,
              currentCount: currentCount,
            },
          },
          "*"
        );
      }}
    >
      Deselect Non-Text Objects
    </button>
  );

  // dropdowns should not rerender on state update (changing # of characters)
  const chainDropdown = React.useMemo(
    () => (
      <select
        id="chain"
        onChange={function () {
          currentChain = (event.target as HTMLInputElement).value;
          parent.postMessage(
            {
              pluginMessage: {
                type: "regenerate",
                currentChain: currentChain,
                currentEllipsis: currentEllipsis,
                currentCount: currentCount,
              },
            },
            "*"
          );
        }}
      >
        {chainList}
      </select>
    ),
    []
  );

  const ellipsisDropdown = React.useMemo(
    () => (
      <select
        id="ellipsis"
        onChange={function () {
          currentEllipsis = (event.target as HTMLInputElement).value;
          parent.postMessage(
            {
              pluginMessage: {
                type: "regenerate",
                currentChain: currentChain,
                currentEllipsis: currentEllipsis,
                currentCount: currentCount,
              },
            },
            "*"
          );
        }}
      >
        {ellipsisList}
      </select>
    ),
    []
  );

  return (
    <div style={{ padding: 8 }}>
      <h2>Random Address Generatorrr</h2>
      <div className="form">
        <div className="flex-horizontal">
          <div className="select-wrapper">
            <label htmlFor="chain">Chain</label>
            {chainDropdown}
          </div>
          <div className="select-wrapper">
            <label htmlFor="ellipsis">Ellipsis</label>
            {ellipsisDropdown}
          </div>
        </div>
        <div style={{ height: 16, width: 1 }}></div>
        <div>
          <label>Number of characters</label>
          <div style={{ display: "flex", height: "auto" }}>
            <button
              style={{ width: "30%", marginTop: 4 }}
              className="secondary"
              onClick={function () {
                currentCount = currentCount - 2;
                setCountdisplay(countDisplay - 2);
                parent.postMessage(
                  {
                    pluginMessage: {
                      type: "regenerate",
                      currentChain: currentChain,
                      currentEllipsis: currentEllipsis,
                      currentCount: currentCount,
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
              step="2"
              style={{ width: "66%" }}
              value={countDisplay}
              onKeyDown={handleKeypress}
              onFocus={handleFocus}
              onChange={function () {
                currentCount = Number((event.target as HTMLInputElement).value);
                setCountdisplay(
                  Number((event.target as HTMLInputElement).value)
                );
              }}
            />
            <div style={{ width: 24, height: "100%" }}></div>
            <button
              style={{ width: "30%", marginTop: 4 }}
              className="secondary"
              onClick={function () {
                currentCount = currentCount + 2;
                console.log("current", currentCount);
                setCountdisplay(countDisplay + 2);
                parent.postMessage(
                  {
                    pluginMessage: {
                      type: "regenerate",
                      currentChain: currentChain,
                      currentEllipsis: currentEllipsis,
                      currentCount: currentCount,
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
          {createVisible ? <CreateButton /> : <DeselectButton />}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("react-page"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
