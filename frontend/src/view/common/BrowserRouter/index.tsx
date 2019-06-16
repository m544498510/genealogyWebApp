import * as React from 'react';
import {Router} from 'react-router-dom';
import { ReactNode} from "react";
import {getHistory} from "./history";

export * from './history';

export interface BrowserRouterProps {
  children: ReactNode
}

export default function BrowserRouter(props: BrowserRouterProps) {
  return (
    <Router
      history={getHistory()}
    >
      {props.children}
    </Router>
  );
}
