import * as React from 'react';

export type Props = {
  data: string
};

export default class Test extends React.Component<Props> {
  render() {
      return <div>{this.props.data}</div>
  }
}
