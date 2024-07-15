import { LightningElement ,api } from 'lwc';

export default class CarouselChildComponent extends LightningElement {
    @api imageList =[]
    index =0;
    panelStyle;

    connectedCallback(){
        setInterval(()=>{
          this.loadImage()
        },4000)
    }

    loadImage(){
        this.index = (this.index+1) %  this.imageList.length
        this.panelStyle = `transform:translateX(-${this.index*100}%)`
    }
    
}