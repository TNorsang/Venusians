import Venusian from './Venusian';

export default class Ship {
  static usedSerialNumber = 0;

  // static serialNumbers = new Set<number>();

  crew: Venusian[];

  daughters: Ship[];

  shipSerialNumber: number;

  waldoCount = 0;

  constructor(crew: Venusian[], daughters: Ship[]){
    this.crew = crew;
    this.daughters = daughters;
    Ship.usedSerialNumber += 1;
    this.shipSerialNumber = Ship.usedSerialNumber;
  }

  getCrew():Venusian[]{
    return this.crew;
  }

  getDaughters():Ship[]{
    return this.daughters;
  }

  getSerialNumber():number{
    return this.shipSerialNumber;
  }

  hasWaldo():boolean{
    return this.crew.some((crewMember) => crewMember.getName() === 'Waldo');
  }

  totalWaldos():number{
    this.waldoCount = 0;
    this.crew.forEach((crewMember) => {
      if (crewMember.getName() === 'Waldo'){
        this.waldoCount += 1;
      }
    });

    this.daughters.forEach((daughter)=> {
      this.waldoCount += daughter.totalWaldos();
    });

    return this.waldoCount;
  }

  removeWaldos():void{
    this.crew = this.crew.filter((crewMember) => crewMember.getName() !== 'Waldo');
    this.waldoCount = 0;
  }

  removeDeepWaldos():void{
    this.removeWaldos();
    this.daughters.forEach((daughter) => {
      daughter.removeDeepWaldos();
    });
  }

  fleetHasDuplicates(): boolean {
    const serialNumbers = new Set<number>();
    const queue: Ship[] = [this];

    while (queue.length > 0) {
      const current = queue.shift();
      if (current !== undefined) {
        if (serialNumbers.has(current.getSerialNumber())) {
          return true;
        }
        serialNumbers.add(current.getSerialNumber());
        queue.push(...current.getDaughters());
      }
    }

    return false;
  }

}
