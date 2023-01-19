import { Component, OnInit } from "@angular/core";
import { Player } from "../../../../../../lib";

@Component({
  selector: "page-setup",
  templateUrl: "./setup.component.html",
})
export class SetupPageComponent implements OnInit {
  players: Player[] = [];

  constructor() {}

  ngOnInit(): void {}
}
