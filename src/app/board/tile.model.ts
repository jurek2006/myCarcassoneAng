
export class Tile{
	public color: string = 'green';
	constructor(public boardRow: Number, public occupied: Boolean = false, public active: Boolean = true , public tileRef: Number = null){}

}