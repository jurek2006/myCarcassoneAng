import { Component, OnInit, EventEmitter } from '@angular/core';
import { Tile, CityOnTile } from './models/tile.model';

// TilesService przechowuje dane o płytkach (tiles)

export class TilesService{

	// emiter - za każdym razem, kiedy zmieni się wybrana płytka
	selectedTileChanged = new EventEmitter<Tile>();

	private tiles: Tile[] = [
		new Tile("tileA01.jpg", new CityOnTile() ),
		new Tile("tileA02.jpg", new CityOnTile(1,1,1,1,1) ),
		new Tile("tileA03.jpg", new CityOnTile() ),
		new Tile("tileA04.jpg", new CityOnTile() ),
		new Tile("tileA05.jpg", new CityOnTile() ),
		new Tile("tileA06.jpg", new CityOnTile(1,1,0,1,1) ),
		new Tile("tileA07.jpg", new CityOnTile(1,1,0,1,1) ),
		new Tile("tileA08.jpg", new CityOnTile(1,1,0,1,1) ),
		new Tile("tileA09.jpg", new CityOnTile(1,1,0,1,1) ),
		new Tile("tileA10.jpg", new CityOnTile() ),
		new Tile("tileA11.jpg", new CityOnTile(1,0,0,1,0) ),
		new Tile("tileA12.jpg", new CityOnTile(1,0,0,1,0) ),
		new Tile("tileA13.jpg", new CityOnTile(1,0,0,1,0) ),
		new Tile("tileA14.jpg", new CityOnTile(1,0,0,1,0) ),
		new Tile("tileA15.jpg", new CityOnTile() ),
		new Tile("tileA16.jpg", new CityOnTile(0,1,0,1,1) ),
		new Tile("tileA17.jpg", new CityOnTile(0,1,0,1,1) ),
		new Tile("tileA18.jpg", new CityOnTile(1,0,0,0,0) ),
		new Tile("tileA19.jpg", new CityOnTile(1,0,0,0,0) ),
		new Tile("tileA20.jpg", new CityOnTile(1,0,0,0,0) ),
		new Tile("tileA21.jpg", new CityOnTile(1,2,0,0,0) ),
		new Tile("tileA22.jpg", new CityOnTile(0,1,0,2,0) ),
		new Tile("tileA23.jpg", new CityOnTile(1,0,0,0,0) ),
		new Tile("tileA24.jpg", new CityOnTile(1,0,0,0,0) ),
	];

	// powrót do przekazania płytki przez referencję
	// kopia generowałe error "not a function" - myślę, że deep copy załatwiło by sprawę
	private selectedTile: Tile = this.tiles[0];
	// private selectedTile: Tile = Object.assign({}, this.tiles[0]);

	getSelectedTile(): Tile{
		return this.selectedTile;
	}

	selectedTileClicked(){
	// bardzo testowe
		this.tiles.shift();
		if(this.tiles.length > 0){
			this.selectedTile = this.tiles[0];
			this.selectedTileChanged.emit(this.getSelectedTile());
		}
		else{
			// TUTAJ NASTĘPUJE KONIEC GRY
		}
	}

	setSelectedTileRotation(clockWiseRotation: number): Tile{
		if(clockWiseRotation === 90 || clockWiseRotation === 180 || clockWiseRotation === 270){
			// uaktualnienie aktualnego obrotu
			this.selectedTile.rotation = (this.selectedTile.rotation + clockWiseRotation) % 360;
			this.selectedTileChanged.emit(this.getSelectedTile());
		}
		return this.selectedTile;
		
	}


}