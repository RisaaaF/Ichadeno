import {Client} from 'https://deno.land/x/postgres/mod.ts';
import {QueryResult,QueryConfig} from 'https://deno.land/x/postgres/query.ts';
const client = new Client ({
    hostname:"localhost",
    port:5433,
    user:"postgres",
    password:"postgres12",
    database:"blog"
});
export async function select(qry : QueryConfig | QueryConfig[]):Promise<any[]>{
    await client.connect();
    let table : any =[]
    let hasil : QueryResult | QueryResult[];
    if (Array.isArray(qry)){
        hasil = await client.multiQuery(qry);
        hasil.forEach((obj)=>{
            table.push(obj.rowsOfObjects());
        });
    }
    else{
        hasil=await client.query(qry);
        table=hasil.rowsOfObjects()
    }
    await client.end();
    return table;
}
export async function insert(qry : QueryConfig):Promise<any[]>{        
    let tables : any = [];
    try{
        await client.connect();
        let hasil : QueryResult = await client.query(qry);
        await client.end();
        console.log(hasil);
        tables[0]='Sukses';
        tables[1]='Jumlah baris yang tersimpan'+hasil.rowCount;
    } catch (error){
        tables[0] = 'Gagal';
        tables[1]=`${error}`;
    }
    return tables;
}