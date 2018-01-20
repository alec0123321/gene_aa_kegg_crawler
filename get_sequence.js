const request = require('request');
const cherrio = require('cheerio');
const fs = require('fs');

fs.readFile('gene_list2.txt',function(error, content){
  if (error){
    console.log('File error');
  } else {
    var data = content.toString();
    // console.log(data);
    var data_line = data.split('\t');
    console.log(data_line);
  }
});
