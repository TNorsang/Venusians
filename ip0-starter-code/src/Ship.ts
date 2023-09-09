import Venusian from './Venusian';

export default class Ship {
  static usedSerialNumber = 0;

  crew: Venusian[];

  daughters: Ship[];

  shipSerialNumber: number;

  waldoCount = 0;

  constructor(crew: Venusian[], daughters: Ship[]){
    this.crew = crew;
    this.daughters = daughters;
    Ship.usedSerialNumber += 2;
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
    return this.crew.some((crewMember) => crewMember.venusianName === 'Waldo');
  }

  totalWaldos():number{
    this.waldoCount = 0;
    this.crew.forEach((crewMember) => {
      if (crewMember.venusianName === 'Waldo'){
        this.waldoCount += 1;
      }
    });

    this.daughters.forEach((daughter)=> {
      this.waldoCount += daughter.totalWaldos();
    });

    return this.waldoCount;
  }

  removeWaldos():void{
    this.crew = this.crew.filter((crewMember) => crewMember.venusianName !== 'Waldo');
    this.waldoCount = 0;
  }

  removeDeepWaldos():void{
    this.removeWaldos();
    this.daughters.forEach((daughter) => {
      daughter.removeDeepWaldos();
    });
  }

  fleetHasDuplicates():boolean{
    const serialNumbers = new Set<number>();

    if (serialNumbers.has(this.shipSerialNumber)){
      return true;
    }

    serialNumbers.add(this.shipSerialNumber);

    let fleetHasDuplicates = false;

    this.daughters.forEach((daughter) => {
      if (daughter.fleetHasDuplicates()) {
        fleetHasDuplicates = true;
      }
    });

    return fleetHasDuplicates;
  }
}
