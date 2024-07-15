import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height ='';
    weight ='';
    bmi = '';
    message ='';
    changeHandler(event){
        const {name,value} = event.target;
        if(name === "height")
            this.height = Number(value);
        else if(name === "weight")
            this.weight = Number(value);

    }
    submitHandler(event){
        event.preventDefault();
        let heightinmet = this.height/100;
        let bmivalue = this.weight/(heightinmet*heightinmet);
        this.bmi = Number(bmivalue.toFixed(2));
        if(this.bmi < 18.5)
            this.message = 'underweight';
        else if(this.bmi >= 18.5 && this.bmi <= 24.9)
            this.message = ' healthy weight';
        else if(this.bmi >= 25.0 && this.bmi < 29.9)
            this.message = 'overweight';
        else
            this.message = 'obese';
        
    }

    reCalculate(){
        this.height = '';
        this.weight = '';
        this.bmi = '';
        this.message = '';
    }
}