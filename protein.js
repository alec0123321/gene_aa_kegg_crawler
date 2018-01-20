const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
// url example
//  animo acid
// http://www.genome.jp/dbget-bin/www_bget?-f+-n+a+pan:PODANSg724
// nucleotide
//http://www.genome.jp/dbget-bin/www_bget?-f+-n+n+pan:PODANSg724
let full_aa = ''
const url = 'http://www.genome.jp/dbget-bin/www_bget?-f+-n+a+'

fs.readFile('gene_list.txt', function(error, content){
  if(error){
    console.log('File error')
  }else{
    const data = content.toString()
    const data_line = data.split('\n')
    let datas = ''
    for(let i=0;i<data_line.length-1;i++){
      data_line[i] = data_line[i].toLowerCase()
      datas = url+data_line[i]+data_line[i+1]
      if((i%2)==0){
        // console.log(datas);
        request(datas, (err,res,body)=>{
          const $ = cheerio.load(body)
          let seq = []
          $('div pre').each(function(i, elem){
            seq.push(
              $(this)
                .text()
                .split('\n')
            )//push
          })//each
          // console.log(seq[0].length)
          for(let i=0;i<seq[0].length; i++){
            full_aa = full_aa + seq[0][i] + '\n'
          }
          // console.log(full_aa);
          fs.writeFile('full_aa.txt', full_aa, (err)=>{
            if(err) throw err
            console.log('It\'s saved')
          })//writeFile
        })//request

      }//if
    }//for
  }//else
})//fs
