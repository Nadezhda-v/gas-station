// Класс, определяющий заправочную колонку
export class Column {
  #car = null;

  constructor(type, speed) {
    this.type = type; // тип заправки
    this.speed = speed; // скорость заправки
  }

  set car(car) {
    this.#car = car;
  }

  get car() {
    return this.#car;
  }
}
