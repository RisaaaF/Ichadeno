import { renderFileToString } from 'https://deno.land/x/dejs/mod.ts';
import { insert,select } from '../models/pg_models.ts';
import TSql from '../models/sql.ts';
const home = async ({response} :{response:any} ) => {
    const dataTables = await select([
            {text : TSql['KategoriFindAll']},
            {text : TSql['BlogInfoFindAll']}
        ])
    const html = await renderFileToString("./views/home.ejs", {
        data:{
            pemrograman : dataTables[0],
            blogInfo :dataTables[1]
        },
        subview:{
            namafile: "./views/blogmain.ejs",
            showjumbotron:true
        }
    });
    response.body=new TextEncoder().encode(html);
}
const signup = async({response,request,state}:{response:any,request:any,state:any})=>{
    if(!request.hasBody){
        let signupError :string ='';
        if((state.pesanError != undefined) && (state.pesanError != ' ')){
            signupError = state.pesanError;
    }
    const html = await renderFileToString("./views/home.ejs",{
        data :{
            pemrograman :await select({
                text : TSql['KategoriFindByKode'],
                args : ['php']
            }),
            blogInfo:await select({
                text:TSql['BlogInfoFindAll']
            }),
            statusSignup:signupError
        },
        subview : {
            namafile :"./views/signup.ejs",
            showjumbotron : false
        }
    });
    response.body = new TextEncoder().encode(html);
    }else{
        const body =await request.body().value;
        const parseData = new URLSearchParams(body);
        const namalengkap= parseData.get("fullname");
        const namauser= parseData.get("username");
        const passwd= parseData.get("pass");
        let hasil = await insert({
            text:TSql['InsUser'],
            args : [namauser,namalengkap,passwd]
        });
        if(hasil[0]== 'Sukses'){
            state.pesanError = '';
            response.body = "Sukses menyimpan data ke database";
        }else{
            state.pesanError = hasil[1];
            response.redirect('/daftar');
        }
    }
}
const kategori = async({params,response}:{params:{id:string},response:any})=>{
    response.body="ID Parameter : " + params.id;
}
export { home, signup,kategori}