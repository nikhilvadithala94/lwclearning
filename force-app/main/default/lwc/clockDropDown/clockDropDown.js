import { LightningElement, api } from 'lwc';

export default class ClockDropDown extends LightningElement {

    @api value=[];
    @api label;
    @api uniqueId;

    changeHandler(event){
        const selValue = event.target.value;
        this.dispatchEvent(new CustomEvent(

            'optionhandler',
            {
                detail: {
                    value: selValue,
                    label: this.label
                }
            }
        ))

    }

    @api reset(value){
        this.template.querySelector('select').value = value;
        this.dispatchEvent(new CustomEvent(

            'optionhandler',
            {
                detail: {
                    value: value,
                    label: this.label
                }
            }
        ))
    }
   
}