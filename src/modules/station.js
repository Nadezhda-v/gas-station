import { Column } from './column';
import { RenderStation } from './renderStation';

// Класс, представляющий станцию
export class Station {
  #queue = []; // очередь на заправку
  #filling = []; // колонки на заправке
  #ready = []; // заправленные машины

  constructor(typeStation, renderApp = null) {
    this.typeStation = typeStation;
    this.renderApp = renderApp;
    this.renderStation = null;
  }

  get filling() {
    return this.#filling;
  }

  get queue() {
    return this.#queue;
  }

  init() {
    this.createColumns();
    this.addStation();

    setInterval(() => {
      this.checkQueueToFilling();
    }, 2000);
  }

  addStation() {
    if (this.renderApp) {
      this.renderStation = new RenderStation(this.renderApp, this);
    }
  }

  // Создание заправочных колонок
  createColumns() {
    for (const optionStation of this.typeStation) {
      if (!Object.prototype.hasOwnProperty.call(optionStation, 'count') &&
        !Object.prototype.hasOwnProperty.call(optionStation, 'speed') &&
        Object.prototype.hasOwnProperty.call(optionStation, 'type')) {
        optionStation.count = 1;
        optionStation.speed = 5;
      }
      for (let i = 0; i < optionStation.count; i++) {
        this.#filling.push(new Column(optionStation.type, optionStation.speed));
      }
    }
  }

  // Проверить состояние очереди для заправки машины
  checkQueueToFilling() {
    if (this.#queue.length) {
      const availableTypesColumns = this.#filling.map(column => column.type);
      const carsWithoutColumns = [];

      for (let i = 0; i < this.#queue.length; i++) {
        /* Если тип топлива машины не соответствует доступным видам колонок,
        машина удаляется из списка и записывается в массив carsWithoutColumns */
        if (!availableTypesColumns.includes(this.#queue[i].typeFuel)) {
          carsWithoutColumns.push(this.#queue[i]);
          this.#queue.splice(i, 1)[0];
        } else {
          // Определяется подходящая колонка
          for (let j = 0; j < this.#filling.length; j++) {
            if (!this.#filling[j].car &&
              this.#queue[i].typeFuel === this.#filling[j].type) {
              this.#filling[j].car = this.#queue.splice(i, 1)[0];
              this.fillingGo(this.#filling[j]);
              this.renderStation.renderStation();
              break;
            }
          }
        }
      }
    }
  }

  // Начало заправки
  fillingGo(column) {
    const car = column.car;
    const needPetrol = car.needPetrol;
    let nowTank = car.nowTank;
    const timerId = setInterval(() => {
      nowTank += column.speed;
      if (nowTank >= car.maxTank) {
        clearInterval(timerId);
        const amountOfFuel = nowTank - needPetrol;
        car.fillUp();
        column.car = null;
        this.leaveClient({ car, amountOfFuel });
      }
    }, 1000);
  }

  // Добавить заправленную машину в массив
  leaveClient({ car, amountOfFuel }) {
    this.#ready.push(car);
    this.renderStation.renderStation();
  }

  // Добавить машину в очередь
  addCarInQueue(car) {
    this.#queue.push(car);
    this.renderStation.renderStation();
  }
}
