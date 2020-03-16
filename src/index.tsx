import * as React from "react";
import * as ReactDOM from "react-dom";
import './static/css/base.css';

import { Hello } from "./components/Hello";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React 111" />,
    document.getElementById("example")
);