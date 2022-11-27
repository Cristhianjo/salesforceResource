import { LightningElement, track } from 'lwc';



const columns = [
    { label: 'Credit Card Debt Name ', fieldName: 'Name'},
    { label: 'Estado ', fieldName: 'Status__c' },
    { label: 'Producto', fieldName: 'product__c' },
    { label: 'Monto', fieldName: 'Monto_original__c', type: 'number', typeAttributes:{
        maximumFractionDigits: '2'
    } },
    { label: 'Monto Vencido', fieldName: 'monto_vencido__c', type: 'number', typeAttributes:{
        maximumFractionDigits: '2'
    } },
    { label: 'Fecha emision', fieldName: 'Fecha_emision__c',type: "date",
    typeAttributes:{
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    } },
    { label: 'Fecha Vencimiento ', fieldName: 'Fecha_vencimiento__c', type: "date",
    typeAttributes:{
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    } },
    { label: 'Observacion', fieldName: 'observation__c'},
    { type: "button", typeAttributes: {  
        name: 'Select',  
        title: 'Select',
        variant: 'brand',  
        disabled: false,  
        value: 'Select',  
        iconPosition: 'center',
        iconName: 'utility:edit'
    } }, 
];

export default class CarteraVencidaLWC extends LightningElement {
    columns = columns;
}