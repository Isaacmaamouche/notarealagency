import React from 'react';

export default class MyComponent extends React.Component {
  displayAlert() {
    alert(`L'alerte a été déclenchée`)
  }

  render() {
    return (
      <div>
        <button onClick={() => this.displayAlert()}>👉 Cliquer ici 👈</button>
      </div>
    )
  }
}