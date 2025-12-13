# Facebook/Messenger Preview Debug Guide

## Vấn Đề Đã Sửa

### 1. ✅ Canonical URL
Đã thêm `<link rel="canonical">` để Facebook biết tất cả URL variants (có/không có query params) đều là cùng một trang và share chung preview.

### 2. ✅ Đúng Kích Thước Ảnh
- **Trước:** 1280x1920 (portrait) - không tối ưu cho Facebook
- **Sau:** 1920x1280 (landscape) - phù hợp Facebook recommendation

### 3. ✅ URL-Safe Base64 Encoding
Đã chuyển encoding sang URL-safe format (thay `+/=` bằng `-_~`) để tránh vấn đề khi share qua Messenger.

### 4. ✅ Dynamic Meta Tags
JavaScript tự động update meta tags khi có personalization (chỉ ảnh hưởng browsers, không ảnh hưởng crawler).

## Cách Test và Debug

### Bước 1: Deploy Code Mới Lên Vercel
```bash
git add .
git commit -m "Fix Facebook preview meta tags"
git push
```

Chờ Vercel deploy xong (~2 phút).

### Bước 2: Clear Facebook Cache
Facebook cache preview rất lâu. Cần force clear:

**Tool chính thức:** https://developers.facebook.com/tools/debug/

1. Mở link trên
2. Nhập URL: `https://duclong-lananh-happywedding.vercel.app/`
3. Click **"Debug"**
4. Xem preview hiện tại
5. Click **"Scrape Again"** để force Facebook re-fetch

### Bước 3: Test URL Có Parameters
Test URL với personalization:
```
https://duclong-lananh-happywedding.vercel.app/?data=eyJndWVzdCI6Ik5ndXnhu4VuIFbEg24gQSIsInZlbnVlIjoiYnJpZGUifQ~~
```

**Lưu ý:** Facebook Debugger có thể không hiển thị personalized content (vì crawler không chạy JS), nhưng preview base URL sẽ work.

### Bước 4: Test Trên Messenger Thật
1. Gửi URL cho bạn bè qua Messenger
2. Kiểm tra preview hiển thị
3. Click vào link → kiểm tra personalization có hoạt động

## Expected Results

### ✅ Facebook Crawler (Static Preview)
- Title: "Thư Mời Tiệc Cưới Đức Long & Lan Anh"
- Description: "Chúng tôi trân trọng kính mời bạn đến dự buổi lễ cưới của chúng tôi - 28.12.2025"
- Image: Ảnh landscape ACN00005.jpg
- Preview hiển thị cho **tất cả URLs** (có hoặc không có params)

### ✅ Browser (After Click)
- Title update: "Thư Mời Tiệc Cưới - [Tên Khách]"
- Content personalized với tên khách
- Venue-specific info (nếu là bride venue)

## Troubleshooting

### Preview Vẫn Không Hiển thị?

1. **Check Image URL Accessible:**
   ```bash
   curl -I https://duclong-lananh-happywedding.vercel.app/album/ACN00005.jpg
   ```
   Phải return `200 OK`

2. **Clear Cache Nhiều Lần:**
   Facebook cache rất stubborn. Click "Scrape Again" 2-3 lần.

3. **Check Meta Tags:**
   View source HTML, verify:
   - `<link rel="canonical">` exists
   - `og:image` points to correct URL
   - `og:image:width` và `height` correct

4. **Wait 24 Hours:**
   Đôi khi Facebook cache cần thời gian để expire hoàn toàn.

### In-App Browser Issues?

Nếu khách click từ Messenger thấy banner đỏ:
- Đúng là in-app browser không tốt cho personalization
- Hướng dẫn họ: Menu (⋯) → "Open in Browser"
- Hoặc copy link paste vào Safari/Chrome

## Meta Tags Reference

```html
<!-- Canonical - KEY for Facebook -->
<link rel="canonical" href="https://duclong-lananh-happywedding.vercel.app/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://duclong-lananh-happywedding.vercel.app/" />
<meta property="og:title" content="Thư Mời Tiệc Cưới Đức Long & Lan Anh" />
<meta property="og:description" content="Chúng tôi trân trọng kính mời bạn đến dự buổi lễ cưới của chúng tôi - 28.12.2025" />
<meta property="og:image" content="https://duclong-lananh-happywedding.vercel.app/album/ACN00005.jpg" />
<meta property="og:image:width" content="1920" />
<meta property="og:image:height" content="1280" />
<meta property="og:image:type" content="image/jpeg" />
```

## References
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Open Graph Protocol](https://ogp.me/)
- [Facebook Best Practices](https://developers.facebook.com/docs/sharing/webmasters)
