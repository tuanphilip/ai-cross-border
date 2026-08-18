# Business Requirements Document (BRD) - Product Opportunity Hub

## 1. Tổng quan Dự án (Project Overview)
**Tên dự án:** Product Opportunity Hub (POH)
**Lĩnh vực:** Print On Demand (POD) / Cross-Border E-Commerce
**Mục tiêu cốt lõi:** Xây dựng một nền tảng công nghệ tự động hóa quy trình nghiên cứu và phát triển sản phẩm (R&D) trong ngành POD. Hệ thống giúp tổng hợp, phân tích dữ liệu đa nguồn và tự động gợi ý các sản phẩm tiềm năng đáp ứng đồng thời hai tiêu chí: **Khả thi về sản xuất** và **Đúng nhu cầu thị trường**.

## 2. Bối cảnh & Bài toán Doanh nghiệp (Business Background & Problems)
Theo định hướng của đội ngũ Printway, quá trình nghiên cứu và phát triển sản phẩm POD hiện tại đang gặp phải 3 "điểm nghẽn" (pain points) lớn đối với cả đội ngũ R&D và Nhà bán hàng (Seller):
1. **Bất đồng bộ về Tên gọi Sản phẩm (Product Naming Variation):** Một sản phẩm thực tế có nhiều tên gọi khác nhau giữa nhà sản xuất (Technical Name, ví dụ: *Custom Shape Acrylic Ornament*) và trên các sàn TMĐT (SEO Name, ví dụ: *Personalized Grandpa Acrylic Ornament Gift*). Điều này gây khó khăn trong việc tổng hợp, phân nhóm dữ liệu và đo lường chính xác hiệu quả bán hàng.
2. **Công cụ Phân tích Rời rạc & Phân mảnh:** Các công cụ phân tích hiện hành (như Helium 10 cho Amazon, Aura cho Etsy...) hoạt động độc lập trên từng sàn riêng lẻ. Thị trường đang thiếu vắng giải pháp tổng hợp đa nguồn để đưa ra câu trả lời trực tiếp cho câu hỏi sống còn: *"Sản phẩm này có nên sản xuất/bán hay không?"*
3. **Quy trình Vận hành Thủ công, Thiếu Tự động hóa:** Các khâu từ thu thập dữ liệu (từ Mạng xã hội, Sàn TMĐT), đánh giá xu hướng, cho đến đề xuất ngách (Niche) đều đang được thực hiện thủ công, gây lãng phí thời gian, nguồn lực và dễ dẫn đến bỏ lỡ cơ hội xu hướng (trend).

## 3. Đối tượng Người dùng Mục tiêu (Target Users)
- **Đội ngũ R&D của Nhà sản xuất (Printway):** Sử dụng hệ thống để tìm kiếm chất liệu mới, ngách mới, đánh giá tính khả thi gia công và định hướng danh mục sản phẩm (Product Catalog) dài hạn.
- **Nhà bán hàng (Sellers / Merchants):** Sử dụng để tìm ra "Winning Product", nắm bắt trend kịp thời và ra quyết định Launch (ra mắt), Scale (mở rộng) chiến dịch kinh doanh.

## 4. Yêu cầu Chức năng Hệ thống (Functional Requirements)

Hệ thống được chia thành 4 module cốt lõi để giải quyết trọn vẹn bài toán:

### 4.1. Module Thu thập & Phát hiện Tiềm năng (Data Aggregation & Discovery)
- **Tích hợp Đa nguồn (Multi-source Integration):** Tự động thu thập dữ liệu (listing, từ khóa, xu hướng) từ các Sàn TMĐT lớn (Amazon, Etsy, Shopify, Walmart...) và Mạng xã hội (Pinterest, TikTok, X/Twitter, Facebook, Instagram).
- **Phát hiện Tín hiệu sớm (Trend Detection):** Quét và nhận diện các tín hiệu sản phẩm tiềm năng dựa trên sự tăng trưởng đột biến của từ khóa, mức độ thảo luận (social listening) và lượng tiêu thụ sớm.

### 4.2. Module Chuẩn hóa & Ghép nối Dữ liệu (Listing Mapping System)
- **AI/NLP Mapping Engine:** Xây dựng thuật toán nhận diện ngôn ngữ tự nhiên để phân tích và chuẩn hóa (map) các tên/listing sản phẩm đa dạng trên sàn TMĐT về đúng với một **Loại sản phẩm (Product Type)** hoặc **Mã SKU duy nhất** thuộc Catalog gia công của Printway.
- **Trích xuất Thuộc tính (Entity Extraction):** Tự động nhận diện các đặc tính sản phẩm như chất liệu, kích thước, ngách (Niche), và tính cá nhân hóa từ tên gọi.

### 4.3. Module Chấm điểm & Ra quyết định (Product Scoring & Decision)
Hệ thống sẽ xây dựng thuật toán chấm điểm tự động toàn diện dựa trên **Bộ 9 Chỉ số (Product Scoring Model)**:

*Nhóm 1: Khả năng Sản xuất (Production Capability)*
1. **Production Fit:** Điểm đánh giá khả năng gia công, in ấn tại xưởng Printway.
2. **Production Time:** Tổng thời gian thực hiện (Lead time) từ in ấn đến khi giao hàng.
3. **Seasonality Fit:** Mức độ phù hợp với mùa vụ hiện hành.
4. **Personalization Level:** Khả năng và hình thức cá nhân hóa của sản phẩm.

*Nhóm 2: Hiệu quả Tài chính (Financial Performance)*
5. **Potential Revenue:** Ước tính và dự báo quy mô doanh thu.
6. **Profit Margin:** Biên lợi nhuận dự kiến sau khi trừ đi chi phí vốn (COGS) và các loại phí liên quan.

*Nhóm 3: Tiềm năng Thị trường (Market Opportunity)*
7. **Market Demand:** Lực cầu hiện tại dựa trên lượng tìm kiếm, lượt bán, và lượt lưu (favorites).
8. **Growth Rate:** Tốc độ tăng trưởng thị phần/doanh số.
9. **Competition Level:** Cường độ cạnh tranh dựa trên số lượng người bán và độ bão hòa listing.

*Đầu ra quyết định (Actionable Output):* Dựa vào bộ điểm trên, hệ thống đưa ra nhãn dán kết luận rõ ràng:
- 🟢 **Nên sản xuất / Nên bán**
- 🔴 **Không nên sản xuất / Không nên bán**

### 4.4. Module Báo cáo Tự động & Dự báo (Auto Reporting & Forecasting)
- **Báo cáo Thị trường (Auto Reports):** Tự động xuất báo cáo đề xuất các ngách hàng tiềm năng, nguyên vật liệu khuyên dùng.
- **Khuyến nghị Ra mắt (Launch Suggestions):** Đề xuất thời điểm ra mắt sản phẩm lý tưởng để tối ưu hóa tỷ lệ chuyển đổi.
- **Dự báo Xu hướng (Forecasting):** Ứng dụng các mô hình Machine Learning/Time-Series để dự báo chu kỳ vòng đời tiếp theo (Conception -> Decline) của sản phẩm.

## 5. Yêu cầu Phi chức năng (Non-Functional Requirements)
- **Performance (Hiệu suất):** Khả năng xử lý lượng lớn dữ liệu (Big Data) và chấm điểm trong thời gian ngắn (Real-time hoặc Near Real-time).
- **Scalability (Khả năng mở rộng):** Kiến trúc cho phép dễ dàng tích hợp thêm các API hoặc Crawler từ nền tảng mới trong tương lai.
- **Usability (Trải nghiệm người dùng):** Giao diện Dashboard trực quan, cho phép người dùng tùy chỉnh linh hoạt các trọng số (weights) của bộ 9 chỉ số chấm điểm.
- **Data Security:** Bảo đảm an toàn thông tin dữ liệu cho hệ thống quy mô lớn, tuân thủ nguyên tắc bảo mật.

## 6. Yêu cầu Đầu ra Cuối cùng (Expected Deliverables)
Theo đề bài "Product Opportunity Hub", giải pháp yêu cầu bàn giao:
1. **Hệ thống/Công cụ phần mềm:** Đảm bảo tự động hóa quy trình theo 4 module đã liệt kê.
2. **Thuật toán cốt lõi:** Có khả năng Map dữ liệu listing (Listing Mapping) và Chấm điểm (Product Scoring & Decision) chính xác cao.
3. **Dashboard:** Hệ thống hiển thị trực quan các báo cáo tự động, quyết định nên/không nên sản xuất và đề xuất ngách tương lai.

## 7. Use Cases (Các ca sử dụng chính)

### UC01: Cập nhật & Thu thập dữ liệu xu hướng (Data Crawling & Trend Detection)
- **Actor:** Hệ thống (System), R&D Team.
- **Mô tả:** Hệ thống tự động thu thập dữ liệu về sản phẩm, từ khóa, lượt tìm kiếm, lượt tương tác từ đa nền tảng (Amazon, Etsy, TikTok, Pinterest...).
- **Pre-condition:** Crawler và API kết nối hoạt động ổn định.
- **Main Flow:**
  1. Hệ thống tự động chạy các job thu thập dữ liệu định kỳ (hàng ngày).
  2. Phân tích các từ khóa và listing mới, nhận diện tín hiệu xu hướng (trend).
  3. Tổng hợp và lưu trữ dữ liệu thô vào Data Lake.

### UC02: Chuẩn hóa tên sản phẩm (Auto Listing Mapping)
- **Actor:** Hệ thống (System/AI Engine).
- **Mô tả:** Nhận đầu vào là các tên/listing sản phẩm từ Sàn TMĐT, tự động phân tích và ghép nối với SKU/Product Type trong Catalog của Printway.
- **Main Flow:**
  1. Hệ thống lấy dữ liệu text mô tả/tên listing đã thu thập.
  2. Dùng AI/NLP trích xuất thông tin (chất liệu, kiểu dáng, kích thước).
  3. Đối chiếu và chuẩn hóa (map) về đúng SKU/Product Type tương ứng trong hệ thống.

### UC03: Chấm điểm & Gợi ý sản phẩm tiềm năng (Product Scoring & Decision)
- **Actor:** R&D Team, Seller.
- **Mô tả:** Chấm điểm mức độ khả thi và đưa ra kết luận (Nên/Không nên sản xuất) cho một nhóm sản phẩm hoặc ngách mới.
- **Main Flow:**
  1. Người dùng chọn một ngách (Niche) hoặc xem danh sách sản phẩm hệ thống tổng hợp.
  2. Hệ thống tính toán điểm số dựa trên 9 chỉ số đã cài đặt trọng số.
  3. Hiển thị tổng điểm và gắn cờ (flag) 🟢 "Nên sản xuất/Nên bán" hoặc 🔴 "Không nên sản xuất/bán".
  4. Người dùng bấm vào để xem chi tiết lý do (breakdown 3 nhóm chỉ số: Khả năng Sản xuất, Hiệu quả Tài chính, Tiềm năng Thị trường).

### UC04: Xem Báo cáo & Dự báo (View Auto Reports & Forecasts)
- **Actor:** R&D Team, Product Manager, Seller.
- **Mô tả:** Người dùng xem báo cáo trực quan về các ngách tiềm năng và xu hướng thị trường sắp tới.
- **Main Flow:**
  1. Người dùng truy cập Dashboard.
  2. Xem báo cáo tự động gợi ý top 10 ngách đang tăng trưởng (Growing Niches).
  3. Xem đề xuất thời điểm Launch tối ưu (Launch Suggestions) và dự báo vòng đời sản phẩm.

## 8. Acceptance Criteria (Tiêu chí nghiệm thu)

### AC01: Đối với Module Thu thập dữ liệu (Tương ứng UC01)
- **AC1.1:** Hệ thống phải thu thập được dữ liệu tự động từ tối thiểu 3 nền tảng tiêu biểu (VD: Etsy, Amazon, Pinterest) thông qua API hoặc kỹ thuật crawling mà không cần thao tác thủ công.
- **AC1.2:** Dữ liệu phải được cập nhật mới định kỳ ít nhất 1 lần/ngày (Daily Update).
- **AC1.3:** Tự động phát hiện và hiển thị cảnh báo (alert) đối với các từ khóa/sản phẩm có sự gia tăng lượng tìm kiếm hoặc tương tác vượt mức thiết lập (VD: > 30%) trong vòng 24-48 giờ.

### AC02: Đối với Module Chuẩn hóa Listing (Tương ứng UC02)
- **AC2.1:** Thuật toán AI/NLP có khả năng nhận diện và Map các tên SEO/Listing name về chuẩn Product Type của Printway với độ chính xác (Accuracy rate) đạt mức **>= 85%**.
- **AC2.2:** Xử lý và trích xuất đúng các thuộc tính cốt lõi (Entities) từ text mô tả bao gồm ít nhất: Chất liệu (Material), Ngách (Niche), và Tính cá nhân hóa (Personalization tags).

### AC03: Đối với Module Chấm điểm (Tương ứng UC03)
- **AC3.1:** Hệ thống tính toán đầy đủ và hiển thị chính xác **9 chỉ số đánh giá** đã được định nghĩa trong tài liệu.
- **AC3.2:** Người quản trị (Admin) phải có khả năng điều chỉnh linh hoạt **trọng số (weights)** của từng chỉ số trong số 9 chỉ số trên Dashboard.
- **AC3.3:** Nhãn dán quyết định (🟢 Nên sản xuất / 🔴 Không nên sản xuất) phải được tự động xuất ra và hiển thị chính xác dựa trên ngưỡng tổng điểm (threshold) đã cấu hình.
- **AC3.4:** UI/UX Dashboard có cung cấp biểu đồ/bảng số liệu (breakdown) của từng tiêu chí để người dùng hiểu được logic ra quyết định của hệ thống.

### AC04: Đối với Module Báo cáo & Dự báo (Tương ứng UC04)
- **AC4.1:** Dashboard hiển thị báo cáo cập nhật Real-time (hoặc độ trễ tối đa 1h) về các ngách sản phẩm đang có hiệu suất tốt nhất trên thị trường.
- **AC4.2:** Biểu đồ dự báo chu kỳ (Forecasting chart) cho một sản phẩm/ngách cụ thể phải dự phóng được xu hướng tăng/giảm tối thiểu từ 1 đến 3 tháng tiếp theo.
- **AC4.3:** Có tính năng xuất (export) báo cáo tóm tắt ngách và sản phẩm dưới dạng PDF hoặc Excel để tải về.
