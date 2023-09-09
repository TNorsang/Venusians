export default class Venusian {
  static lastVSN = 0;
    
  venusianName: string;

  vsn: number;

  constructor(venusianName: string){
    this.venusianName = venusianName;
    Venusian.lastVSN += 1;
    this.vsn = Venusian.lastVSN;
  }

  getName():string{
    return this.venusianName;
  }

  getVsn():number{
    return this.vsn;
  }

} 



