import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";
import { capitalizeFirstLetter } from "./helper";
import { GitHubIcon, AddIcon, MinusIcon } from "./components/icons";

let currentChain = "any";
let currentEllipsis = "none";
let currentCount = 24;

function App() {
  const handleFocus = (event: any) => event.target.select();
  const handleKeypress = (e: any) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
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
    selectElement("countNumber", currentCount);
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
    <div className="page flex-vertical gap-default">
      <div className="form flex-vertical gap-small">
        <div className="flex-horizontal gap-small">
          <div className="select-wrapper">
            <label htmlFor="chain">Chain</label>
            {chainDropdown}
          </div>
          <div className="select-wrapper">
            <label htmlFor="ellipsis">Ellipsis</label>
            {ellipsisDropdown}
          </div>
        </div>
        <div>
          <label>Number of characters</label>
          <div style={{ display: "flex", height: "auto", marginTop: 4 }}>
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
              <MinusIcon fill="var(--figma-color-text-secondary)" size={16} />
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
              <AddIcon fill="var(--figma-color-text-secondary)" size={16} />
            </button>
          </div>
        </div>
      </div>
      {createVisible ? <CreateButton /> : <DeselectButton />}
      <div className="flex-horizontal gap-min" style={{ marginTop: 8 }}>
        <GitHubIcon fill="var(--figma-color-text-brand)" size={16} />
        <a
          href="https://github.com/dnlklmn/address-generator/issues/new"
          target="_blank"
        >
          Feedback & Wishes
        </a>
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
