import React from "react";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      list: [],
      chosen: null,
      pending: false,
      listClass: '',
    };
  }

  valueChanged (prev) {
    const newValue = this.props.value.split(/\r?\n/).filter(l => l);

    if (this.props.value !== prev) {
      this.props.listChanged(newValue);
      this.setState({ list: newValue });
    }
  }

  chosenChanged (prev) {
    const newValue = this.props.chosen;
    const oldValue = prev;

    if (oldValue !== newValue && newValue) {
      this.setState({ chosen: newValue, listClass: 'present' });
    }
  }

  pendingChanged (prev) {
    if (prev === this.state.pending) {
      return;
    }
    console.log('setPending');
    if (this.state.pending) {
      this.setState({ listClass: 'pending' });
    }
  }

  componentDidUpdate(prevProps) {
    this.valueChanged(prevProps.value);
    this.pendingChanged(prevProps.pending);
    this.chosenChanged(prevProps.chosen);
  }

  render() {
    return (
      <ol className={this.state.listClass}>
        {this.state.list.map((value, index) => {
          return <li key={index} className={this.state.chosen === index ? 'active' : ''}>{value}</li>
        })}
      </ol>
    );
  }
}

// List.propTypes = {
//   value: PropTypes.string,
//   list: PropTypes.array,
// };

export default List;