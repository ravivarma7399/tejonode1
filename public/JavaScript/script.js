function formSubmit() {

   var form1=document.getElementById("feedform");  
   var $name = document.getElementById("name").value;
   var $phone = document.getElementById("phone").value;
   var $email= document.getElementById("email").value;
   var $address = document.getElementById("address").value;
   var $comments = document.getElementById("feedback").value;
   var phone_value =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   var format = /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;

   if($name == ""){
      alert("Please Enter your name.");
      // form1.name.focus();
      return false;
   }
  
   
   // else  if (!$phone.match(phone_value)) {
   //       alert("Please enter a valid number format: 618-453-6011");
   //       // form1.phone.focus();
   //       return false;

   //    }
   

 else  if(!$address == "" ) {
      alert( "Please Enter your Address." );
      // form1.address.focus() ;
      return false;
   }
   
   else   if (!$email.match(format)) {
         alert("Please enter valid email address: username@domain.com")
         // form1.email.focus();
         return false;

      }
         
   
else{
 
   alert("Thank you!!!");
   res.redirect('');
   return true;
}
}
