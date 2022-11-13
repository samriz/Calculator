import { Component, OnInit } from '@angular/core';
import { Mode } from '../mode';
import { ModeService } from '../mode.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit 
{
  private modeId: number = 1;
  public calcValue: string = "";
  public mode!: Mode;
  constructor(private route: ActivatedRoute, private modeService: ModeService) {}

  ngOnInit(): void 
  {
    this.getMode();
  }

  incrementMode(): void
  {
    ++this.modeId;
    if(this.modeId % 2 === 0) this.modeId = 2;
    else this.modeId = this.modeId % 2;
    this.getMode();
  }

  changeValue(val:string | number):void
  {
    if(typeof val === "string") this.calcValue += val;
    if (typeof val === "number") this.calcValue += val.toString();
    console.log()
  }

  getMode(): void
  {
    this.modeService.getMode(this.modeId).subscribe(mode => this.mode = mode);
    console.log(this.modeId);
  }

  getResult(): void
  {
    console.log(this.calcValue);
    //let result = Number(this.calcValue);
    let result = parseFloat(this.calcValue);
    console.log(result);
    this.calcValue = result.toString();
    console.log(this.calcValue);
  }

  clear():void
  {
    this.calcValue = "";
  }

}
