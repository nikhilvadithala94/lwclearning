import { LightningElement } from 'lwc';

export default class Parentform extends LightningElement {
    inputName = '';
	abbreivatedName;
	isNameEntered =false;

    changeHandler(event){
		this.inputName = event.target.value;
        
    }

	clickhandler(){
		if(this.inputName){
            console.log('entered')
			this.abbreivatedName = '';
			this.isNameEntered =true;
			const Name = this.inputName.split(" ");
			console.log(Name[0]);
			for(let i=0;i<Name.length;i++){
				this.abbreivatedName = this.abbreivatedName+Name[i].substring(0,1);

			}
            console.log(this.abbreivatedName)

		}


	}
}