// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var parsed;

  function testBool(string) {
    if (string==="true") {
      return true
    }
    else if (string==="false") {
      return false
    }
    else if (string==="null") {
      return null
    }
  }
  //test for easy 1 item Json and just return that
  if(json[0]==='"'){
    return json.slice(1,json.length-1)
  }
  else if (json[0]==='[') {
    var arr = json.split("");
    //handling empty arrays
    if (arr[1]==="]"){
      return undefined;
    } 
    arr.pop();
    arr.shift();
    //handle array
    //split the string
    arr.forEach(function(x, index){
       
    });
      //traverse the array
        //ignore arrays and objects and strings
        //mark index of commas
        //call parse json on values between commas
          //return full array
  }
  else if (json[0]==='{') {
    //handle object
  }
  else {
    //handle values
    if (parseFloat(json) === NaN){
      return testBool(json);
    }
    else{
      return parseFloat(json);
    }
  }
 /* function findArray(data) {
    var count = 0;
    var startArray;
    var endArray;
    data.split('"').forEach(function(datum){
      if (datum[0]==='"') {
        //continue   
    }
    else {
      datum.split('').forEach(function(x,key){
        if (x==="]"&&count===0) {
          endArray=key
        }
        if (x==="["&&count===0) {
          startArray=key;
        }
        if(x === "["){
          count++;
        }
        if (x === "]"){
          count--;
        }
      })
    }
    })
    return data.slice(startArray,endArray)
  }

  function findObject(data) {
    var count = 0;
    var startObj;
    var endObj;
    data.split('"').forEach(function(datum){
      if (datum[0]==='"') {
        //continue   
    }
    else {
      datum.split('').forEach(function(x,key){
        if (x==="}"&&count===0) {
          endArray=key
        }
        if (x==="{"&&count===0) {
          startArray=key;
        }
        if(x === "{"){
          count++;
        }
        if (x === "}"){
          count--;
        }
      })
    }
    })
    return data.slice(startObj,endObj)
  }
*/
  //for each part

    //check for type
      //pass in type function
        //add to parsed

  return parsed
};
