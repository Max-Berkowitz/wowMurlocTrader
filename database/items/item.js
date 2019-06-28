import Item from './index';

const createItem = (name, vendor, teir, costs) =>
  Item.forge({ name, vendor, teir, costs: costs.map(([costName, costCount]) => `${costName}|${costCount}`) }).save();

const getItems = async () => {
  const items = (await Item.where({}).fetchAll()).toJSON();
  return items.map(item => ({ ...item, costs: item.costs.map(cost => cost.split('|')) }));
};

export { createItem, getItems };
