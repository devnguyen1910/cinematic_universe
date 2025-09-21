<div align="center">
  <h1>🎬 CGV Cinema System</h1>
  <p><strong>Hệ thống đặt vé xem phim trực tuyến chuyên nghiệp</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/MongoDB-4.4+-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </p>

  <p>
    <img src="https://img.shields.io/github/license/devnguyen1910/cinematic_universe?style=for-the-badge" alt="License" />
    <img src="https://img.shields.io/github/stars/devnguyen1910/cinematic_universe?style=for-the-badge" alt="Stars" />
    <img src="https://img.shields.io/github/forks/devnguyen1910/cinematic_universe?style=for-the-badge" alt="Forks" />
  </p>
</div>

---

## 📖 Giới thiệu

**CGV Cinema System** là một hệ thống đặt vé xem phim trực tuyến hoàn chỉnh, được xây dựng với công nghệ hiện đại và tính năng tương tự CGV Cinemas. Hệ thống cung cấp trải nghiệm đồng bộ từ việc duyệt phim, đặt vé, chọn ghế, đến thanh toán và quản lý rạp chiếu.

### 🎯 Tầm nhìn dự án
Tạo ra một nền tảng giải trí kỹ thuật số toàn diện, kết nối người yêu phim với những trải nghiệm điện ảnh tuyệt vời nhất, đồng thời hỗ trợ các rạp chiếu trong việc quản lý và tối ưu hóa doanh thu.

## ✨ Tính năng nổi bật

### 🎭 Trải nghiệm người dùng
- **🎬 Khám phá phim**: Duyệt và tìm kiếm phim với bộ lọc thông minh
- **❤️ Danh sách yêu thích**: Lưu phim để xem sau
- **🌙 Chế độ tối/sáng**: Tự động theo hệ thống hoặc tùy chỉnh
- **🔔 Thông báo thời gian thực**: Toast notifications cho mọi hành động
- **⭐ Hệ thống đánh giá**: Đánh giá và bình luận phim
- **📱 Thiết kế responsive**: Tối ưu cho mọi thiết bị
- **⏰ Bộ đếm đặt vé**: Đếm ngược thời gian giữ ghế
- **🪑 Chọn ghế tương tác**: Sơ đồ ghế trực quan với trạng thái realtime

### 🔧 Hạ tầng kỹ thuật
- **🔐 Bảo mật**: JWT authentication, bcrypt, rate limiting
- **🗄️ Cơ sở dữ liệu**: MongoDB với Mongoose ODM
- **📧 Email**: Hệ thống gửi email tự động
- **💳 Thanh toán**: Tích hợp Stripe (sẵn sàng)
- **🛡️ Bảo vệ**: CORS, Helmet.js, input validation
- **📊 Logging**: Morgan request logging
- **⚡ Performance**: Caching, optimization

### 🎫 Hệ thống đặt vé CGV
- **🏢 Đa rạp**: Quản lý nhiều địa điểm rạp chiếu
- **🎦 Định dạng đa dạng**: 2D, 3D, IMAX, Dolby Atmos
- **🌍 Đa ngôn ngữ**: Phụ đề và lồng tiếng
- **💰 Giá linh hoạt**: Theo giờ, ngày, loại ghế
- **🍿 Đồ ăn & thức uống**: Đặt combo trước
- **🎁 Khuyến mãi**: Mã giảm giá, ưu đãi thành viên

## 🛠 Công nghệ sử dụng

<table>
<tr>
<td width="50%">

### Frontend
- **⚛️ React 19.1.1** với TypeScript
- **⚡ Vite 6.2.0** - Build tool siêu nhanh
- **🎨 Tailwind CSS 3.4.0** - Utility-first CSS
- **🧭 React Router DOM 7.9.1** - Client-side routing
- **🔄 Context API** - State management
- **🤖 Google Gemini AI** - Tích hợp AI

</td>
<td width="50%">

### Backend
- **🟢 Node.js + Express.js 4.18.2**
- **🍃 MongoDB + Mongoose 8.0.3**
- **🔑 JWT + bcryptjs** - Authentication
- **🛡️ Helmet + CORS** - Security
- **📧 Nodemailer 6.9.7** - Email service
- **💳 Stripe 14.9.0** - Payment processing
- **📝 TypeScript 5.3.3** - Type safety

</td>
</tr>
</table>

### 🔗 APIs & Services
- **🎬 TMDB API** - Cơ sở dữ liệu phim
- **🤖 Gemini AI** - Tạo nội dung thông minh
- **💳 Stripe** - Cổng thanh toán
- **📧 SendGrid** - Email marketing (tùy chọn)

## 🚀 Hướng dẫn cài đặt

### 📋 Yêu cầu hệ thống
- **Node.js** v18 trở lên
- **MongoDB** (local hoặc cloud)
- **npm/yarn** package manager
- **Git** version control

### ⚙️ Cài đặt nhanh

#### 1️⃣ Clone repository
```bash
git clone https://github.com/devnguyen1910/cinematic_universe.git
cd cinematic_universe
```

#### 2️⃣ Setup Backend
```bash
cd backend
npm install
cp .env.example .env.local
# Chỉnh sửa .env.local với cấu hình của bạn
npm run build
npm run dev
```

#### 3️⃣ Setup Frontend
```bash
cd ..  # Về thư mục gốc
npm install
cp .env.example .env.local
# Thêm API keys vào .env.local
npm run dev
```

#### 4️⃣ Truy cập ứng dụng
- **🎭 Frontend**: http://localhost:5173
- **🔧 Backend API**: http://localhost:8888
- **💓 Health Check**: http://localhost:8888/health

### 🔧 Cấu hình nâng cao

#### Frontend (.env.local)
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_API_BASE_URL=http://localhost:8888/api/v1
VITE_APP_NAME="CGV Cinema System"
```

#### Backend (.env.local)
```env
NODE_ENV=development
PORT=8888
CLIENT_URL=http://localhost:5173

# Database
DATABASE_LOCAL=mongodb://localhost:27017/cgv_cinema
DATABASE=mongodb+srv://username:<password>@cluster.mongodb.net/cgv_cinema
DATABASE_PASSWORD=your_mongodb_password

# JWT Security
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# External APIs
TMDB_API_KEY=your_tmdb_api_key
GEMINI_API_KEY=your_gemini_api_key

# Email (Optional)
EMAIL_FROM=noreply@cgvcinema.com
SENDGRID_API_KEY=your_sendgrid_key

# Payment (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## 📁 Cấu trúc dự án

```
cgv_cinema_system/
├── 📂 backend/                    # Node.js/Express API Server
│   ├── 📂 src/
│   │   ├── 📂 controllers/        # Xử lý logic API
│   │   ├── 📂 models/             # Schema MongoDB
│   │   ├── 📂 routes/             # Định tuyến API
│   │   ├── 📂 middleware/         # Middleware tùy chỉnh
│   │   ├── 📂 utils/              # Hàm tiện ích
│   │   └── 📄 app.ts              # Cấu hình Express
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
├── 📂 components/                 # Components React tái sử dụng
│   ├── 📄 Header.tsx              # Header navigation
│   ├── 📄 MovieCard.tsx           # Card hiển thị phim
│   ├── 📄 SeatMap.tsx             # Sơ đồ chọn ghế
│   └── 📄 StarRating.tsx          # Component đánh giá sao
├── 📂 contexts/                   # React Context providers
│   ├── 📄 BookingContext.tsx      # Quản lý trạng thái booking
│   ├── 📄 ThemeContext.tsx        # Theme dark/light
│   └── 📄 NotificationContext.tsx # Hệ thống thông báo
├── 📂 pages/                      # Các trang chính
│   ├── 📄 HomePage.tsx            # Trang chủ
│   ├── 📄 MoviesPage.tsx          # Danh sách phim
│   ├── 📄 BookingPage.tsx         # Trang đặt vé
│   └── 📄 PaymentPage.tsx         # Thanh toán
├── 📂 services/                   # Services & API calls
│   ├── 📄 tmdbService.ts          # TMDB API integration
│   ├── 📄 geminiService.ts        # Gemini AI service
│   └── 📄 ratingService.ts        # Rating service
├── 📂 data/                       # Dữ liệu mock
├── 📄 package.json                # Dependencies frontend
├── 📄 README.md                   # Tài liệu dự án
└── 📄 FEATURES.md                 # Tracking tính năng
```

## 🔗 API Endpoints

### 🔐 Authentication
```http
POST   /api/v1/auth/signup          # Đăng ký tài khoản
POST   /api/v1/auth/login           # Đăng nhập
POST   /api/v1/auth/logout          # Đăng xuất  
POST   /api/v1/auth/forgot-password # Quên mật khẩu
PATCH  /api/v1/auth/reset-password  # Đặt lại mật khẩu
GET    /api/v1/auth/verify-email    # Xác thực email
```

### 🎬 Movies & Cinemas
```http
GET    /api/v1/movies               # Danh sách phim (có filter/pagination)
GET    /api/v1/movies/:id           # Chi tiết phim
GET    /api/v1/cinemas              # Danh sách rạp chiếu
GET    /api/v1/cinemas/:id/showtimes # Lịch chiếu theo rạp
GET    /api/v1/movies/:id/showtimes # Lịch chiếu theo phim
```

### 👤 User Management
```http
GET    /api/v1/users/me             # Thông tin cá nhân
PATCH  /api/v1/users/update-me      # Cập nhật thông tin
DELETE /api/v1/users/delete-me      # Vô hiệu hóa tài khoản
PATCH  /api/v1/users/update-password # Đổi mật khẩu
GET    /api/v1/users/wishlist       # Danh sách yêu thích
POST   /api/v1/users/wishlist/:movieId # Thêm/xóa yêu thích
```

### 🎫 Booking System
```http
GET    /api/v1/bookings             # Lịch sử đặt vé
POST   /api/v1/bookings             # Tạo booking mới
GET    /api/v1/bookings/:id         # Chi tiết booking
PATCH  /api/v1/bookings/:id         # Cập nhật booking
DELETE /api/v1/bookings/:id         # Hủy booking
GET    /api/v1/showtimes/:id/seats  # Trạng thái ghế ngồi
```

### ⭐ Reviews & Ratings
```http
GET    /api/v1/movies/:id/reviews   # Đánh giá phim
POST   /api/v1/movies/:id/reviews   # Tạo đánh giá
PATCH  /api/v1/reviews/:id          # Sửa đánh giá
DELETE /api/v1/reviews/:id          # Xóa đánh giá
GET    /api/v1/reviews/me           # Đánh giá của tôi
```

### 💳 Payment & Orders
```http
POST   /api/v1/payments/create-intent # Tạo payment intent
POST   /api/v1/payments/confirm      # Xác nhận thanh toán
GET    /api/v1/orders                # Lịch sử đơn hàng
GET    /api/v1/orders/:id            # Chi tiết đơn hàng
POST   /api/v1/concessions/order     # Đặt đồ ăn/nước
```

## 🛠 Scripts hữu ích

### Development
```bash
# Khởi động development server
npm run dev                 # Frontend (port 5173)
cd backend && npm run dev   # Backend (port 8888)

# Build production
npm run build              # Frontend build
cd backend && npm run build # Backend build

# Type checking
npm run type-check         # Check TypeScript types
```

### Database & Migration
```bash
# Seed database với dữ liệu mẫu
cd backend && npm run seed

# Reset database
cd backend && npm run db:reset

# Database backup
cd backend && npm run db:backup
```

### Testing & Quality
```bash
# Chạy tests
npm test                   # Frontend tests
cd backend && npm test     # Backend tests

# Linting & formatting
npm run lint              # ESLint check
npm run lint:fix          # Auto-fix linting
npm run format            # Prettier format
```

## 🎯 Roadmap & Tính năng tương lai

### Phase 1: Core Features ✅
- [x] Hệ thống authentication cơ bản
- [x] CRUD movies và users
- [x] Frontend responsive với React
- [x] API backend hoàn chỉnh

### Phase 2: Advanced Booking 🚧
- [ ] Hệ thống chọn ghế realtime
- [ ] Tích hợp thanh toán Stripe
- [ ] Email notifications
- [ ] Booking timer & seat holding

### Phase 3: CGV Features 📋
- [ ] Quản lý đa rạp chiếu
- [ ] Hệ thống combo F&B
- [ ] Loyalty program
- [ ] Mobile PWA app

### Phase 4: Intelligence 🤖
- [ ] AI movie recommendations
- [ ] Personalized content
- [ ] Analytics dashboard
- [ ] Smart pricing

## 🔒 Bảo mật

### Frontend Security
- **XSS Protection**: Content Security Policy
- **HTTPS Enforcement**: Secure cookie settings
- **Input Validation**: Client-side validation
- **Token Storage**: Secure token handling

### Backend Security
- **Authentication**: JWT with refresh tokens
- **Password Hashing**: bcrypt với salt rounds
- **Rate Limiting**: Chống brute force attacks
- **CORS**: Cấu hình cross-origin requests
- **Helm(t**: Security headers middleware
- **Input Sanitization**: Mongoose & validator.js

## 📊 Performance

### Frontend Optimization
- **Code Splitting**: Lazy loading components
- **Image Optimization**: WebP format, lazy loading
- **Caching**: Service worker caching
- **Bundle Size**: Tree shaking, minification

### Backend Optimization
- **Database Indexing**: MongoDB indexes
- **Query Optimization**: Aggregation pipelines
- **Caching**: Redis caching layer (planned)
- **CDN**: Static asset delivery

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết chi tiết.

### Quy trình Development
1. **Fork** repository này
2. **Tạo branch** tính năng (`git checkout -b feature/TinhNangMoi`)
3. **Commit** thay đổi (`git commit -m 'Thêm tính năng mới'`)
4. **Push** lên branch (`git push origin feature/TinhNangMoi`)
5. **Tạo Pull Request**

### Code Standards
- ✅ Sử dụng TypeScript cho type safety
- ✅ Tuân thủ ESLint/Prettier configurations  
- ✅ Viết commit messages có ý nghĩa
- ✅ Thêm tests cho tính năng mới
- ✅ Comment code phức tạp

## 📄 License

Dự án này được cấp phép theo MIT License - xem file [LICENSE](LICENSE) để biết chi tiết.

## 👥 Tác giả

- **Dev Nguyen** - *Khởi tạo dự án* - [@devnguyen1910](https://github.com/devnguyen1910)

### Contributors
- Bạn có thể là contributor tiếp theo! 🚀

## 🙏 Lời cảm ơn

- 🎬 [TMDB](https://www.themoviedb.org/) - Cơ sở dữ liệu phim
- 🤖 [Google Gemini](https://ai.google.dev/) - AI integration
- ⚛️ [React Team](https://reactjs.org/) - Framework tuyệt vời
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- 🏗️ [Vite](https://vitejs.dev/) - Build tool nhanh chóng
- 🟢 [Node.js Community](https://nodejs.org/) - Runtime environment

## 📞 Hỗ trợ & Liên hệ

Nếu bạn có câu hỏi hoặc cần hỗ trợ:

- 📧 **Email**: devnguyen1910@gmail.com
- 🐛 **Bug Reports**: [Tạo issue](https://github.com/devnguyen1910/cinematic_universe/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/devnguyen1910/cinematic_universe/discussions)
- 🌐 **Website**: https://cgv-cinema-system.vercel.app (coming soon)
- 📱 **Discord**: [Join our community](https://discord.gg/cgv-cinema) (coming soon)

### FAQ (Câu hỏi thường gặp)

<details>
<summary><strong>🔧 Làm sao để setup local development?</strong></summary>

1. Clone repo và cài dependencies
2. Setup MongoDB local hoặc cloud
3. Tạo .env.local files với API keys
4. Chạy `npm run dev` cho cả frontend và backend
</details>

<details>
<summary><strong>🎫 Hệ thống booking hoạt động như nào?</strong></summary>

Hệ thống sử dụng WebSocket để đồng bộ trạng thái ghế realtime, JWT để authenticate users, và timeout mechanism để giải phóng ghế sau thời gian giữ chỗ.
</details>

<details>
<summary><strong>💳 Có hỗ trợ thanh toán nào?</strong></summary>

Hiện tại integrate với Stripe. Sắp tới sẽ hỗ trợ VNPay, MoMo, và các cổng thanh toán Việt Nam.
</details>

---

<div align="center">
  <h3>🌟 Nếu dự án hữu ích, hãy star repo này!</h3>
  <p>Made with ❤️ và ☕ by <a href="https://github.com/devnguyen1910">Dev Nguyen</a></p>
  <p><strong>🎬 "Bringing Cinema to the Digital World" 🍿</strong></p>
  
  <p>
    <a href="#-cgv-cinema-system">⬆️ Về đầu trang</a> •
    <a href="https://github.com/devnguyen1910/cinematic_universe/issues">🐛 Báo lỗi</a> •
    <a href="https://github.com/devnguyen1910/cinematic_universe/discussions">💬 Thảo luận</a> •
    <a href="mailto:devnguyen1910@gmail.com">📧 Liên hệ</a>
  </p>
</div>
