const fs = require('fs');

fs.readFile('txt/readme.txt', 'utf8', (err, data)=> {
    try{
        console.log(data)

        fs.writeFile('txt/result.txt', data, 'utf8', (err)=>{
            if(err){
                console.error('Error writing to file:', err);
            }
        })

    }catch (err){
        console.error(err.message)
    }
})

console.log('Does the file Result.txt exist:',  fs.existsSync('txt/result.txt'))


const dirPath = 'testFolder';

if(!fs.existsSync(dirPath)){
    fs.mkdir(dirPath, {recursive: true}, (err)=> err && console.log(err.message))
} else if (fs.existsSync(dirPath)){
    console.log(`${dirPath} Exists already`)
}