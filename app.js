fs = require('fs');

const express = require('express')
const upload = require('express-fileupload')

template_modifier = require('./generator.js');
temp = template_modifier.generator;

const app = express()
app.use(upload())
app.use(express.static('public'))
app.all('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');

})

app.post('/',(req,res)=>{

    if(req.files){
        console.log(req.files)
        var file=req.files.file
        var filename= file.name
        console.log(filename)
        file.mv('./Pip_Coders-main/static/bank_uploads' + filename,function(err){
            if(err){
                res.send(err)
            }else{
                res.send("Files uploaded successfully")
            }
        })
    }
    // upload 3 files and name
})


app.get('/forms',(req,res)=>{
    
    var output = {

    };
    

    const operators = {'>':1, '<':2, '==':3, '<=':4, '>=':5, "!=":6};
    function extractor(string_var,flag=-1,op2) {
        let string_var_plac = string_var;
        let formattedString = string_var_plac.split('.');
        value = req.body
    
    
        while (formattedString.length > 0) {
            if (formattedString[0] == '') {
                formattedString.shift();
            }
            if (formattedString[0] == 'item') {
                after_item=formattedString[1]
                for (let element of value) {
                    switch(flag) {
                        case 1:
     
                            if(element[after_item]>op2){
                                return element;
                            }
                        case 2:
                            if(element[after_item]<op2){
                                return element;
                            }
                            break;
                        
                        case 3:
                            console.log(op2,element[after_item]);
                            if(element[after_item]=op2){
                                return element;
                            }
                            break;
                        case 4:
                            if(element[after_item]<=op2){
                                return element;
                            }
                            break;
                        case 5:
                            if(element[after_item]>=op2){
                                return element;
                            }
                            break;
                        case 6:
                            if(element[after_item]!=op2){
                                return element;
                            }
                            break;
                      }
                  }
                  return false;
            } else {
                value = value[formattedString[0]]
            }
            formattedString.shift();
        }
        return value;
    
    
    }
    function enum_extractor(formatted_enum_spec, enum_obj) {
        placeholder = extractor(formatted_enum_spec[1]);
        return enum_obj[placeholder];
    }
    
    function addition(string1, string2) {
        return extractor(string1) + extractor(string2);
    }
    
    Object.entries(wrapper.target).forEach(([key, value]) => {
        string_of_interest = wrapper.mapping[key];
        // console.log(string_of_interest);
        // console.log(key);
        if (string_of_interest.length > 1) {
            var myobj = JSON.parse(string_of_interest[1]);
            if (string_of_interest[0].includes('+')) {
                string_of_interest[0] = string_of_interest[0].replace('(', '');
                string_of_interest[0] = string_of_interest[0].replace(')', '');
                formattedString = string_of_interest[0].split('+');
                // console.log(formattedString);
                for (i = 0; i < formattedString.length; i++) {
                    formattedString[i] = formattedString[i].trim();
                    formattedString[i] = formattedString[i].replaceAll(`"`, '');
                }
                collection = '';
                // console.log(formattedString);
                for (i = 0; i < formattedString.length; i++) {
                    // console.log(formattedString.length);
                    if (formattedString[i].includes('ENUM')) {
                        split_enum = formattedString[i].split(' ');
                        // console.log(formattedString.length); //test
                        // console.log(formattedString)  //test
                        collection = collection + enum_extractor(split_enum, myobj);
                        // console.log(formattedString)  //test
                        // console.log(formattedString.length); //test
                    }
                    else if (formattedString[i].includes('.')) {
                        collection = collection + extractor(formattedString[i]);
                    }
                    else {
                        collection = collection + formattedString[i];
                    }
                }


            }
    
    
    
            else {
                string_of_interest[0] = string_of_interest[0].replace('(', '');
                string_of_interest[0] = string_of_interest[0].replace(')', '');
                formattedString = string_of_interest[0].split(' ');
                output[key] = enum_extractor(formattedString, myobj);
    
            }
    
            // console.log(formattedString);
        }
        else if (string_of_interest.length === 1) {
            // console.log(string_of_interest);
            // console.log(key);
            string_of_interest[0] = string_of_interest[0].replace('(', '');
            string_of_interest[0] = string_of_interest[0].replace(')', '');
            formattedString = string_of_interest[0].split(' ');
    
            // console.log(formattedString);
            if (formattedString[0] == 'IF') {
                output[key]=extractor(formattedString[1],operators[formattedString[2]],formattedString[3]);
            }
            else if (formattedString.includes('+')) {
    
                output[key] = addition(formattedString[0], formattedString[2]);
            }
            else {
                output[key] = extractor(formattedString[0]);
            }
        }
    });
    res.json(output);

});

app.listen(5000)