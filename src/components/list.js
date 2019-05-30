import React from "react";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      list: [],
      chosen: null,
      pending: false,
    };
  }

  valueChanged (prev) {
    const newValue = this.props.value.split(/\r?\n/).filter(l => l);

    if (this.props.value !== prev) {
      this.props.listChanged(newValue);
      this.setState({list: newValue});
    }
  }

  chosenChanged (prev) {
    const newValue = this.props.chosen;
    const oldValue = prev;

    if (oldValue !== newValue) {
      this.setState({ chosen: newValue });
    }
  }

  listDoneClass () {
    return (this.state.chosen || this.props.pending)? 'done' : '';
  }

  componentDidUpdate(prevProps) {
    this.valueChanged(prevProps.value);
    this.chosenChanged(prevProps.chosen);
  }

  render() {
    return (
      <ol className={this.listDoneClass()}>
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