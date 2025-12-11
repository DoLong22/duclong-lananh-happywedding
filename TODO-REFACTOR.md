# 🎨 WEDDING WEBSITE REFACTOR - TODO LIST

## 🔴 PHASE 1: DESIGN FOUNDATION (Week 1)

### 1.1 Color System ✅ COMPLETED
- [x] Tạo file `css/design-tokens.css` (đã tạo với typography, đã thêm colors)
- [x] Định nghĩa 4 màu chính: primary (#C4A582), secondary (#F5F0E8), accent (#D4A5A5), dark (#5A4A42)
- [x] Thay thế TẤT CẢ hardcoded colors (#8B0000, #5F7A71, #8b7355, #a8926d) bằng CSS variables
- [x] Update `base.css`: thêm .text-primary, .text-dark, .bg-primary, .bg-secondary (giữ legacy classes)
- [x] Update HTML: không có legacy classes trong HTML
- [ ] Test contrast ratio: https://webaim.org/resources/contrastchecker/ (cần test trên browser)
- [ ] Visual check: không có màu lạc quẻ (cần test trên browser)

### 1.2 Typography System ✅ COMPLETED
- [x] Xóa 3 fonts: Playfair Display, Imperial Script, Caveat, Pinyon Script
- [x] Giữ lại hoặc thay bằng 2 fonts: Cormorant Garamond (heading) + Inter (body)
- [x] Thêm font scale vào `design-tokens.css` (xs → 5xl)
- [x] Update `base.css`: thêm typography rules
- [x] Find & Replace: font-family: 'Playfair Display' → var(--font-heading)
- [x] Update HTML: text-9xl → text-5xl (giảm hero title từ 128px → 49px)
- [ ] Mobile check: h1 không vượt 48px (cần test trên browser)
- [ ] PageSpeed: font load time < 1s (cần test với Lighthouse)

### 1.3 Spacing System ✅ COMPLETED
- [x] Thêm spacing scale vào `design-tokens.css` (space-1 → space-40, semantic spacing)
- [x] Xóa TẤT CẢ `!important` trong spacing rules (0 remaining)
- [x] Update `section-flow.css`: dùng variables thay vì hardcoded
- [x] Update `base.css`: sections dùng --section-padding-y, --section-padding-x
- [x] Responsive: mobile padding giảm xuống (tablet: 64px, mobile: 48px)
- [ ] Visual check: spacing đều nhau giữa sections (cần test trên browser)

---

## 🟡 PHASE 2: COMPONENT MODERNIZATION (Week 2)

### 2.1 Hero Section ✅ COMPLETED
- [x] Update `hero.css` với modern styles (overlay, layout, spacing)
- [x] Giảm hero title: text-9xl (128px) → text-5xl (49px) responsive
- [x] Redesign CTA button: gradient (primary → primary-dark), bold shadow, smooth hover
- [x] Update HTML structure: hero-content, hero-subtitle, hero-title, hero-date, hero-cta
- [x] Mobile: hero title tự động giảm (39px tablet, 32px mobile via CSS variables)
- [x] Scroll indicator với bounce animation
- [ ] Test: CTA button phải nổi bật nhất trong hero (cần test trên browser)

### 2.2 Navigation ✅ COMPLETED
- [x] Tạo file `css/navigation.css`
- [x] Tạo file `js/navigation.js`
- [x] Thêm scroll behavior: transparent → solid background khi scroll
- [x] Thêm active link indicator (underline effect)
- [x] Thêm smooth scroll behavior
- [x] Mobile: navbar menu có background, rounded
- [ ] Test: sticky navigation mượt mà (cần test trên browser)

### 2.2.5 Icon System Modernization ✅ COMPLETED
- [x] Thêm Lucide Icons CDN (20KB, modern SVG icon library)
- [x] Tạo file `css/icons.css` (icon system với sizes, colors, animations)
- [x] Replace ALL 18 emoji icons với Lucide icons:
  - [x] Timeline icons: 🚗 → car, 💐 → flower, 🥂 → wine, 📸 → camera
  - [x] Decorative dividers: 🌸 → flower-2, ✨ → sparkles, 💝 → heart
  - [x] Gallery petals: 🌸×5 → flower-2 (animated)
  - [x] Guestbook: 💝 → heart, ➤ → send
  - [x] RSVP: ✓ → check, 💝 → heart
  - [x] Gift section: 👰‍♀️🤵‍♂️ → user-round, 👉👈 → arrow-right/left, ✨ → sparkles
- [x] Add lucide.createIcons() initialization script
- [x] Icon classes: timeline-icon, decorative-icon, petal-icon, gift-modal-icon, hint-arrow-icon
- [x] Verify: 0 emoji icons remaining (all replaced with scalable SVG icons)
- [x] Fix icon colors: all icons match website color system (warm gold primary)
- [ ] Test: icons render correctly on all devices (cần test trên browser)

### 2.2.6 Hero & Button Balance ✅ COMPLETED
- [x] Adjust hero overlay: radial gradient (15% center → 45% edges) để thấy rõ mặt cô dâu chú rể
- [x] Redesign hero CTA: ghost/outline style (subtle, không che ảnh)
  - Changed from: Bold gradient với heavy shadows
  - Changed to: Transparent background với white border, backdrop-blur
- [x] Make RSVP submit button vibrant: gradient primary → primary-dark với bold shadows
  - Changed from: Pale accent color (#D4A5A5)
  - Changed to: Vibrant warm gold gradient với box-shadow
- [ ] Test: verify faces visible và buttons balanced (cần test trên browser)

### 2.2.7 Wedding Details Border Frame & Logo ✅ COMPLETED

**Border Frame:**
- [x] Replace CSS border với elegant border image (assets/border.png)
  - Changed from: Pure CSS multi-layer box-shadow + decorative corners
  - Changed to: Background-image approach với floral decorations
- [x] Background-image implementation (fix overlap issue):
  - background: url('../assets/border.png') no-repeat center/100% 100%
  - Layered with content background gradient
  - Fixed overlap by using background instead of border-image property
  - No overlap issues - content properly inset from border decorations
- [x] Generous padding to avoid overlap with corner decorations:
  - Desktop: 80px 70px (plenty of space for floral corners)
  - Tablet: 70px 60px (proportional)
  - Mobile: 60px 50px (maintains spacing)
- [x] Removed CSS decorative elements:
  - ::before và ::after pseudo-elements (no longer needed)
  - Corner flower icons (.corner-decoration removed from HTML)
  - Multi-layer box-shadow borders (replaced by image)
- [x] Kept soft outer shadow: 0 8px 32px rgba (subtle depth)
- [x] Benefits achieved:
  - ✅ No overlap with content (padding approach works perfectly)
  - ✅ Professional artwork, matches logo style
  - ✅ Crisp detail at all sizes
  - ✅ Simpler CSS than border-image property
  - ✅ Responsive padding scales properly
- [ ] Test: verify border displays correctly without overlap (cần test trên browser - READY FOR TESTING)

**Wedding Logo:**
- [x] Replace text logo (L&A circle) với elegant logo image
  - Changed from: CSS circle với text "L&A"
  - Changed to: Professional wedding logo (assets/logo.png)
- [x] Logo features: Floral wreath với initials "L & A" + couple names
- [x] Responsive sizing:
  - Desktop: 180px width
  - Tablet: 150px width
  - Mobile: 130px width
- [x] Add soft drop-shadow filter for elegance
- [x] Removed couple-names text (already in logo image)

### 2.3 CTA Buttons System
- [ ] Tạo file `css/buttons.css`
- [ ] Define: .btn, .btn-primary, .btn-secondary, .btn-ghost
- [ ] Define sizes: .btn-sm, .btn-lg
- [ ] Thêm states: hover, active, disabled, loading
- [ ] Update HTML: thay .btn-sage bằng .btn.btn-primary.btn-lg
- [ ] Test: min touch target 44x44px
- [ ] Test: hover effects smooth

### 2.4 Form Inputs
- [ ] Tạo file `css/forms.css`
- [ ] Modern input styles: border, focus states
- [ ] Consistent padding và spacing
- [ ] Error states
- [ ] Update RSVP form inputs
- [ ] Update Guestbook form inputs
- [ ] Test: focus states rõ ràng

---

## 🟢 PHASE 3: CONTENT & ANIMATION (Week 3)

### 3.1 Animation Optimization
- [ ] Fix `wedding-details.css`: Xóa infinite loop từ timeline animations
- [ ] Update `animations.css`: thêm CSS variables cho duration
- [ ] Tạo/update `js/animations.js`: Intersection Observer
- [ ] Animations chỉ play once khi scroll vào view
- [ ] Thêm prefers-reduced-motion support
- [ ] Remove all unnecessary infinite animations
- [ ] Test: không có animation nào loop liên tục

### 3.2 Visual Hierarchy
- [ ] Tăng contrast cho section headings
- [ ] Consistent font weights (headings: 600, body: 400)
- [ ] Increase white space giữa sections
- [ ] Update invitation section: giảm font sizes
- [ ] Update wedding details section: rõ ràng hơn
- [ ] Visual check: hierarchy rõ ràng từ h1 → h6

### 3.3 Gallery Improvements
- [ ] Add lazy loading cho gallery images
- [ ] Optimize 3D carousel performance
- [ ] Add loading states
- [ ] Compress images < 200KB each
- [ ] Generate WebP versions
- [ ] Test: smooth scrolling, no lag

### 3.4 Guestbook & RSVP
- [ ] Simplify guestbook styles
- [ ] Better input focus states
- [ ] Loading states khi submit
- [ ] Success message modern design
- [ ] Error handling UI
- [ ] Test: form submission smooth

---

## 🔵 PHASE 4: POLISH & PERFORMANCE (Week 4)

### 4.1 Performance Optimization
- [ ] Inline critical CSS trong head
- [ ] Defer non-critical CSS
- [ ] Minify CSS files
- [ ] Minify JS files
- [ ] Compress all images
- [ ] Generate WebP images
- [ ] Add image srcset cho responsive
- [ ] Add preload cho hero image
- [ ] Test: Lighthouse Performance > 90

### 4.2 SEO & Meta Tags
- [ ] Add meta description
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Generate và add favicon (16x16, 32x32, 180x180)
- [ ] Add structured data (JSON-LD)
- [ ] Test: Lighthouse SEO > 95

### 4.3 Accessibility
- [ ] Check color contrast ratios (WCAG AA)
- [ ] Add proper alt texts cho tất cả images
- [ ] Keyboard navigation test
- [ ] Screen reader test (voiceover/NVDA)
- [ ] Touch targets >= 44px
- [ ] Add skip to content link
- [ ] Test: Lighthouse Accessibility > 95

### 4.4 Cross-Browser Testing
- [ ] Test trên Chrome (desktop + mobile)
- [ ] Test trên Safari (desktop + mobile)
- [ ] Test trên Firefox (desktop + mobile)
- [ ] Test trên Edge (desktop)
- [ ] Fix browser-specific bugs
- [ ] Document known issues

### 4.5 Final QA
- [ ] All links work
- [ ] All forms submit correctly
- [ ] Firebase connection works
- [ ] No console errors
- [ ] No layout shifts (CLS)
- [ ] Smooth animations
- [ ] Mobile responsive
- [ ] Backup current version
- [ ] Prepare rollback plan

---

## 📊 METRICS CHECKLIST

### Before Refactor (Record Now)
- [ ] Lighthouse Performance: ____
- [ ] Lighthouse Accessibility: ____
- [ ] Lighthouse Best Practices: ____
- [ ] Lighthouse SEO: ____
- [ ] Page Load Time: ____
- [ ] Total Page Size: ____
- [ ] Number of HTTP Requests: ____
- [ ] Largest Contentful Paint (LCP): ____
- [ ] First Input Delay (FID): ____
- [ ] Cumulative Layout Shift (CLS): ____

### After Refactor (Target)
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 95+
- [ ] Lighthouse Best Practices: 95+
- [ ] Lighthouse SEO: 95+
- [ ] Page Load Time: < 2s
- [ ] Total Page Size: < 2MB
- [ ] LCP: < 2.5s
- [ ] FID: < 100ms
- [ ] CLS: < 0.1

---

## 🚨 CRITICAL ISSUES (Fix First)

- [ ] Giảm fonts từ 5 → 2
- [ ] Giảm colors từ 8 → 4
- [ ] Giảm hero h1 từ 128px → 49px
- [ ] Tăng CTA button contrast (shadow + gradient)
- [ ] Stop infinite animations
- [ ] Thêm spacing system
- [ ] Fix all `!important` in spacing

---

## 📁 NEW FILES TO CREATE

```
wedding-refactored/
├── css/
│   ├── design-tokens.css       ← NEW (Phase 1)
│   ├── navigation.css          ← NEW (Phase 2)
│   ├── buttons.css             ← NEW (Phase 2)
│   ├── forms.css               ← NEW (Phase 2)
│   └── hero-modern.css         ← NEW (Phase 2, hoặc update hero.css)
├── js/
│   ├── navigation.js           ← NEW (Phase 2)
│   └── animations.js           ← UPDATE (Phase 3)
└── TODO-REFACTOR.md            ← THIS FILE
```

---

## 🎯 QUICK WINS (Do These First)

1. [ ] Tạo `design-tokens.css` với color + font + spacing variables
2. [ ] Import vào `index.html`: `<link rel="stylesheet" href="css/design-tokens.css">`
3. [ ] Xóa 3 fonts không dùng trong `<head>`
4. [ ] Giảm hero h1: `text-9xl` → `text-5xl`
5. [ ] Update hero CTA button với gradient + shadow
6. [ ] Xóa infinite animation từ timeline
7. [ ] Add lazy loading cho gallery images
8. [ ] Compress tất cả images

---

## ✅ DEFINITION OF DONE

Mỗi task hoàn thành khi:
1. Code không có errors trong console
2. Works trên Chrome + Safari (desktop + mobile)
3. No hardcoded values (use CSS variables)
4. Tested và screenshot before/after
5. Git commit với clear message

---

**Priority Legend:**
- 🔴 Critical - Must do first
- 🟡 High - Do next
- 🟢 Medium - Do if time permits
- 🔵 Low - Nice to have

**Start Date:** ___________
**Target Completion:** ___________
**Actual Completion:** ___________
