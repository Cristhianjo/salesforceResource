public with sharing class CarteraVencidaController {
 
@AuraEnabled
public static List<credit_card_debt__c> getCreditCard(String accountId){
    List<credit_card_debt__c> listCreditCard = [SELECT Id, Name, 
                                                Status__c, product__c, Monto_original__c,
                                                monto_vencido__c,Fecha_emision__c,
                                                Fecha_vencimiento__c, dias_mora__c, 
                                                observation__c, Account__c 
                                                from credit_card_debt__c
                                                WHERE Account__c=:accountId AND
                                                Status__c = 'Open' AND dias_mora__c > 1];

    return listCreditCard;
}

@AuraEnabled
public static void saveObservacion(String creditCarId, String observacionUpdate){
    credit_card_debt__c creaditObj = [SELECT Id,observation__c from credit_card_debt__c WHERE Id=:creditCarId];
    creaditObj.observation__c = observacionUpdate;
    try {
        update creaditObj;
    } catch (Exception e) {
        
    }
}

}
