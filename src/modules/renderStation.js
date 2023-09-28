export class RenderStation {
  constructor(app, station) {
    this.app = app;
    this.station = station;
    this.init();
  }

  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.style.cssText = `
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: minmax(100px, 1fr);
      align-items: top;
      justify-content: space-between;
    `;

    this.renderStation();
  }

  renderStation() {
    this.wrapper.textContent = '';
    const queueList = this.createQueue();
    const columns = this.createColumns();
    this.wrapper.append(queueList, columns);
    document.querySelector(this.app).append(this.wrapper);
  }

  // Создание списка - очередь машин
  createQueue() {
    const list = document.createElement('ul');

    this.station.queue.forEach(car => {
      const item = document.createElement('li');
      item.textContent = car.getTitle();
      item.classList.add(car.typeCar);
      list.append(item);
    });
    return list;
  }

  // Создание колонок
  createColumns() {
    const columns = document.createElement('ul');
    columns.classList.add('columns');

    this.station.filling.forEach(column => {
      const itemColumn = document.createElement('li');
      itemColumn.classList.add(column.type);

      const itemContainer = document.createElement('div');
      itemContainer.classList.add('item-container');

      const columnName = document.createElement('p');
      columnName.textContent = column.type;

      const image = document.createElement('img');
      if (column.type === 'petrol') {
        image.src = require('../assets/img/petrol-station.svg');
      } else if (column.type === 'diesel') {
        image.src = require('../assets/img/diesel-station.svg');
      } else {
        image.src = require('../assets/img/gas-station.svg');
      }

      itemContainer.append(image, columnName);
      itemColumn.append(itemContainer);

      if (column.car) {
        const itemCar = document.createElement('p');
        const car = column.car;
        itemCar.textContent = car.getTitle();
        itemCar.classList.add(car.typeCar);
        itemColumn.append(itemCar);
      }
      columns.append(itemColumn);
    });
    return columns;
  }
}
