export class Car {
  #maxTank;
  constructor(brand, model, maxTank) {
    this.brand = brand;
    this.model = model;
    this.#maxTank = maxTank;
    this.nowTank = Math.floor(Math.random() * maxTank);
  }

  getTitle() {
    return `${this.brand} ${this.model}`;
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  get needPetrol() {
    return this.#maxTank - this.nowTank;
  }

  fillUp() {
    this.nowTank = this.#maxTank;
    return this;
  }

  get maxTank() {
    return this.#maxTank;
  }
}

export class PassangerCar extends Car {
  typeCar = 'passanger';

  constructor(brand, model, maxTank) {
    super(brand, model, maxTank);
    const randomTypeFuel = Math.random() < 0.9 ? 'petrol' : 'gas';
    this.typeFuel = randomTypeFuel;
    console.log(this.typeFuel);
  }
}

export class Truck extends Car {
  typeCar = 'truck';

  constructor(brand, model, maxTank) {
    super(brand, model, maxTank);
    const randomTypeFuel = Math.random() < 0.9 ? 'diesel' : 'gas';
    this.typeFuel = randomTypeFuel;
    console.log(this.typeFuel);
  }
}
