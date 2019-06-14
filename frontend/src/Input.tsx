import * as React from 'react';

export default class InputPanel extends React.Component<any, any> {
  private name: string;
  private password: string;

  render() {
    return (
      <div style={{marginTop: 50, textAlign:'center'}}>
        <span>Name: </span> <input type="text" onChange={e => this.name = e.target.value}/>
        <br/>
        <span>Password: </span> <input type="password" onChange={e => this.password = e.target.value}/>
        <br/>

        <div>{JSON.stringify(this.state.createResult)}</div>
      </div>
    )
  }
}
