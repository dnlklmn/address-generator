import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";

declare function require(path: string): any;

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [countValue, setCountValue] = React.useState(24);
  const [ellipsisValue, setEllipsisValue] = React.useState("none");
  const [chainValue, setChainValue] = React.useState("any");

  function create() {
    console.log(countValue, ellipsisValue, chainValue);
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

  function regenerateAll() {
    parent.postMessage(
      {
        pluginMessage: {
          type: "regenerate-all",
          countValue,
          ellipsisValue,
          chainValue,
        },
      },
      "*"
    );
  }

  function ellipsis() {
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

  function chain() {
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

  function countRange() {
    const currentCount = inputRef.current?.value;
    // document.getElementById("countNumber").value = currentCount;

    const count = inputRef.current?.value;
    const ellipsis = inputRef.current?.value;
    const chain = inputRef.current?.value;

    parent.postMessage(
      { pluginMessage: { type: "regenerate", count, ellipsis, chain } },
      "*"
    );
  }

  function countNumber() {
    const currentCount = inputRef.current?.value;
    // document.getElementById("countRange").value = currentCount;

    const count = inputRef.current?.value;
    const ellipsis = inputRef.current?.value;
    const chain = inputRef.current?.value;

    parent.postMessage(
      { pluginMessage: { type: "regenerate", count, ellipsis, chain } },
      "*"
    );
  }

  // onmessage = (event) => {
  //   document.getElementById("create").style.display =
  //     event.data.pluginMessage[4] === 0 ? "block" : "none";
  //   document.getElementById("regenerate").style.display =
  //     event.data.pluginMessage[4] === "TEXT" &&
  //     event.data.pluginMessage[5] === 1 &&
  //     event.data.pluginMessage[6] === 0
  //       ? "block"
  //       : "none";

  //   document.getElementById("ellipsis").value =
  //     event.data.pluginMessage[0] && event.data.pluginMessage[6] === 0
  //       ? event.data.pluginMessage[0]
  //       : "none";
  //   document.getElementById("chain").value = event.data.pluginMessage[3]
  //     ? event.data.pluginMessage[3]
  //     : "any";
  //   document.getElementById("countRange").value = event.data.pluginMessage[1]
  //     ? event.data.pluginMessage[1]
  //     : 16;
  //   document.getElementById("countNumber").value = event.data.pluginMessage[1]
  //     ? event.data.pluginMessage[1]
  //     : 16;
  //   document.getElementById("regenerate-all").style.display =
  //     event.data.pluginMessage[5] > 1 && event.data.pluginMessage[6] === 0
  //       ? "block"
  //       : "none";
  //   document.getElementById("deselect-non-text").style.display =
  //     event.data.pluginMessage[6] > 0 ? "block" : "none";
  // };

  return (
    <div style={{ padding: 8 }}>
      <h2>Random Address Generatorrr</h2>
      <div className="form">
        <div className="flex-horizontal">
          <div className="select-wrapper">
            <label htmlFor="chain">Chain</label>
            <select
              name="chain"
              id="chain"
              onChange={(e) => setChainValue(e.target.value)}
            >
              <option value="any">Any</option>
              <option value="ethereum">Ethereum</option>
              <option value="polkadot">Polkadot</option>
              <option value="kusama">Kusama</option>
            </select>
          </div>
          <div className="select-wrapper">
            <label htmlFor="ellipsis">Ellipsis</label>
            <select
              name="ellipsis"
              id="ellipsis"
              onChange={(e) => setEllipsisValue(e.target.value)}
            >
              <option value="none">None</option>
              <option value="center">Center</option>
              <option value="start">Start</option>
              <option value="end">End</option>
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
              onChange={(e) => setCountValue(Number(e.target.value))}
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
              onChange={(e) => setCountValue(Number(e.target.value))}
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
          <button className="secondary" id="regenerate" onClick={regenerate}>
            Regenerate
          </button>
          <button className="primary" id="create" onClick={create}>
            Create New
          </button>
          <button
            className="primary"
            id="regenerate-all"
            onClick={regenerateAll}
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
