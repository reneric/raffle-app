import React from "react";
import Request from 'request-promise';
import List from './list';

const initialState = {
  value: '',
  list: [],
  chosen: null,
  pending: false,
};

class ListTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ ...initialState, value });
  }


  async getRndInteger(min = 0, max) {
    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
    const r = await Request.get(url);
    return Number(r) || null;
    // return Math.floor(Math.random() * (max - min) ) + min;
  }
  
  listChanged (list) {
    this.setState({ list });
  }

  handleClear (event) {
    this.setState(initialState);
    event.preventDefault();
  }

  setPending () {
    this.setState({ pending: true, chosen: null });
  }

  setRandom (chosen) {
    this.setState({ pending: false, chosen });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setPending();
    const chosen = await this.getRndInteger(1, this.state.list.length - 1);
    this.setRandom(chosen);
  }

  isDisabled () {
    return this.state.list.length <= 2;
  }

  render() {
    return (
      <div className="inner">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <label>
              <textarea value={this.state.value} onChange={this.handleChange} />
              <p className="description">Paste raffle entries in the above textbox then click "Choose Random"</p>
            </label>
            <input disabled={this.isDisabled()} type="submit" value={this.state.pending? 'Choosing...' : 'Choose Random'} />
            <button className="clear" onClick={this.handleClear}>Clear</button>
          </form>
        </div>
        <div className="list">
          <List list={this.state.list}
                pending={this.state.pending}
                value={this.state.value}
                listChanged={this.listChanged.bind(this)}
                chosen={this.state.chosen}
          />
        </div>
      </div>
    );
  }
}

export default ListTextArea;