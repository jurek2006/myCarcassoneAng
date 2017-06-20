
export class Tile{
	public color: string = 'green';
	constructor(public boardRow: number, public occupied: boolean = false, public active: boolean = true , public tileRef: number = null){}

}
