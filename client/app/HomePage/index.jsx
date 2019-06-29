import React, { Fragment, Component } from 'react';
import { get } from 'axios';
import ItemDisplay from './ItemDisplay';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      values: {},
      totals: [],
      showLesserTeirs: false,
      checkBoxes: {},
      hideAllCheckBoxes: true,
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.calculateTotals = this.calculateTotals.bind(this);
    this.toggleShowLesserTeirs = this.toggleShowLesserTeirs.bind(this);
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.toggleHideAllCheckBoxes = this.toggleHideAllCheckBoxes.bind(this);
  }

  async componentDidMount() {
    await this.getItems();
  }

  async getItems() {
    const { values } = this.state;
    const {
      data: { items },
    } = await get('/api/items');
    items.forEach(item => {
      values[item.name] = 0;
    });
    this.setState({ items, values });
  }

  handleValueChange({ target }, name) {
    const { values } = this.state;
    values[name] = +target.value;
    this.setState({ values });
  }

  calculateTotals() {
    const { items, values } = this.state;
    const totals = {};
    const collectTotalsFromItem = (item, count) => {
      totals[item.name] = [(totals[item.name] ? totals[item.name][0] : 0) + count, item.vendor, item.teir];
      item.costs.forEach(([costName, costCount]) => {
        collectTotalsFromItem(items.find(({ name }) => name === costName), +costCount * count);
      });
    };
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        const item = items.find(({ name }) => name === key);
        collectTotalsFromItem(item, value);
      }
    });
    this.setState({ totals });
  }

  toggleShowLesserTeirs() {
    const { showLesserTeirs } = this.state;
    this.setState({ showLesserTeirs: !showLesserTeirs });
  }

  toggleCheckBox({ target: { name } }) {
    const { checkBoxes } = this.state;
    this.setState({ checkBoxes: { ...checkBoxes, [name]: !checkBoxes[name] } });
  }

  toggleHideAllCheckBoxes() {
    const { hideAllCheckBoxes } = this.state;
    this.setState({ hideAllCheckBoxes: !hideAllCheckBoxes });
  }

  render() {
    const { items, values, totals, showLesserTeirs, checkBoxes, hideAllCheckBoxes } = this.state;
    return (
      <Fragment>
        <button type="submit" onClick={this.toggleShowLesserTeirs}>
          {showLesserTeirs ? 'Hide' : 'Show'} Teir 3 and 4 Items
        </button>
        {items
          .filter(({ teir }) => teir >= (showLesserTeirs ? 3 : 5))
          .sort((a, b) => b.teir - a.teir)
          .map(item => (
            <ItemDisplay
              key={item.name}
              item={item}
              count={values[item.name]}
              handleValueChange={this.handleValueChange}
            />
          ))}
        <button type="submit" onClick={this.calculateTotals}>
          Calculate
        </button>
        <br />
        {Object.entries(totals)
          .sort((a, b) => a[1][2] - b[1][2])
          .map(([name, [count, vendor]]) => (
            <div
              key={name}
              style={{ fontSize: '150%', marginTop: '10px' }}
              hidden={!(!checkBoxes[name] || !hideAllCheckBoxes)}
            >
              <input style={{ display: 'inline-block' }} type="checkbox" name={name} onChange={this.toggleCheckBox} />
              <div style={{ display: 'inline-block' }}>
                {vendor}: {name} - {count}
              </div>
            </div>
          ))}
        <button type="submit" onClick={this.toggleHideAllCheckBoxes} hidden={!Object.keys(totals).length}>
          {hideAllCheckBoxes ? 'Show' : 'Hide'} Checked Items
        </button>
      </Fragment>
    );
  }
}
