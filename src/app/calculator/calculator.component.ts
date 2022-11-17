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
  public displayValue: string = "0";
  public mode!: Mode;

  private modeId: number = 1;
  private firstOperand: number | null = null;
  private operator: string | null = null;
  private waitForSecondNumber: boolean = false;

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

  getMode(): void
  {
    this.modeService.getMode(this.modeId).subscribe(mode => this.mode = mode);
  }

  public getNumber(v: string){
    console.log(v);
    if(this.waitForSecondNumber)
    {
      this.displayValue = v;
      this.waitForSecondNumber = false;
    }else{
      this.displayValue === '0'? this.displayValue = v: this.displayValue += v;

    }
  }

  getDecimal(){
    if(!this.displayValue.includes('.')){
        this.displayValue += '.'; 
    }
  }

  doCalculation(op: string , secondOp: number) : number
  {
    let result = 0;
    if(this.firstOperand !== null)
    {
      switch (op)
      {
        case '+':
          this.firstOperand += secondOp;
          result = this.firstOperand;
          break;
        case '-': 
          this.firstOperand -= secondOp;
          result = this.firstOperand;
          break;
        case '*': 
          this.firstOperand *= secondOp;
          result = this.firstOperand;
          break; 
        case '/': 
          this.firstOperand /= secondOp;
          result = this.firstOperand;
          break; 
        case '=':
          result = secondOp;
      }
    }
    return result;
  }
  getOperation(op: string)
  {
    console.log(op);

    if(this.firstOperand === null)
    {
      this.firstOperand = parseFloat(this.displayValue);

    }
    else if(this.operator)
    {
      const result = this.doCalculation(this.operator , parseFloat(this.displayValue))
      this.displayValue = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
 
  }

  clear()
  {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}