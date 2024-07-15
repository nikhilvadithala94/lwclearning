import { LightningElement , api } from 'lwc';

export default class NotificationHandler extends LightningElement {
    showNotificationMsg = false
    message
    variant
    get displayVariant(){
        /*let msgVariant = this.variant ==='success'?'slds-theme_success':
        this.variant === 'error'?'slds-theme_error':
        this.variant === 'warning'?'slds-theme_warning':'slds-theme_info'*/

        let variantClass = this.variant === 'success' ? 'slds-theme_success':
        this.variant === 'warning' ? 'slds-theme_warning':
        this.variant === 'error' ? 'slds-theme_error':'slds-theme_info'
        console.log(variantClass)
        return `slds-notify slds-notify_toast ${variantClass}`
    }

    @api showNotification(msg , variant){
        this.message = msg||'please send a message'
        this.variant = variant||'info'
        this.showNotificationMsg = true
        setTimeout(()=>{
            this.showNotificationMsg = false
        },5000)
    }
}