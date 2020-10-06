import React from 'react';


class ListItem extends React.Component {
  render() {
    console.log(this.props);
    if (this.props && this.props.value === undefined) {
      return <div>Empty</div>;
    }
    return (
      <>
        {
          Object.keys(this.props.value).map((index) => {
            return (
              <li key={index} className="list-data">
                <div>
                  {index}
                </div>
                <div>
                  {this.props.value[index].toFixed(2)}
                </div>
              </li>
            );
          })
        }
      </>
    );
  }
}

class CurrencyConverter extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'INR',
      dropdownData: [],
      convertedResult: {},
      rates: {},
      currencies: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch('/api/currencies')
      .then(res => res.json())
      .then(currencies => this.setState({ dropdownData: currencies }, () => console.log('Customers fetched...', currencies)));
  }

  handleChange(event) {
    const api = `https://api.exchangeratesapi.io/latest?base=${event.target.value}`;
    this.setState({ currency: event.target.value });

    fetch(api)
      .then(results => {
        return results.json();
      }).then(data => this.setState({ rates: data.rates })
      )
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    const { dropdownData, rates } = this.state;
    const currencyChoice = dropdownData.map(currency =>
      <option key={currency.symbol} value={currency.symbol}> {currency.name} </option>
    );
    return (
      <div className="main-div">
        <div className="left-side">
        <h1>Currency Rate Chart</h1>
        <h3>Select a Currency from dropDown</h3>
        <form onSubmit={this.handleSubmit}>
          <strong>Select currency:</strong>
          <select value={this.state.currency} onChange={this.handleChange}>
            {currencyChoice}
          </select>
        </form>
        </div>
        <div className="right-side">
        {!(Object.keys(rates).length === 0 && rates.constructor === Object) &&
          <div className="wrapper">
            <li className="list-data"><div className="label"> Currency Codes</div> <div> Conversion Rate</div></li>
            <ListItem className="list-item" value={rates}></ListItem>
          </div>}
      </div>
      </div>
    );
  }
}

export default CurrencyConverter;
