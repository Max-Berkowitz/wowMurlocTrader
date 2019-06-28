import React, { Fragment, Component } from 'react';
import { post } from 'axios';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItemName: '',
      newItemVendor: '',
      newItemTeir: 0,
      newItemCosts: '[["name", count]]',
    };

    this.newItemFormChange = this.newItemFormChange.bind(this);
    this.submitNewItem = this.submitNewItem.bind(this);
    this.addNewCost = this.addNewCost.bind(this);
  }

  newItemFormChange({ target }, isNum) {
    this.setState({ [target.name]: isNum ? +target.value : target.value });
  }

  async submitNewItem() {
    const { newItemName, newItemVendor, newItemTeir, newItemCosts } = this.state;
    await post('/api/items', {
      name: newItemName,
      vendor: newItemVendor,
      teir: newItemTeir,
      costs: JSON.parse(newItemCosts),
    });
  }

  addNewCost() {
    const { newItemCosts } = this.state;
    this.setState({
      newItemCosts: `${newItemCosts.slice(0, -1)}${
        newItemCosts[newItemCosts.length - 2] === ']' ? ',' : ''
      }["name", count]${newItemCosts.slice(-1)}`,
    });
  }

  render() {
    const { newItemName, newItemVendor, newItemTeir, newItemCosts } = this.state;
    return (
      <Fragment>
        <form onSubmit={e => e.preventDefault()}>
          <label>Name:</label>
          <input type="string" name="newItemName" value={newItemName} onChange={this.newItemFormChange} />
        </form>
        <form onSubmit={e => e.preventDefault()}>
          <label>Vendor:</label>
          <input type="string" name="newItemVendor" value={newItemVendor} onChange={this.newItemFormChange} />
        </form>
        <form onSubmit={e => e.preventDefault()}>
          <label>Teir:</label>
          <input
            type="number"
            name="newItemTeir"
            value={newItemTeir}
            onChange={e => this.newItemFormChange(e, true)}
            min="0"
            max="5"
          />
        </form>
        <button type="submit" onClick={this.addNewCost}>
          Add New Cost
        </button>
        <form onSubmit={e => e.preventDefault()}>
          <label>Costs:</label>
          <input
            type="string"
            name="newItemCosts"
            value={newItemCosts}
            onChange={this.newItemFormChange}
            style={{ width: '1000px' }}
          />
        </form>
        <button type="submit" onClick={this.submitNewItem}>
          Submit New Item
        </button>
      </Fragment>
    );
  }
}
