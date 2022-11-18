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

  getNumber(value: string)
  {
    console.log(`value: ${value}`);
    if(this.waitForSecondNumber)
    {
      this.displayValue = value;
      this.waitForSecondNumber = false;
    }
    else this.displayValue === '0'? this.displayValue = value: this.displayValue += value;
  }

  getDecimal()
  {
    if(!this.displayValue.includes('.'))
    {
      this.displayValue += '.';
    }
  }

  calculateAndGetResult(operator: string , secondOperand: number) : number
  {
    let result = 0;
    if(this.firstOperand !== null)
    {
      switch (operator)
      {
        case '+':
          this.firstOperand += secondOperand;
          result = this.firstOperand;
          break;
        case '-': 
          this.firstOperand -= secondOperand;
          result = this.firstOperand;
          break;
        case '*': 
          this.firstOperand *= secondOperand;
          result = this.firstOperand;
          break; 
        case '/': 
          this.firstOperand /= secondOperand;
          result = this.firstOperand;
          break; 
        case '=':
          result = secondOperand;
      }
    }
    return result;
  }

  getOperation(operator: string)
  {
    console.log(`operator: ${operator}`);
    if(this.firstOperand === null) this.firstOperand = parseFloat(this.displayValue);
    else if(this.operator)
    {
      let result = this.calculateAndGetResult(this.operator , parseFloat(this.displayValue))
      this.displayValue = result.toString();
      this.firstOperand = result;
    }
    this.operator = operator;
    this.waitForSecondNumber = true;

    console.log(`first operand: ${this.firstOperand}`);
  }

  clear()
  {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}