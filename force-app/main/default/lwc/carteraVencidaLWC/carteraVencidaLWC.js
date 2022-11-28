import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getCreditCard from '@salesforce/apex/CarteraVencidaController.getCreditCard';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import saveObservacion from '@salesforce/apex/CarteraVencidaController.saveObservacion';



const columns = [
    { label: 'Name ', fieldName: 'Name'},
    { label: 'Estado ', fieldName: 'Status__c' },
    { label: 'Producto', fieldName: 'product__c' },
    { label: 'Monto', fieldName: 'Monto_original__c'},
    { label: 'Monto Vencido', fieldName: 'monto_vencido__c' },
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
    { label: 'Dias Mora', fieldName: 'dias_mora__c'},
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
    @track data;
    @track recordId;
    @track areaDetailTable = true;
    @track showSpinner = false;
    @track areSelectRecord = false;
    @track idCreditDeb;
    @track creditDebName;
    @track estadoCartera;
    @track observacionValue;


    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.recordId = currentPageReference.state.recordId;
        }
        console.log('record ', this.recordId);
    }

    connectedCallback(){
        this.dataTableCreditDeb()
    }
    observacionOnchange(event){
        this.observacionValue = event.detail.value;
        console.log('observacionValue ', this.observacionValue )
    }



/**
 * 
 * Metodo de accion, del boton editar de cada registro
 */

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.idCreditDeb = row.Id;
        const result = this.data.find(({ Id }) => Id === this.idCreditDeb);
        this.creditDebName = result.Name;
        this.estadoCartera = result.Status__c;
        this.observacionValue = result.observation__c;
        switch (actionName) {
          case "Select":
            this.areaDetailTable = false;
            this.areSelectRecord = true;
            break;
          default:
        }
      }

/**
 *  Metodo al momento de hacer Clic en el boton save
 */

    handleClickButtonSave(){
        this.showSpinner = true
        saveObservacion({creditCarId:this.idCreditDeb, observacionUpdate:this.observacionValue}).then((result) =>{
            this.showSpinner = false
            this.showToast(
                "Success",
                "Opportunity Contact Role Created: ",
                "Success"
            );
            setTimeout(()=>{
                this.dataTableCreditDeb();
            },1000);
            this.areaDetailTable = true;
            this.areSelectRecord = false;

        }).catch((error) => {
            this.showSpinner = false;
            this.showToast(
                "Something is wrong!",
                " "+error.message,
                "error"
            );
        });
    }

    /**
     * Metodo del boton Cancelar
     */

    handleClickButtonCancel(){
        this.areaDetailTable = true;
        this.areSelectRecord = false;
    }

    /**
     * 
     * Metodo para llamar la tabla de datos
     */

    dataTableCreditDeb(){
        this.showSpinner = true;
        getCreditCard({accountId: this.recordId}) .then((result) => {
            this.showSpinner = false;
            this.data = result
        }).catch((error) => {
            this.showSpinner = false;
            this.showToast(
                "Something is wrong!",
                " "+error.message,
                "error"
            );
            console.error("Error ", error.message);
        });
    }

    /**
        Metodos comunes
     */

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
    
    navigateToRecordPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordOppId,
                objectApiName: 'Opportunity',
                actionName: 'view'
            }
        });
}
}