import { LightningElement ,wire} from 'lwc';
import Note_Controller from '@salesforce/apex/NoteAppController.insertNoteRecord'
import fetch_Note_Data from '@salesforce/apex/NoteAppController.getNotes'
import update_Note_Rec from '@salesforce/apex/NoteAppController.updateNote'
import delete_Note_Data from '@salesforce/apex/NoteAppController.deleteNote'
import { refreshApex } from '@salesforce/apex';
import LightningConfirm from 'lightning/confirm';
const DEFAULT_NOTE = {
    Name : '',
    Note_Description_c : ''
}
export default class NoteTakingApp extends LightningElement {
    showModal = false
    noteRecord = DEFAULT_NOTE
    noteRecords
    selectedRecordId
    result
    formats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'link',
        'clean',
        'table',
        'header',
        'color',
    ];
    get isFormInvalid(){
        return !(this.noteRecord && this.noteRecord.Name && this.noteRecord.Note_Description_c);
    }

    get noteAction(){
        return this.selectedRecordId? 'Update Note':'Add Note'
    }

    @wire (fetch_Note_Data)
    wiredData(wiredResult){
        this.result = wiredResult
        const {data,error} = wiredResult
        if(data){
            this.noteRecords = data.map(item=>{
                let modifiedDate = new Date(item.LastModifiedDate).toDateString()

                return{...item,modifiedDate}
            });
        }
        if(error)
            console.log(error)
    }
    
    handleClick(){
        this.showModal = true
    }

    closeModal(){
        this.showModal = false
        this.noteRecord = DEFAULT_NOTE
        this.selectedRecordId = null

    }

    handleChange(event){
        const{name,value} = event.target

        this.noteRecord = {
            ...this.noteRecord,
            [name]:value
        }

    }
    handleSave(event){
        event.preventDefault()
        console.log(this.noteRecord.Name)
        if(this.selectedRecordId)
            this.editNote(this.selectedRecordId)
        else
            this.createNote();
    }
    handleEdit(event){
        const {recordid} = event.target.dataset
        this.selectedRecordId = recordid
        this.showModal = true
        const noteRec = this.noteRecords.find(item=>item.Id === recordid)
        this.noteRecord = {
            Name: noteRec.Name,
            Note_Description_c: noteRec.Note_Description__c
        }

    }

    handleDelete(event){
        this.selectedRecordId = event.target.dataset.recordid
        this.confirmDelete()
        //this.deleteNote(recordid)
    }

    async confirmDelete(){
            const result = await LightningConfirm.open({
                message: 'Are you sure you want to delete the note?',
                variant: 'headerless',
                label: 'Delete Note',
                // setting theme would have no effect
            });

            if(result){
                this.deleteNote(this.selectedRecordId)
            }
            else{
                this.selectedRecordId = null
            }
    }

    deleteNote(recordid){
        delete_Note_Data({
            noteId : recordid
        })
        .then(result => {
            console.log(result)
            let msg = result;
            this.showToast(msg, 'success')
            this.showModal = false
            this.selectedRecordId = null
            this.refresh()
        })
        .catch(error => {
            console.log(error.body.message);
            this.showToast(error.body.message, 'error')
        })
    }


    createNote(){
        Note_Controller({
            noteRecord : JSON.stringify(this.noteRecord)
        })
        .then(result => {
            console.log(result)
            let msg = result;
            this.closeModal()
            this.showToast(msg, 'success')
            this.refresh()
        })
        .catch(error => {
            console.log(error.body.message);
            this.showToast(error.body.message, 'error')
        })
    }

    editNote(recId){
        update_Note_Rec({
            noteRecord : JSON.stringify(this.noteRecord),
            noteId : recId
        })
        .then(result => {
            console.log(result)
            let msg = result;
            this.closeModal()
            this.showToast(msg, 'success')
            this.refresh()
        })
        .catch(error => {
            console.log(error.body.message);
            this.showToast(error.body.message, 'error')
        })
    }

    showToast(message,variant){
        let elem = this.template.querySelector('c-notification-handler')
        console.log(message)
        console.log(variant)
        elem.showNotification(message, variant)
    }

    refresh(){
        refreshApex(this.result)
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error.body.message);
        })
    }
}