# Hướng dẫn Deploy Trendora Website lên Vercel

## Cấu trúc dự án
- **Frontend**: React + Vite (deploy lên Vercel)
- **Backend**: Node.js + Express (deploy lên Render/Heroku/Railway)

## Bước 1: Deploy Backend

### Option 1: Render (Miễn phí)
1. Đăng ký tài khoản tại [render.com](https://render.com)
2. Tạo "Web Service" mới
3. Connect với GitHub repository
4. Cấu hình:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Copy từ file `backend/.env`

### Option 2: Railway
1. Đăng ký tại [railway.app](https://railway.app)
2. Deploy từ GitHub
3. Set environment variables

### Option 3: Heroku
1. Tạo app mới trên Heroku
2. Deploy từ GitHub
3. Set config vars

## Bước 2: Deploy Frontend lên Vercel

1. **Đăng ký Vercel**: Truy cập [vercel.com](https://vercel.com)
2. **Import Project**: Chọn "Import Git Repository"
3. **Chọn Repository**: Chọn repo GitHub của bạn
4. **Cấu hình Build**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. **Environment Variables**: 
   - `VITE_BACKEND_URL`: URL backend đã deploy (VD: `https://your-app.onrender.com`)
   - `VITE_PAYPAL_CLIENT_ID`: PayPal Client ID

## Bước 3: Cập nhật Backend URL

Sau khi deploy backend, cập nhật:
1. `frontend/.env.production`
2. Environment variables trên Vercel
3. CORS settings trong backend (nếu cần)

## Bước 4: Test

1. Kiểm tra frontend hoạt động
2. Test đăng nhập/đăng ký
3. Test các chức năng chính
4. Kiểm tra console errors

## Lưu ý quan trọng

- **Backend URL**: Phải sử dụng HTTPS
- **CORS**: Backend phải cho phép domain Vercel
- **Environment Variables**: Không commit file .env
- **Database**: MongoDB Atlas đã được cấu hình sẵn

## Troubleshooting

### Lỗi CORS
```javascript
// Trong backend/server.js
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### Lỗi Build
- Kiểm tra Node.js version
- Xóa node_modules và package-lock.json
- Chạy `npm install` lại

### Lỗi API
- Kiểm tra backend URL
- Kiểm tra environment variables
- Kiểm tra logs backend 