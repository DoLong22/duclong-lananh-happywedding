# 💍 Website Đám Cưới - Long & LAnh

Website đám cưới được refactor để dễ bảo trì và mở rộng.

## 📁 Cấu trúc dự án

```
wedding-refactored/
├── index.html              # File HTML chính
├── css/                    # Thư mục chứa CSS
│   ├── base.css           # Base styles và colors
│   ├── animations.css     # Tất cả animations
│   ├── hero.css           # Hero section styles
│   ├── timeline.css       # Timeline/story styles
│   ├── gallery.css        # 3D gallery carousel
│   ├── guestbook.css      # Guestbook styles
│   ├── rsvp.css           # RSVP form và success messages
│   └── gift.css           # Gift modal styles
├── js/                     # Thư mục chứa JavaScript modules
│   ├── main.js            # Entry point - khởi tạo tất cả
│   ├── config.js          # Firebase config
│   ├── countdown.js       # Countdown timer
│   ├── animations.js      # Reveal animations và effects
│   ├── gallery.js         # 3D gallery carousel
│   ├── rsvp.js            # RSVP form handling
│   ├── guestbook.js       # Guestbook functionality
│   └── gift.js            # Gift modal
├── album/                  # Thư mục chứa ảnh
└── ACN09216.jpg           # Ảnh hero

```

## 🚀 Cách sử dụng

### 1. Mở website
Chỉ cần mở file `index.html` bằng trình duyệt web. Website hoạt động hoàn toàn không cần server.

### 2. Chỉnh sửa nội dung

#### Thay đổi thông tin cơ bản
Mở `index.html` và tìm các sections được đánh dấu rõ ràng bằng comments:
```html
<!-- ========================================
     HERO SECTION
========================================= -->
```

#### Thay đổi ngày cưới
Sửa trong file `js/config.js`:
```javascript
export const WEDDING_DATE = new Date('2025-12-28T00:00:00.000Z');
```

#### Thay đổi Firebase config
Sửa trong file `js/config.js`:
```javascript
export const firebaseConfig = {
    apiKey: "your-api-key",
    // ... các config khác
};
```

#### Thay đổi danh sách ảnh gallery
Sửa trong file `js/gallery.js`:
```javascript
const albumPhotos = [
    'album/photo1.jpg',
    'album/photo2.jpg',
    // ... thêm ảnh ở đây
];
```

### 3. Thay đổi styles

#### Colors
Tất cả màu sắc được định nghĩa trong `css/base.css`:
```css
.burgundy-text { color: #5F7A71; }
.gold-text { color: #A8B896; }
/* ... các màu khác */
```

#### Animations
Tất cả animations trong `css/animations.css`. Để thay đổi tốc độ animation:
```css
.reveal {
    transition: opacity 1s ease-out; /* Thay đổi 1s thành giá trị khác */
}
```

#### Layout
Chỉnh sửa layout trong các file CSS tương ứng:
- Hero: `css/hero.css`
- Timeline: `css/timeline.css`
- Gallery: `css/gallery.css`
- Guestbook: `css/guestbook.css`
- RSVP: `css/rsvp.css`
- Gift: `css/gift.css`

## 📝 Các tính năng chính

### 1. Hero Section với Countdown
- Countdown tự động đếm ngược đến ngày cưới
- Background image với parallax effect

### 2. Timeline
- Hiển thị câu chuyện tình yêu theo thời gian
- Animations khi scroll
- Responsive design

### 3. 3D Gallery Carousel
- Hiển thị ảnh dạng 3D carousel
- Hỗ trợ keyboard navigation (← →)
- Touch/swipe trên mobile
- Auto-rotate (tạm dừng khi tương tác)

### 4. Guestbook (Sổ lưu bút)
- Lưu trữ trên Firebase Realtime Database
- Auto-scroll seamless
- Real-time updates

### 5. RSVP Form
- Form xác nhận tham dự
- Lưu trữ trên Firebase
- Success message với confetti animation
- Conditional fields dựa trên lựa chọn

### 6. Gift Registry
- Split image design
- Click để mở modal với QR code
- Thông tin chuyển khoản

## 🔧 Bảo trì và mở rộng

### Thêm section mới
1. Thêm HTML vào `index.html` với comment rõ ràng
2. Tạo file CSS mới trong `css/` nếu cần
3. Thêm link CSS vào `<head>` của `index.html`
4. Tạo file JS mới trong `js/` nếu cần logic
5. Import và khởi tạo trong `js/main.js`

### Thêm animation mới
1. Thêm CSS animation vào `css/animations.css`
2. Thêm logic JavaScript vào `js/animations.js` nếu cần
3. Import và sử dụng trong `js/main.js`

### Debug
- Mở Developer Tools trong trình duyệt (F12)
- Check Console tab để xem lỗi JavaScript
- Check Network tab để xem lỗi loading files

## 🌟 Lưu ý quan trọng

1. **Đường dẫn file**: Đảm bảo tất cả đường dẫn đến CSS, JS, và ảnh đều đúng
2. **Firebase**: Cần có Firebase Realtime Database đã setup để RSVP và Guestbook hoạt động
3. **Module JavaScript**: File `main.js` sử dụng ES6 modules (`type="module"`)
4. **Ảnh**: Đặt tất cả ảnh trong thư mục `album/`
5. **Testing**: Test trên nhiều thiết bị và trình duyệt khác nhau

## 📱 Responsive Design

Website được thiết kế responsive cho:
- Desktop (>1024px)
- Tablet (768px - 1024px)
- Mobile (< 768px)
- Small mobile (< 480px)

## 🆘 Troubleshooting

### Ảnh không hiển thị
- Kiểm tra đường dẫn ảnh trong HTML/JS
- Đảm bảo ảnh tồn tại trong thư mục `album/`

### JavaScript không hoạt động
- Mở Developer Console và check lỗi
- Đảm bảo tất cả file JS tồn tại
- Kiểm tra Firebase config

### Countdown không hoạt động
- Kiểm tra ngày trong `js/config.js`
- Đảm bảo format ngày đúng ISO 8601

### Firebase không hoạt động
- Kiểm tra Firebase config trong `js/config.js`
- Đảm bảo Firebase Realtime Database đã được enable
- Kiểm tra Firebase rules

## 📞 Liên hệ

Nếu có thắc mắc về code, vui lòng liên hệ developer.

---

Made with ❤️ for Long & LAnh's wedding
