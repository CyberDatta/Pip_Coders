fs = require('fs');










class generator{
    constructor(bank_name){
        //pls don't fuck up


    this.source = JSON.parse(fs.readFileSync(__dirname + './uploads/' + bank_name + 'source.json'));
    // console.log(this.source);

    this.target = JSON.parse(fs.readFileSync(__dirname + './uploads/' + bank_name + 'target.json'));
    // console.log(this.target);

    fs=require('fs');
    const stringValue = fs.readFileSync(__dirname + './uploads/' + bank_name + 'mapping.csv',
                {encoding:'utf8', flag:'r'});
    // function get_source_json() {
    //     var source_obj = JSON.parse(fs.readFileSync(__dirname+'/source.json'));
    //     console.log(source_obj);
    //   }
    //   //get_source_json()
    
    
    const formattedString = stringValue.trim().split('\n');
    // //console.log(formattedString[0])
    
    // //we dont need 1st row so index must start from 1
    this.mapping={}
    for (let i = 1; i < formattedString.length; i++) {
        const elements = formattedString[i].split(', ');
        //console.log(elements)
        const target = elements[1];
        const source = elements[2];
        const enumm = elements[3];
        const arr=[]
        arr.push(source);
        if(enumm!='-'){
            arr.push(enumm)
        }
        this.mapping[target]=arr;
    
      }
    //   console.log(this.mapping)
}
}
gart=new generator(); 
module.exports.generator=generator;







// //console.log(formattedString[0])

// //we dont need 1st row so index must start from 1
