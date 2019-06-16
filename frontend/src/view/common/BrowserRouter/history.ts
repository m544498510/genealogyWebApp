import {BrowserHistoryBuildOptions, createBrowserHistory, History} from "history";

let _history: History;
export function getHistory(): History {
  return _history;
}

export function createHistory(props?: BrowserHistoryBuildOptions): History {
  _history = createBrowserHistory(props);
  return _history;
}

createHistory();
