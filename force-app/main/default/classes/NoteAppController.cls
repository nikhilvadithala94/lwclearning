public with sharing class NoteAppController {
    @AuraEnabled
    public static string insertNoteRecord(String noteRecord) {
        try {
            system.debug(noteRecord);
            Notes note = (Notes)JSON.deserialize(noteRecord, Notes.class);
            My_Note__c myNote = new My_Note__c();
            myNote.Name = note.Name;
            myNote.Note_Description__c = note.Note_Description_c;
            insert myNote;
            return 'Note created successfully';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static List<My_Note__c> getNotes(){
        try {
            List<My_Note__c> notes = [Select Id, Name, Note_Description__c,LastModifiedDate From My_Note__c ORDER BY LastModifiedDate DESC];
            return notes;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string updateNote(String noteId , String noteRecord){
        try {
            if(!String.isBlank(noteId)){

                Notes note = (Notes)JSON.deserialize(NoteRecord, Notes.class);
                My_Note__c myNote = new My_Note__c();
                myNote.Id = noteId;
                myNote.Name = note.Name;
                mynote.Note_Description__c = note.Note_Description_c;
                update myNote;
                return 'Note updated successfully';
            }
            else{
                return 'Note not found';
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String deleteNote(String noteId){
        try {
            My_Note__c note  = [SELECT id from My_Note__c WHERE ID =: noteId];
            delete note;
            return 'Note Deleted Successfully';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    

    public class Notes{
        @AuraEnabled public string Name;
         @AuraEnabled public string Note_Description_c;
    }
}