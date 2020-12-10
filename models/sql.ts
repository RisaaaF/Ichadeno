interface ISql {[index :string] : string;}
const TSql = {} as ISql;
TSql ['KategoriFindAll'] = "select*from tbl_kategori;";
TSql ['KategoriFindByKode'] = "select*from tbl_kategori where kode = $1;";
TSql ['KategoriFindInKode'] = "select*from tbl_kategori where kode in ($1,$2,$3);";
TSql ['BlogInfoFindAll'] = "select*from tbl_bloginfo;";
TSql ['InsUser'] = "insert into tbluser (username,fullname,pass) values ($1,$2,MD5($3));";
export default TSql;