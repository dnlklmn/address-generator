import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
function App() {
    const inputRef = React.useRef(null);
    function create() {
        var _a, _b, _c;
        const count = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value;
        const ellipsis = (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.value;
        const chain = (_c = inputRef.current) === null || _c === void 0 ? void 0 : _c.value;
        parent.postMessage({ pluginMessage: { type: "create", count, ellipsis, chain } }, "*");
    }
    return (React.createElement("div", { style: { padding: 8 } },
        React.createElement("h2", null, "Random Address Generatorrr"),
        React.createElement("div", { className: "form" },
            React.createElement("div", { className: "flex-horizontal" },
                React.createElement("div", { className: "select-wrapper" },
                    React.createElement("label", { htmlFor: "chain" }, "Chain"),
                    React.createElement("select", { name: "chain", id: "chain" },
                        React.createElement("option", { value: "any" }, "Any"),
                        React.createElement("option", { value: "ethereum" }, "Ethereum"),
                        React.createElement("option", { value: "polkadot" }, "Polkadot"),
                        React.createElement("option", { value: "kusama" }, "Kusama"))),
                React.createElement("div", { className: "select-wrapper" },
                    React.createElement("label", { htmlFor: "ellipsis" }, "Ellipsis"),
                    React.createElement("select", { name: "ellipsis", id: "ellipsis" },
                        React.createElement("option", { value: "none" }, "None"),
                        React.createElement("option", { value: "center" }, "Center"),
                        React.createElement("option", { value: "start" }, "Start"),
                        React.createElement("option", { value: "end" }, "End")))),
            React.createElement("div", { style: { height: 16, width: 1 } }),
            React.createElement("div", null,
                React.createElement("label", null, "Number of characters"),
                React.createElement("div", { style: { display: "flex" } },
                    React.createElement("input", { id: "countNumber", type: "number", value: "16", step: "2", style: { width: "33%" } }),
                    React.createElement("div", { style: { width: 32 } }),
                    React.createElement("input", { className: "range", id: "countRange", type: "range", value: "16", step: "2", min: "0", max: "48", style: { backgroundColor: "var(--figma-color-background)" } }))),
            React.createElement("div", { style: {
                    width: "100%",
                    display: "flex",
                    alignContent: "space-between",
                } },
                React.createElement("button", { className: "secondary", id: "regenerate" }, "Regenerate"),
                React.createElement("button", { className: "primary", id: "create", onClick: create }, "Create New"),
                React.createElement("button", { className: "primary", id: "regenerate-all" }, "Regenerate All"),
                React.createElement("button", { className: "secondary", id: "deselect-non-text" }, "Deselect Non-Text Objects")))));
}
ReactDOM.render(React.createElement(App, null), document.getElementById("react-page"));
