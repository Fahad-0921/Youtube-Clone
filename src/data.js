export const API_KEY = "AIzaSyABpkYcljR896aFbbP3sNnr8XvzX__a9IM";


export const value_converter = (value) =>{
      if(value >= 1000000)
      {
        return Math.floor(value/1000000) + "M";
      }
      else if(value >= 1000)
      {
        return Math.floor(value/1000) + "K";   
      }
      else
      {
         return value;
      }
}



