import * as React from "react";

import { Chart } from "./Chart";
import { Header } from "./Header";
import { Table } from "./Table";

const App: React.FC = () => (
    <>
        <Header/>
        <Chart/>
        <Table/>
    </>
);

export default App;
