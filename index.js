// 1 import thư viện 
const { log } = require('console');
const e = require('express');
const express =require('express');
const mongoose = require('mongoose');
// tạo đối tượng mới cho express
const app = express();
app.set('view engine','ejs');
//2 kết nối vs csdl mongodb
// mongoose.connect('mongodb+srv://canhptph44323:Canh111989998@cluster0.goemyij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
//     useNewUrlPaser: true, // hỗ trợ người d truy cập url
//     useUnifiedTopology: true // hỗ trợ xác minh Topology
// }).then(()=>{
//     console.log("kết nối thành công vs mongodb");
// }).catch(err =>{ 
//     console.log("Lỗi :",err);
// });
mongoose.connect('mongodb+srv://canhptph44323:Canh111989998@cluster0.goemyij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true, // sửa lại thành useNewUrlParser
    useUnifiedTopology: true
}).then(()=>{
    console.log("Kết nối thành công với MongoDB");
}).catch(err =>{ 
    console.log("Lỗi:",err);
});

// truy vấn csdl 
//4 chọn csdl thao tác 
const android_API =mongoose.connection.useDb('android_API');
//5 định nghĩa model cho bảng dữ liệu
const sinhVienSchema =new mongoose.Schema({
    masv: String,
    tensv: String
});
// 6 ánh xạ model vào bảng dữ liệu
const sinhVien = android_API.model('sinhvienmau',sinhVienSchema);
 // 7 tạo link để triệu gọi trên trình duyệt
 app.get('/sinhvien',async(req,res)=>{
    try {
        const sinhviens= await sinhVien.find(); //đọc dữ liệu từ bảng sinh vien
        if(sinhviens.length>0){ // nếu có tồn tại dữ liệu
            //res.json(sinhviens);//api trả về kq 
            res.render('students',{sinhvienmaus: sinhviens});
            console.log(sinhviens);// log ra 
        }else{
            res.status(404).json({error:"khong có sv"});
        }
    } catch (error) {
        console.error("lỗi đọc dữ liệu");
        res.status(500).json({error:"đọc dữ liệu lỗi"});
    }
 })

//3 khởi chạy máy chủ
const PORT =process.env.PORT|| 5000;
app.listen(PORT,()=>{
    console.log('server đang chạy ở cổng 5000');
})
module.exports=app;