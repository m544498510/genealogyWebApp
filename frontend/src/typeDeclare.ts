export interface Action<T = string>{
  type: T,
  payload?: any
}

export interface CustomWindow extends Window{
  devToolsExtension? : Function
}
