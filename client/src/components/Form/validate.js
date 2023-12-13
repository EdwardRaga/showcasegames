export default function validate(state) {
  const errors = {};

  function validateField(fieldName, fieldValue, regex, message) {
    //caso campos vacios
    if (!fieldValue) {
      if(fieldName === "name"){
        errors[fieldName] = "Please enter a name"
      }
      if(fieldName === "background_image"){
        
        errors[fieldName] = message

      }

      if(fieldName === "description"){
        errors[fieldName] = "Please enter a description"
      }
      if(fieldName === "genres"){
        errors[fieldName] = message
      }


      if(fieldName === "release"){
        
        errors[fieldName] = message

      }
      
      if(fieldName === "platforms"){
        
        errors[fieldName] = message

      }
      if(fieldName === "rating"){
        
        errors[fieldName] = "Please enter a rating"

      }


      // caso de expresion regular 
    } else if (regex && regex.test(fieldValue)) {
      errors[fieldName] = message;
    }else{ // caso de validaciones especificas
      // numero de rating este entre 1 y 5
      if(fieldName === 'rating'){
        if(fieldValue > 5 || fieldValue < 1 ){

          errors[fieldName] = message;
        }
      }
      if(fieldName === 'description'){
        if(fieldValue.length < 50){
          
          errors[fieldName] = "The description must contain at least 50 characters";
        }
      }

    }
  }

  validateField("name", state.name, /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, "Must not contain special characters");
  validateField("description", state.description, /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, "Must not contain special characters");
  validateField("release", state.release, null, "Please enter a release");
  validateField("background_image", state.background_image, null, "Please select a image");
  validateField("genres", state.genres?.length, null, "Please select min a gender");
  validateField("platforms", state.platforms?.length, null, "Please select min a platform");
  validateField("rating", state.rating, null, "Please enter a number between 0 and 5.");

  return errors;
}
