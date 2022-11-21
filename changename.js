const fs = require('fs')

for(var i=1;i<=550;i++){
    var contents = fs.readFileSync("./metadata/"+i+".json");
    // console.log(contents.toString())
    let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
    let input = contents.toString(); // this is the initial string of data
    let correct = input.replace(regex, ''); // remove all trailing commas
    let data = JSON.parse(correct); // build a new JSON object based on correct string
    data.image = "ipfs://QmXb2dFAEwEjEVtihqS5B5DsAiCKaNU74iG8YBFqnVHhFP/"+i+".jpeg"
    console.log(data["image"])
    fs.writeFileSync('./metadata500/'+i, JSON.stringify(data));
}
