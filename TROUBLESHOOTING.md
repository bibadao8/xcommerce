# 🔧 Hướng dẫn khắc phục lỗi Trendora Website

## 🚨 Các lỗi đã gặp phải

### 1. Lỗi JavaScript DOM null
```
share-modal.js:1 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
sharebx.js:8 1
css.js:38 cssjs
```

**Nguyên nhân:** Scripts bên ngoài (có thể từ browser extensions) cố gắng truy cập DOM elements không tồn tại.

**Đã khắc phục:**
- ✅ Tạo `errorHandler.js` utility
- ✅ Thêm global error handler trong `main.jsx`
- ✅ Lọc và suppress lỗi từ external scripts

### 2. Lỗi CORS
```
Access to XMLHttpRequest at 'https://xcommerce-iota.vercel.app/api/products?...'
from origin 'https://xcommerce-5rlx-r6dalxgav-bis-projects-90e2b389.vercel.app'
has been blocked by CORS policy
```

**Nguyên nhân:** Backend không cho phép domain frontend gọi API.

**Đã khắc phục:**
- ✅ Cập nhật CORS configuration trong `backend/server.js`
- ✅ Thêm tất cả domain Vercel vào whitelist
- ✅ Cập nhật environment variables

### 3. Lỗi Extension Chrome
```
Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.
```

**Nguyên nhân:** Lỗi từ Chrome Extension, không liên quan code của bạn.
**Giải pháp:** Có thể bỏ qua, không ảnh hưởng website.

## 🛠️ Các bước khắc phục đã thực hiện

### A. Cập nhật Backend CORS
```javascript
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://*.vercel.app',
        'https://*.vercel.com',
        'https://xcommerce-o3vh-6fydfc270-bis-projects-90e2b389.vercel.app',
        'https://xcommerce-5rlx-r6dalxgav-bis-projects-90e2b389.vercel.app',
        'https://xcommerce-iota.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))
```

### B. Cập nhật Environment Variables
```bash
# frontend/.env.production
VITE_BACKEND_URL=https://trendora-backend.onrender.com

# frontend/.env.production.local
VITE_BACKEND_URL=https://trendora-backend.onrender.com
```

### C. Tạo Error Handler
- ✅ `frontend/src/utils/errorHandler.js`
- ✅ Global error suppression cho external scripts
- ✅ Safe DOM operations

## 🚀 Các bước tiếp theo

### 1. Deploy Backend
```bash
cd backend
git add server.js
git commit -m "Update CORS configuration for all Vercel domains"
git push origin main
```

### 2. Deploy Frontend
```bash
cd frontend
git add .
git commit -m "Add error handler and update environment variables"
git push origin main
```

### 3. Cập nhật Vercel Environment Variables
Trong Vercel Dashboard:
- `VITE_BACKEND_URL`: `https://trendora-backend.onrender.com`
- `VITE_PAYPAL_CLIENT_ID`: `AfcgYv0ppduwYID2zSRKGJ_JwsBhpGotrq8TynksmosJW2VsAuMnNWCVZF4c9ejqOdOAjuXZb__MIfAd`

## ✅ Kiểm tra sau khi deploy

1. **Console Errors:** Không còn lỗi DOM null
2. **CORS Errors:** Không còn lỗi CORS
3. **API Calls:** Tất cả API endpoints hoạt động
4. **User Authentication:** Đăng nhập/đăng ký hoạt động
5. **Product Loading:** Sản phẩm load được từ backend

## 🔍 Debug thêm nếu cần

### Kiểm tra Network Tab
- Xem các API calls có thành công không
- Kiểm tra response headers có CORS headers không

### Kiểm tra Console
- Lọc lỗi theo source
- Xem có lỗi nào từ code của bạn không

### Test API trực tiếp
```bash
curl -H "Origin: https://your-frontend.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://trendora-backend.onrender.com/api/products
```

## 📞 Hỗ trợ

Nếu vẫn gặp vấn đề:
1. Kiểm tra logs backend
2. Kiểm tra Vercel deployment logs
3. Test API endpoints trực tiếp
4. Kiểm tra environment variables 