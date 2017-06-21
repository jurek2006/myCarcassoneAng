export class Tile{

	constructor(public name: string, public city: CityOnTile, public image: string){}
}

export class CityOnTile{
	constructor(public top: number,
				public right: number,
				public bottom: number,
				public left: number,
				public center: number){}
}