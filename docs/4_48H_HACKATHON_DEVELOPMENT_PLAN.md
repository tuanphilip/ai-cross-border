# Kế hoạch Phát triển Thần tốc 48 Giờ (48-Hour Rapid Prototyping Playbook)
## Dự án: Product Opportunity Hub (Deploy qua Coolify)

---

## 1. Đánh giá Chiến lược của bạn

> **Ý tưởng của bạn:** Dựng giao diện trước $\rightarrow$ Thông luồng CRUD $\rightarrow$ Tích hợp AI/Tools vào Core $\rightarrow$ Deploy qua Coolify.

* **Ưu điểm:** Dễ kiểm soát giao diện và các luồng cơ bản.
* **Cạm bẫy lớn nhất (Risk trong 48h):** Rất dễ bị **"cháy giáo án"** (sa đà vào làm Auth, phân quyền, CRUD bảng phụ mất 1.5 ngày), đến sát giờ nộp bài/demo thì tính năng quan trọng nhất (Listing Mapping, Chấm điểm 9 chỉ số, Phân tích Trend) lại chưa chạy được hoặc chỉ là giao diện tĩnh.
* **Lời khuyên:** **Coolify là lựa chọn cực kỳ sáng suốt** (giúp deploy tự động qua Git chỉ với 1 click). Tuy nhiên, phương pháp phát triển nên chuyển sang chiến lược **"Vertical Slice + Mock-First" (Lát cắt dọc hoàn chỉnh)**.

---

## 2. Chiến lược "Lát cắt dọc" (Vertical Slice) trong 48 Giờ

Thay vì làm toàn bộ CRUD tầng ngang, ta làm **1 luồng lõi từ Frontend $\rightarrow$ Backend $\rightarrow$ AI $\rightarrow$ Deploy** ngay từ ngày đầu tiên.

```
❌ Cách làm truyền thống (Tầng ngang - Dễ thiếu thời gian):
[UI Auth, CRUD] -> [DB CRUD đầy đủ] -> [AI Engine] -> [Deploy cuối cùng]

✅ Cách làm Hackathon (Lát cắt dọc - Luôn có sản phẩm demo chạy được):
Ngày 1: [UI Dashboard + Mock API lõi + Deploy Coolify chạy live]
Ngày 2: [Thay Mock bằng AI thật: Listing Mapping + Scoring 9 tiêu chí]
```

---

## 3. Lộ trình Chi tiết 48 Giờ (Hour-by-Hour Roadmap)

### 🗓️ NGÀY 1: Dựng Khung Giao diện, Mock Luồng Lõi & Deploy Coolify (0h - 24h)

*Mục tiêu cuối ngày 1: Có đường link URL live trên Coolify, giao diện bấm được mượt mà, thông luồng từ đầu đến cuối (dùng Mock Data).*

* **Giờ 01 - 04: Khởi tạo Project & Cấu hình Docker / Coolify**
  * Khởi tạo Monorepo hoặc 2 folder: `/frontend` (Next.js 14 + Tailwind + Shadcn/UI/Tremor) và `/backend` (FastAPI + SQLite/PostgreSQL).
  * Viết sẵn `docker-compose.yml`.
  * Đẩy lên GitHub $\rightarrow$ Kết nối vào **Coolify** $\rightarrow$ Kích hoạt Auto Deploy khi push code.
* **Giờ 05 - 10: Xây dựng Giao diện (Frontend) với Mock Data**
  * **Màn hình 1 (Dashboard Overview):** Hiển thị Top Trending Niches, biểu đồ tăng trưởng (dùng Recharts hoặc Tremor).
  * **Màn hình 2 (Product Analyzer & Scoring):** Ô nhập URL/Keyword $\rightarrow$ Bấm nút "Phân tích" $\rightarrow$ Hiển thị:
    * Kết quả Mapping SKU Printway.
    * Bảng điểm 9 chỉ số.
    * Badge quyết định: 🟢 *Nên sản xuất* / 🔴 *Không nên sản xuất*.
  * **Màn hình 3 (Niche Report Detail):** Hiển thị insight, gợi ý vật liệu, thời điểm launch.
* **Giờ 11 - 16: Dựng Backend API (FastAPI) trả về Schema chuẩn**
  * Tạo các endpoint chính:
    * `POST /api/v1/analyze` (Nhận keyword $\rightarrow$ Trả về kết quả JSON có cấu trúc 9 chỉ số).
    * `GET /api/v1/niches/trending` (Trả về danh sách 10 ngách hot).
  * Viết sẵn database schema cơ bản (lưu danh mục mẫu 20 SKU của Printway).
* **Giờ 17 - 24: Thông luồng Frontend $\leftrightarrow$ Backend & Kiểm tra trên Coolify**
  * Kết nối axios/fetch từ Next.js tới FastAPI.
  * Test toàn bộ flow người dùng trên đường link thật do Coolify cấp.
  * **Kết quả Ngày 1:** Đã có 1 bản Prototype chạy live, bấm nút nào ra kết quả đó (dù backend đang dùng mock/rule-based giả lập).

---

### 🗓️ NGÀY 2: Tích hợp Core AI & Hoàn thiện Tính năng Ăn Điểm (25h - 48h)

*Mục tiêu ngày 2: Thay thế Mock Data bằng AI & Logic thật.*

* **Giờ 25 - 32: Triển khai Module Listing Mapping (Tính năng "WOW" số 1)**
  * Nạp dataset ~30-50 SKU phổ biến của Printway (gỗ, acrylic, ornament, shirt...) vào backend.
  * Dùng `sentence-transformers/all-MiniLM-L6-v2` (chạy local siêu nhẹ, không tốn tiền API) hoặc OpenAI Embedding để tính Cosine Similarity giữa Tiêu đề sản phẩm $\leftrightarrow$ Danh mục Printway SKU.
  * Kiểm thử: Nhập `Personalized Acrylic Ornament Mom Gift` $\rightarrow$ Tự động map chuẩn xác về `PW-ORN-ACRYLIC`.
* **Giờ 33 - 38: Triển khai Bộ Chấm điểm 9 Chỉ số (Scoring Engine)**
  * Viết hàm Python tính toán 9 tiêu chí:
    * *Sản xuất:* Check vật liệu, lead time từ Catalog SKU đã map.
    * *Tài chính:* Tính Profit Margin = `Estimated Price - (COGS + Shipping)`.
    * *Thị trường:* Dùng `pytrends` hoặc dữ liệu crawl mẫu để lấy search volume/growth rate.
  * Tính điểm Weighted Score $\rightarrow$ Gán nhãn Quyết định (Recommend/Reject).
* **Giờ 39 - 44: Tự động hóa Báo cáo bằng LLM (AI Insight Generator)**
  * Tích hợp OpenAI / Gemini API (hoặc Groq LLaMA siêu tốc) để tạo đoạn tóm tắt R&D Report: *"Sản phẩm này tiềm năng vì dịp Q4 đang đến gần, chất liệu Acrylic xưởng Printway sẵn có..."*.
* **Giờ 45 - 48: Tối ưu UI/UX, Fix Bug & Chuẩn bị Kịch bản Demo**
  * Bổ sung loading skeleton, toast thông báo.
  * Chuẩn bị sẵn 3-5 kịch bản demo mẫu (1 sản phẩm Thắng lớn - Xanh, 1 sản phẩm Thất bại - Đỏ để làm nổi bật thuật toán).
  * Quay video ngắn hoặc chụp ảnh demo.

---

## 4. Tóm tắt 3 Nguyên tắc "Sống còn" cho 48 Giờ

1. **Deploy sớm nhất có thể (Coolify ngay Giờ thứ 4):** Tránh trường hợp code xong hết ở local nhưng deploy lên server bị lỗi CORS, build Docker thất bại.
2. **Không tự làm Auth/Phân quyền phức tạp:** Chỉ làm 1 trang đăng nhập đơn giản (hardcode hoặc lưu session đơn giản) để dành 100% thời gian cho tính năng nghiệp vụ.
3. **Ưu tiên sự mượt mà của Demo:** Giám khảo/Người dùng đánh giá cao hệ thống chạy nhanh, trực quan, giải quyết đúng nỗi đau kinh doanh hơn là hệ thống có 20 trang CRUD quản trị nhưng AI bên trong không hoạt động.
