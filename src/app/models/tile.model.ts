export class Tile{

	constructor(public image: string, public city: CityOnTile, public rotation: number = 0){}

	cityAfterRotation(): CityOnTile{
	// zwraca informację o miastach na płytce, po uwzględnieniu jej rotacji
		let newTop = this.city.top;
		let newBottom = this.city.bottom;
		let newLeft = this.city.left;
		let newRight = this.city.right;

		switch (this.rotation) {
			case 90:
				newTop = this.city.left;
				newRight = this.city.top;
				newBottom = this.city.right;
				newLeft = this.city.bottom;
				break;

			case 180:
				newTop = this.city.bottom;
				newRight = this.city.left;
				newBottom = this.city.top;
				newLeft = this.city.right;
				break;

			case 270:
				newTop = this.city.right;
				newRight = this.city.bottom;
				newBottom = this.city.left;
				newLeft = this.city.top;
				break;
			
			default:
				// nie rób żadnej zamiany
				break;
		}

		return new CityOnTile(newTop, newRight, newBottom, newLeft, this.city.center);
	}
}

export class CityOnTile{
	constructor(public top: number = 0,
				public right: number = 0,
				public bottom: number = 0,
				public left: number = 0,
				public center: number = 0){}
}