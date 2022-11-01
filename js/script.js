
/* Validate the register form before submitting logic */

/* Function to show error messsage */

function showMessage(input,message,type){
    const msg = input.parentNode.querySelector("small")
    msg.innerText = message
    return type;
}

/* function to show error message */
function showError(input,message){
    return showMessage(input,message,false)
}

/* function for correct input */
function showSuccess(input){
    return showMessage(input,'',true)
}

/* Function to check whether input has a value */
function hasValue(input, message){
    if(input.value.trim() === ""){
        return showError(input,message)
    }
    return showSuccess(input)
}

/* Function to check password length */

function checkPassword(input,requiredMessage,InvalidMessage){
    if(!hasValue(input,requiredMessage)){
        return false
    }
    if(input.value.length < 9){
        return showError(input,InvalidMessage)

    }
    return true

}
/* Function to check if radio button group is checked */

function checkRadio(inputs, message){
    var value = null
    for (var i=0; i < inputs.length; i++){
        if(inputs[i].type === 'radio' && inputs[i].checked){
            value = inputs[i].value
        }
    }
    if (value = null ){
        return showError(inputs,message)
 
    }
    return true
    
}
/* FUnction to check if post code has 4 digit */
function checkPostalCode(input, requiredMessage,invalidMessage){
    if(!hasValue(input,requiredMessage)){
        return false
    }
    if((input.value.length < 4)|| (input.value.length > 4)){
        return showError(input,invalidMessage)

    }
    return true
}

/* Function to Validate Email */
function validateEmail(input, requiredMsg, invalidMsg){

    if(!hasValue(input,requiredMsg)){
        return false
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = input.value.trim()
    if(!emailRegex.test(email)){
        return showError(input,invalidMsg)
    }
    return true;
   }











/* Logic for order Page */

/* Logic to  display fields as necessary*/

/* delivery address */
let deliveryRadio = document.querySelector('#delivery')
let deliveryFields = document.querySelector('#delivery-address-id');
let billingToggleCheck = document.querySelector('.billing-filling-check');
let pickupRadio = document.querySelector('#pickup');
/* Listen to change events in the radio buttons */
if(deliveryRadio !=null){
    deliveryRadio.addEventListener('change',function(){
        deliveryFields.style.display = 'flex'
        billingToggleCheck.style.display = 'flex'
        })
        pickupRadio.addEventListener('change',function(){
        deliveryFields.style.display = 'none'
        billingToggleCheck.style.display = 'none'
        })

}



/* Check if user toggled same billing address as delivery */


let toggleBox = document.querySelector('#billingToggle');

if(toggleBox!=null){
    toggleBox.addEventListener('change',()=>{
   
   
        let cityText = document.querySelector('#city').value.trim()
        let streetNumber= document.querySelector('#street-number').value.trim()
        let postalCode= document.querySelector('#postal-code').value.trim()
        let country= document.querySelector('#country').value.trim()
        if((cityText === "") || (streetNumber === "") || (postalCode ==="") || (country ==="")){
            alert("Please Enter the Delivery Address First")
        }
        else{
         let cityTextBilling = document.querySelector('#city-billing')
        let streetNumberBilling= document.querySelector('#street-number-billing')
        let postalCodeBilling= document.querySelector('#postal-code-billing')
        let countryBilling= document.querySelector('#country-billing')
        cityTextBilling.value = cityText
        streetNumberBilling.value = streetNumber
        postalCodeBilling.value = postalCode
        countryBilling.value = country
    
        }
    
    });
}



/* Handle payment information display */
let onlineToggle = document.querySelector('#online-payment')
let onPickup = document.querySelector('#pickup-payment')
let paymentMethod = document.querySelector('#payment-options')
let creditCardInput  = document.querySelector('.credit-card-input')
/* DOM check element */
if(onlineToggle != null){
    onlineToggle.addEventListener('change',()=>{
        paymentMethod.style.display = 'flex'
        creditCardInput.style.display = 'flex'
    
    })
    /* Close the payment if pickup is selected */
    onPickup.addEventListener('change',()=>{
        paymentMethod.style.display = 'none'
        creditCardInput.style.display = 'none'
    
    })

}


/* Handle limiting numbers in credit card information */
let visaRadio = document.querySelector('#visa')
let masterCardRadio = document.querySelector('#master-card')
let americanExpressRadio = document.querySelector('#american-express')
/* credit info input */
let creditCardInputField = document.querySelector('#credit-card')
/* This check ensure no error while in another page */
if(visaRadio !=null){
    visaRadio.addEventListener('change',()=>{
        maxLength = "16"
        creditCardInputField.addEventListener('input',()=>{
         creditCardInputField.value = creditCardInputField.value.slice(0,maxLength)
         })
         
     
     })

     masterCardRadio.addEventListener('change',()=>{
        maxLength = "16"
        creditCardInputField.addEventListener('input',()=>{
            creditCardInputField.value = creditCardInputField.value.slice(0,maxLength)
            })
    })
    americanExpressRadio.addEventListener('change',()=>{
        maxLength = "15"
        creditCardInputField.addEventListener('input',()=>{
            creditCardInputField.value = creditCardInputField.value.slice(0,maxLength)
            })
    });
}



/* Handle submit of order form */
const STREET_RQUIRED = "Street value is requred"
const BILLING_REQUIRED = "City data is required"
const POSTALCODE_REQUIRED = "Postal code is required"
const COUNTRY_REQUIRED = "Country is required"
const RECEIPT_EMAIL_REQUIRED = "Recipient email is required"
const INVALID_POSTAL_CODE = "Postal code should be 4 digits"
const CREDIT_CARD_REQUIRED = "credit card is required when paying online"

let orderform = document.querySelector('.order-form')
/* DOM check */
if(orderform !=null){
    orderform.addEventListener('submit',(e)=>{
        e.preventDefault()
        let validateBillingStreet = hasValue(orderform.elements["street-number-billing"],STREET_RQUIRED)
        let validateBillingcity = hasValue(orderform.elements["city-billing"],BILLING_REQUIRED)
        let validatepostalBillingCode = checkPostalCode(orderform.elements["postal-code-billing"],POSTALCODE_REQUIRED,INVALID_POSTAL_CODE)
        let validateCountry = hasValue(orderform.elements["country-billing"],COUNTRY_REQUIRED)
        let validateReceiptEmail = hasValue(orderform.elements["receipt-email"],RECEIPT_EMAIL_REQUIRED)
        let validateCreditCard = hasValue(orderform.elements["credit-card"],CREDIT_CARD_REQUIRED)
      
        if(validateBillingStreet && validateBillingcity && validatepostalBillingCode && validateCountry && validateReceiptEmail && validateCreditCard){
         alert("form has been validated successfully")
    
       /* Submitting can be done at this point */
    
        }
    
    
    
    });
}


   /* Handle submit of register form */
/* Declare constants for register form */
const USERNAME_REQUIRED = "Username is required"
const EMAIL_REQUIRED = "Email is required"
const PASSWORD_REQUIRED = "Password is required"
const INVALID_PASSWORD = "Password should not be less that 9 digits"
const INVALID_EMAIL = "Email is entered in wrong format"



let registerForm = document.querySelector('.reg-form');
if(registerForm !=null){
    registerForm.addEventListener('submit',function(e){
   
        e.preventDefault();
        console.log("Im here")
        let validateUsername = hasValue(registerForm.elements["username"],USERNAME_REQUIRED)
        let ValidateEmail = validateEmail(registerForm.elements["email"],EMAIL_REQUIRED,INVALID_EMAIL)
        let validatePassword = checkPassword(registerForm.elements["password"],PASSWORD_REQUIRED,INVALID_PASSWORD)
        if(validateUsername && ValidateEmail && validatePassword ){
            alert("form has been validated successfully")
       
          /* Submitting can be done at this point */
       
           }
    })
}


/* Scroll to the menu item */
let menuLink = document.querySelector('#menu-link')
let  menuSection = document.querySelector('#menu-section')
if(menuLink !=null){
    menuLink.addEventListener('click',(e)=>{
        e.preventDefault()

        menuSection.scrollIntoView({behavior:'smooth', block:'end',inline:'nearest'})


});
}

       





