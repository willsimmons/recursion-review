// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
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
  //test for easy 1 item Json and just return that
  if(json[0]==='"'){
    if (json==='""') {
      return '';
    }
    var string=json.slice(1,json.length-1).split('')
    var escaped = false;
    var toDelete = [];
    string.forEach(function(letter,index){
      if(letter === "\\" && escaped === false){
        escaped = true;
        toDelete.push(index);
      }
      else if(escaped ===true){
        //just in case
        escaped=false;
      }
    });
    return string.filter(function(x,i){
      if (toDelete.includes(i)) {
        return false
      } else {
        return true
      }
    }).join('')
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
    var afterComma = false

    var keys = [];
    var values = [];
    var afterCommas = [];


    obj.forEach(function(x,i){
      if (afterComma===true) {
        if (x===" ") {
          afterCommas.push(1);
          afterComma = false
        }
        else {
          afterCommas.push(0)
          afterComma = false;
        }
      }
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
          values.push([i+1]);
          afterComma = true;
          //values.push([i+2])
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
      result[obj.slice(objKeys[0],objKeys[1])] = parseJSON(obj.slice(values[index][0]+afterCommas[index],values[index][1]))
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

/* 
[' +
    '{"documentation":"Displays a dialog box that allows user to ' +
    'select a folder on the local system.","name":' +
    '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
    'callback function for results.","name":"callback","required":' +
    'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
    ' in the folder provided.","name":"UploadFolder","parameters":' +
    '[{"documentation":"The path to upload mp3 files from."' +
    ',"name":"path","required":true,"type":"string"},{"documentation":' +
    ' "The callback function for progress.","name":"callback",' +
    '"required":true,"type":"callback"}]},{"documentation":"Returns' +
    ' the server name to the current locker service.",' +
    '"name":"GetLockerService","parameters":[]},{"documentation":' +
    '"Changes the name of the locker service.","name":"SetLockerSer' +
    'vice","parameters":[{"documentation":"The value of the locker' +
    ' service to set active.","name":"LockerService","required":true' +
    ',"type":"string"}]},{"documentation":"Downloads locker files to' +
    ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
    'documentation":"The origin path of the locker file.",' +
    '"name":"path","required":true,"type":"string"},{"documentation"' +
    ':"The Window destination path of the locker file.",' +
    '"name":"destination","required":true,"type":"integer"},{"docum' +
    'entation":"The callback function for progress.","name":' +
    '"callback","required":true,"type":"callback"}]}]

    */
