export const mapArrayToDataSection = (array) => {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let data = [];
    let indexItem = 0;
    let titleRef = '+';
    let indexFirst = 0;
    let indexLast = 0;
    
    array.forEach((item, index) => {
      // only uses for array with format [{name: ....}]
      // if you want to use with different format, please change this following code below
      let title = item.name[0].toUpperCase();     
      if (title !== titleRef && alphabet.indexOf(title) !== -1){
        let objectRef = {
          title: titleRef,
          data: array.slice(indexFirst, index),
        };
        data[indexItem] = [];
        data[indexItem].push(objectRef);
        indexItem++;
        titleRef = title
        indexFirst = index;
      } 
      if (index === array.length - 1) {
        let objectRef = {
          title: titleRef,
          data: array.slice(indexFirst, index + 1),
        }
        data[indexItem] = [];
        data[indexItem].push(objectRef);
        indexItem++;
      }
    });

    // console.log(data);
    return data;
}