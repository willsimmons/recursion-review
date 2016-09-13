// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  console.log(json)
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
    else {
      return "number"
    }
  }
  console.log(testBool("null"))
  //test for easy 1 item Json and just return that
  if(json[0]==='"'){
    if (json==='""') {
      return '';
    }
    return json.slice(1,json.length-1)
  }
  else if (json[0]==='[') {
    //handle arrays
    var arr = json.split("");
    //handling empty arrays
    if (arr[1]==="]"){
      return [];
    } 
    arr.pop();
    arr.shift();

    var commaIndexes = []
    var spaceIndexes = [];

    var skippingObject = false;
    var skippingArray = false;
    var skippingString = false;
    var afterComma = false;
    var count = 0;
    //handle array
    //split the string -gathering all indices within our JSON string
    arr.forEach(function(x, index){
       //if we run into [,{," start skipping until that value ends
       //handling array's
      if(afterComma === true && skippingString === false){
        if (x===" ") {
          spaceIndexes.push(1)
        }
        else {
          spaceIndexes.push(0)
        }

      }
      if(skippingString === true){
        if(x==='"'){
          skippingString = false;
        }
      }
       else if (skippingArray===true) {
          if (x ==='"'){
            skippingString = true;
          }
          else if (x==='[') {
            count++;
          } 
          else if (count===0 && x==="]") {
            skippingArray = false;
          }
          else if (count!==0 && x==="[") {
            count--;
          }
       }
       else if (skippingObject===true) {
          if (x ==='"'){
            skippingString = true;
          }
          else if (x==='{') {
            count++;
          } 
          else if (count===0 && x==="}") {
            skippingObject = false;
          }
          else if (count!==0 && x==="{") {
            count--;
          }
       }
       else if(x ==='{'){
        skippingObject = true;
       }
       else if(x ==='['){
        skippingArray = true;
       }
       else if(x===','){
        commaIndexes.push(index);
        afterComma = true;
       }

    });

     var result = [];

     arr = arr.join('')

     

     if (commaIndexes.length === 0){
      return [parseJSON(arr)]
     }

     commaIndexes.push(arr.length);


  commaIndexes.forEach(function(x,i){
    if (i===0){
     result[i] = parseJSON(arr.slice(0,x));
    }else {
     result[i] = parseJSON(arr.slice(commaIndexes[i-1] + 1+spaceIndexes[i-1],x));
   }
  });
    
     
    return result

  }
  else if (json[0]==='{') {
    //handle object
    if (json[1]==="}") {
      return {}
    }
    var obj = json.split("");
    obj.pop();
    obj.shift();


    var skippingObject = false;
    var skippingArray = false;
    var skippingString = false;
    var count = 0;

    var keyParse = false;
    var valueParse = false;

    var keys = [];
    var values = [];


    obj.forEach(function(x,i){
      if (valueParse===true) {
        if(skippingString === true){
        if(x==='"'){
          skippingString = false;
        }
      }
       else if (skippingArray===true) {
          if (x ==='"'){
            skippingString = true;
          }
          else if (x==='[') {
            count++;
          } 
          else if (count===0 && x==="]") {
            skippingArray = false;
          }
          else if (count!==0 && x==="[") {
            count--;
          }
       }
       else if (skippingObject===true) {
          if (x ==='"'){
            skippingString = true;
          }
          else if (x==='{') {
            count++;
          } 
          else if (count===0 && x==="}") {
            skippingObject = false;
          }
          else if (count!==0 && x==="{") {
            count--;
          }
       }
       else if(x ==='{'){
        skippingObject = true;
       }
       else if(x ==='['){
        skippingArray = true;
       }
       else if (x === ',') {
        values[values.length-1].push(i);
        valueParse = false
       }
      }
      if (keyParse===false) {
        if (x===":"){
          valueParse = true;
          values.push([i+2])
        }
        if(x === '"' && valueParse===false){
          keyParse = true;
          keys.push([i+1])
        }
      }
      else if (keyParse===true) {
        if (x==='"') {
          keys[keys.length-1].push(i);
          keyParse = false;
        }
      }
    })
    if (obj[obj.length-1] === " "){
     obj.pop();
    }
    obj=obj.join('')
    values[values.length-1].push(obj.length)
    var result = {}
    keys.forEach(function(objKeys,index){
      result[obj.slice(objKeys[0],objKeys[1])] = parseJSON(obj.slice(values[index][0],values[index][1]))
    })
    console.log(result);
    return result
  }
  else {
    //handle values
    if (testBool(json) === "number"){
      return parseFloat(json);
    }
    else{
      return testBool(json);
    }
  }
};
