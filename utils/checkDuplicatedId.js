function checkDuplicatedId (array) {
    let obj = {};
     for (let i = 0; i < array.length; i++) {
       obj = {...obj, [array[i].id]: array[i]}
     }
    return Object.values(obj).sort((a, b) => b.id - a.id);
  }
  
  export default checkDuplicatedId;
  