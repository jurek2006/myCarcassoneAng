import { Component, OnInit } from '@angular/core';
import { Tile, CityOnTile } from './models/tile.model';

// TilesService przechowuje dane o płytkach (tiles)

// TESTOWE

export class TilesService{
	private tiles: Tile[] = [
		new Tile("red", new CityOnTile(0,0,0,0,0), "tileA01.jpg"),
		new Tile("blue", new CityOnTile(0,0,0,0,0), "tileA02.jpg"),
		new Tile("yellow", new CityOnTile(0,0,0,0,0), "tileA03.jpg")
	];

	selectedTile: Tile = this.tiles[0];

	selectedTileClicked(): Tile{
		this.tiles.shift();
		return this.selectedTile = this.tiles[0];
	}
}