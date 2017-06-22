export class Tile{

	constructor(public image: string, public city: CityOnTile){}
}

export class CityOnTile{
	constructor(public top: number,
				public right: number,
				public bottom: number,
				public left: number,
				public center: number){}
}