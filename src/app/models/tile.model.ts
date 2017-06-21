export class Tile{

	constructor(public name: string, city: CityOnTile){}
}

export class CityOnTile{
	constructor(public top: number,
				public right: number,
				public bottom: number,
				public left: number,
				public center: number){}
}