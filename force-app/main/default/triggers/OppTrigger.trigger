trigger OppTrigger on Opportunity (before insert , After insert, Before Update , After Update) {
    Set<String> accId = new Set<String>();
    Set<String> accClosedwon = new Set<String>();
    Set<String> accClosedLost = new Set<String>();
    if(Trigger.isInsert){
        if(Trigger.isAfter){
            for(Opportunity opp:trigger.new){
                if(opp.AccountId!=null){
                    accId.add(opp.AccountId);
                }

            }
        } }
    if(trigger.isAfter && Trigger.isUpdate){
        for(Opportunity opp : Trigger.new){
            if(opp.Amount!=Trigger.oldMap.get(opp.Id).Amount || opp.AccountId!=Trigger.oldMap.get(opp.Id).AccountId){
                accId.add(opp.AccountId);
            }
            if(opp.StageName!=Trigger.oldMap.get(opp.Id).StageName && opp.StageName == 'Closed Won'){
                accClosedwon.add(opp.Id);
            }
            if(opp.StageName!=Trigger.oldMap.get(opp.Id).StageName && opp.StageName == 'Closed Lost'){
                accClosedLost.add(opp.Id);
            }
        }  
    }
	
	List<OpportunityLineItem> qlist = [SELECT Id,Description,OpportunityId,LastModifiedDate FROM OpportunityLineItem WHERE OpportunityId IN: accClosedwon ORDER BY LastModifiedDate DESC];
	List<OpportunityLineItem> qlist1 = [SELECT Id,Description,OpportunityId,LastModifiedDate FROM OpportunityLineItem WHERE OpportunityId IN: accClosedLost ORDER BY LastModifiedDate DESC];
	
	Map<String,List<OpportunityLineItem>> mapOfClosedWon = new Map<String,List<OpportunityLineItem>>();
	Map<String,List<OpportunityLineItem>> mapOfClosedLost = new Map<String,List<OpportunityLineItem>>();
	
	for(OpportunityLineItem ol1:qlist){
		if(!mapOfClosedWon.containsKey(ol1.opportunityId)){
			List<OpportunityLineItem> olist = new List<OpportunityLineItem>();
			olist.add(ol1);
			mapOfClosedWon.put(ol1.opportunityId ,olist);
		}
		else{
            List<OpportunityLineItem> lstoppline = mapOfClosedWon.get(ol1.opportunityId);
			lstoppline.add(ol1);
			mapOfClosedWon.put(ol1.opportunityId,lstoppline);
		}	
        system.debug(mapOfClosedWon.get(ol1.OpportunityId).size());
	}
	system.debug('map'+mapOfClosedWon);
	for(OpportunityLineItem ol2:qlist1){
		if(!mapOfClosedLost.containsKey(ol2.opportunityId)){
			List<OpportunityLineItem> olist = new List<OpportunityLineItem>();
			olist.add(ol2);
			mapOfClosedLost.put(ol2.opportunityId ,olist);
		}
		else{
            List<OpportunityLineItem> lstoppline = mapOfClosedLost.get(ol2.opportunityId);
			lstoppline.add(ol2);
			mapOfClosedLost.put(ol2.opportunityId, lstoppline);
		}				
	}
	List<OpportunityLineItem> ollistupdated = new List<OpportunityLineItem>();
	List<OpportunityLineItem> olitemwon = new List<OpportunityLineItem>();
	List<OpportunityLineItem> olitemlost = new List<OpportunityLineItem>();
	for(String accwon:accClosedwon){
        system.debug('1@@@1');
		OpportunityLineItem olitem = new OpportunityLineItem();
		olitem.Id = mapOfClosedWon.get(accWon)[0].Id;
		olItem.description = 'Won';
		ollistupdated.add(olitem);
        system.debug(ollistupdated.size());
        system.debug(mapOfClosedWon.get(accWon).size());
        for(Integer i = mapOfClosedWon.get(accWon).size()-1;i>=1;i--)
		 	olitemwon.add(mapOfClosedWon.get(accWon)[i]);
        system.debug(olitemwon);
        system.debug(olitemwon.size());
		 for(OpportunityLineItem olitem1:olitemwon){
			 olitem1.description = 'rejected';
			 ollistupdated.add(olitem1);
		 }
		system.debug('olist'+ollistupdated.size());
		olitemWon.clear();
	}
	for(String accLost:accClosedlost){
		OpportunityLineItem olitem = new OpportunityLineItem();
		olitem.Id = mapOfClosedlost.get(accLost)[0].Id;
		olItem.description = 'Lost';
		ollistupdated.add(olitem);
		 for(Integer i = mapOfClosedLost.get(accLost).size()-1;i>=1;i--)
		 	olitemLost.add(mapOfClosedLost.get(accLost)[i]);
		 for(OpportunityLineItem olitem1:olitemlost){
			 olitem1.description = 'rejected';
			 ollistupdated.add(olitem);
		 }
		olitemLost.clear();
		
	}
	system.debug(ollistupdated.size());
	if(!ollistupdated.isempty())
		update ollistupdated;
    
}