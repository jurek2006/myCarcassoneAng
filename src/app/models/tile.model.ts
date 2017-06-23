export class Tile{

	constructor(public image: string, public city: CityOnTile, public rotation: number = 0){}
}

export class CityOnTile{
	constructor(public top: number = 0,
				public right: number = 0,
				public bottom: number = 0,
				public left: number = 0,
				public center: number = 0){}
}