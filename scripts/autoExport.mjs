import fs from 'fs-extra'
//fs-extra 中 readdir 和 writeFile
//readdir 读取目录下的文件名跟文件夹名称
//writeFile 写入文件
fs.readdir('./src/components').then(files=>{
    if(Array.isArray(files)){
        console.log('files',files)
        let exportStr="";
        files.forEach((item)=>{
            console.log('即将进')
            if(fs.lstatSync(`./src/components/${item}`).isDirectory()
                /*&& /^([A-Z][a-z])*$/.test(item)&&fs.existsSync(`./src/components/${item}/index.tsx`)*/){
                console.log('进？')
                exportStr+=`export * from './components/${item}'\n`
            }
        });
        fs.writeFile('./src/index.export.ts',exportStr)
    }
}).catch(err=>console.log(err))