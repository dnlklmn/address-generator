import { count } from "console";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";

declare function require(path: string): any;

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  let [countValue, setCountValue] = React.useState(24);
  let ellipsisValue: string = "none";
  let chainValue: string = "any";

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

    const count = inputRef.current?.value;
    const ellipsis = inputRef.current?.value;
    const chain = inputRef.current?.value;

    parent.postMessage(
      { pluginMessage: { type: "regenerate", count, ellipsis, chain } },
      "*"
    );
  }

  return (
    <div style={{ padding: 8 }}>
      <h2>Random Address Generatorrr</h2>
      <div className="form">
        <div className="flex-horizontal">
          <div className="select-wrapper">
            <label htmlFor="chain">Chain</label>
            <select name="chain" id="chain" onChange={(e) => chain(e)}>
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
              onChange={function e(e) {
                ellipsis(e);
              }}
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
          <button className="primary" id="create" onClick={() => create()}>
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
