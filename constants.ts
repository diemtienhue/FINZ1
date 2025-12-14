
import { Project, NewsItem, ChannelResource, LandingPageTemplate } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'fe-tsa',
    name: 'FE TSA 1-1',
    logo_url: 'https://picsum.photos/100/100?random=1',
    strengths: [
      'Hoa hồng nhận tươi sau giải ngân', 
      'Nhập hồ sơ trực tiếp siêu nhanh', 
      'Hỗ trợ mở code nợ xấu, làm online toàn quốc',
      'Sales theo dõi và push trực tiếp với TSA',
      'Tỷ lệ duyệt cao nhất trong các đối tác',
      'Chạy code nội bộ, không ảnh hưởng code chính thống'
    ],
    register_link: 'https://www.finconnect.vn/register?manager_code=FNC00017',
    group_link: 'https://zalo.me/g/oucpop180',
    contact_phone: '0888979809',
    short_description: 'Dự án vay tiêu dùng tín chấp hàng đầu. Nhập hồ sơ 2 luồng trực tiếp, quản lý chặt chẽ.',
    popup_content: 'Quy trình duyệt siêu tốc. Sales theo dõi hồ sơ và push trực tiếp với TSA, giúp quản lý hồ sơ chặt & nhanh. Nhập hồ sơ theo 2 luồng Trực tiếp siêu nhanh.',
    priority: 1,
    enabled: true,
    commission_policy: '- Khoản vay < 30tr: 900.000đ/hồ sơ\n- Khoản vay > 30tr: 1.200.000đ/hồ sơ\n- Thưởng mốc số lượng: +200k/hồ sơ khi đạt mốc 5',
    tab_1_title: 'Điều kiện lên code',
    tab_1_content: '- Cung cấp CCCD 2 mặt\n- Số điện thoại chính chủ\n- Email cá nhân\n- Không nợ xấu nhóm 3 trở lên',
    tab_2_title: 'Quy trình xử lý hồ sơ',
    tab_2_content: 'B1: Nhập liệu lên app\nB2: TSA thẩm định sơ bộ (15p)\nB3: QDE check và trả kết quả\nB4: Ký hợp đồng điện tử',
    tab_3_title: 'Lưu ý quan trọng',
    tab_3_content: 'Vui lòng kiểm tra kỹ PCB trước khi lên hồ sơ để tránh mất thời gian. Liên hệ admin nếu cần check CIC nội bộ.'
  },
  {
    id: 'vib-max',
    name: 'VIB Max',
    logo_url: 'https://picsum.photos/100/100?random=2',
    strengths: [
      'Hoa hồng thẻ cao nhất thị trường', 
      'Quản lý doanh số trực tiếp trên App MaxAgent', 
      'Hoa hồng CTV cao: 1.000k/thẻ',
      'Theo dõi đội nhóm dễ dàng',
      'Hoa hồng Team Lead: 400k/thẻ',
      'Hoa hồng Sup: 300k/thẻ'
    ],
    register_link: '#',
    group_link: 'https://zalo.me/g/fbwzqi875',
    contact_phone: '0888979809',
    short_description: 'Dự án thẻ tín dụng VIB với cơ chế hoa hồng hấp dẫn nhất thị trường.',
    popup_content: 'Mã giới thiệu VIB Max: 233105. Quản lý doanh số & Hoa hồng Trực tiếp trên App MaxAgent của VIB. Theo dõi đội nhóm dễ dàng.',
    priority: 2,
    enabled: true,
    commission_policy: '- Thẻ Online Plus: 800k\n- Thẻ Cash Back: 1.000k\n- Thẻ Rewards Unlimited: 900k\n- Thẻ Travel Élite: 1.200k',
    tab_1_title: 'Cơ chế hoa hồng',
    tab_1_content: '- Thẻ Online Plus: 800k\n- Thẻ Cash Back: 1.000k\n- Thẻ Travel: 1.200k',
    tab_2_title: 'Hồ sơ yêu cầu',
    tab_2_content: 'CCCD gắn chip + Bảo hiểm xã hội (VssID) hoặc Sao kê lương 3 tháng gần nhất.',
    tab_3_title: 'Khu vực hỗ trợ',
    tab_3_content: 'Hỗ trợ khách hàng đang sinh sống và làm việc tại Hà Nội, TP.HCM, Đà Nẵng, Bình Dương, Đồng Nai.'
  },
  {
    id: 'tnex',
    name: 'Tnex 1-1',
    logo_url: 'https://picsum.photos/100/100?random=3',
    strengths: [
      'Hoa hồng cao, trả ngay sau giải ngân', 
      'Duyệt tự động 15p, chỉ cần CCCD', 
      'Hỗ trợ nợ xấu, chạy code nội bộ',
      'Theo dõi & push hồ sơ luồng trực tiếp',
      'Không qua bên thứ 3',
      'Không ảnh hưởng code chính thống'
    ],
    register_link: 'https://duan-tnex.phucnguyens.id.vn',
    group_link: 'https://zalo.me/g/ybmknm699',
    contact_phone: '0888979809',
    short_description: 'Ngân hàng số thế hệ mới. Duyệt hồ sơ tự động siêu tốc.',
    popup_content: 'Tnex là ngân hàng số được bảo trợ bởi MSB. Quy trình mở tài khoản hoàn toàn trực tuyến (eKYC) và duyệt vay hạn mức thấu chi siêu tốc.',
    priority: 3,
    enabled: true,
    commission_policy: '- Mở tài khoản thành công: 80.000đ/tk\n- Giới thiệu vay hạn mức: 350.000đ/hồ sơ giải ngân',
    tab_1_title: 'Điều kiện khách hàng',
    tab_1_content: '- Công dân Việt Nam đủ 18 tuổi\n- Có CCCD gắn chip còn hiệu lực\n- Đang sử dụng Smartphone',
    tab_2_title: 'Quy trình eKYC',
    tab_2_content: 'B1: Tải App Tnex qua link giới thiệu\nB2: Chụp ảnh CCCD 2 mặt\nB3: Quét khuôn mặt (Liveness check)\nB4: Nhập mã giới thiệu (nếu có)',
    tab_3_title: 'Lưu ý ghi nhận',
    tab_3_content: 'Khách hàng phải duy trì đăng nhập ít nhất 1 lần sau khi đăng ký. Không xóa app trong vòng 7 ngày đầu.'
  },
  {
    id: 'home-credit',
    name: 'HomeCredit',
    logo_url: 'https://picsum.photos/100/100?random=4',
    strengths: [
      'Hoa hồng cao, trả ngay sau giải ngân', 
      'Duyệt tự động 10p, chỉ cần CCCD', 
      'Hỗ trợ nợ xấu, chạy code nội bộ',
      'Theo dõi & push hồ sơ luồng trực tiếp',
      'Không qua bên thứ 3',
      'Không ảnh hưởng code chính thống'
    ],
    register_link: '#',
    group_link: 'https://zalo.me/g/oucpop180',
    contact_phone: '0888979809',
    short_description: 'Tài chính tiêu dùng phổ thông. Duyệt hồ sơ cực nhanh chỉ 10 phút.',
    popup_content: 'HomeCredit là đơn vị tài chính lâu đời với quy trình thẩm định linh hoạt. Sản phẩm đa dạng từ vay tiền mặt đến thẻ tín dụng.',
    priority: 4,
    enabled: true,
    commission_policy: '- Vay tiền mặt: 4.5% khoản vay\n- Thẻ tín dụng: 400.000đ/thẻ kích hoạt',
    tab_1_title: 'Hồ sơ vay',
    tab_1_content: '- CCCD gắn chip chính chủ\n- Giấy phép lái xe hoặc Cà vẹt xe (nếu có)\n- Chứng minh thu nhập (Sao kê/Bảng lương) để tăng hạn mức',
    tab_2_title: 'Thời gian xử lý',
    tab_2_content: 'Hệ thống duyệt tự động trong 10-15 phút. Giải ngân trực tiếp vào tài khoản ngân hàng của khách.',
    tab_3_title: 'Đối tượng khách hàng',
    tab_3_content: 'Khách hàng từ 20 - 60 tuổi. Không có nợ xấu tại thời điểm tra cứu CIC.'
  },
  {
    id: 'mfast',
    name: 'MFast',
    logo_url: 'https://picsum.photos/100/100?random=5',
    strengths: [
      'Hoa hồng cao, trả cực nhanh', 
      'Sản phẩm đa dạng (Vay, Thẻ, Bảo hiểm)', 
      'Cập nhật đơn hàng realtime 24/7',
      'Có đội ngũ support hỗ trợ tận tình',
      'Trả góp 0% với điện máy'
    ],
    register_link: '#',
    group_link: 'https://zalo.me/g/xaftmv369',
    contact_phone: '0888979809',
    short_description: 'Nền tảng tài chính Affiliate, tăng thu nhập thụ động.',
    popup_content: 'MFast kết nối Sales với nhiều dự án tài chính (Mirae Asset, MCredit, PTF, CIMB...). Cơ chế trả thưởng linh hoạt, rút tiền về ví ngay lập tức.',
    priority: 5,
    enabled: true,
    commission_policy: 'Hoa hồng chi trả theo từng dự án con trên app MFast. Trung bình từ 300k - 2tr/hồ sơ thành công.',
    tab_1_title: 'Sản phẩm triển khai',
    tab_1_content: '- Tài chính: Vay tiêu dùng, Mở thẻ tín dụng\n- Bảo hiểm: Phi nhân thọ (Xe máy, Ô tô)\n- Tiện ích: Mở tài khoản ngân hàng số',
    tab_2_title: 'Cơ chế thanh toán',
    tab_2_content: 'Hoa hồng được cộng vào ví MFast ngay khi trạng thái hồ sơ thành công. Rút về ngân hàng 24/7 trong 5 phút.',
    tab_3_title: 'Hỗ trợ đào tạo',
    tab_3_content: 'Có các buổi Zoom đào tạo nghiệp vụ hàng tuần. Group Zalo hỗ trợ xử lý hồ sơ khó.'
  },
  {
    id: 'cnext',
    name: 'Cnext',
    logo_url: 'https://picsum.photos/100/100?random=6',
    strengths: [
      'Hoa hồng cao, trả thứ 2 hàng tuần', 
      'Sản phẩm: Thẻ tín dụng, Vay tiêu dùng', 
      'Có đội ngũ support hỗ trợ tận tình',
      'Mở tài khoản bank dễ dàng'
    ],
    register_link: '#',
    group_link: 'https://zalo.me/g/azzwaa888',
    contact_phone: '0888979809',
    short_description: 'Giải pháp tài chính công nghệ. Thanh toán hoa hồng đều đặn hàng tuần.',
    popup_content: 'Cnext tập trung vào các sản phẩm mở thẻ tín dụng (VPBank, VIB, Cake...) và vay tiêu dùng qua app.',
    priority: 6,
    enabled: true,
    commission_policy: 'Thanh toán vào thứ 2 hàng tuần. Hoa hồng từ 300.000đ đến 1.500.000đ tùy sản phẩm.',
    tab_1_title: 'Danh sách đối tác',
    tab_1_content: 'VPBank, VIB, TPBank, Cake by VPBank, KBank...',
    tab_2_title: 'Quy trình đối soát',
    tab_2_content: 'Chốt số liệu vào chủ nhật hàng tuần. Thanh toán vào thứ 2 tuần kế tiếp.',
    tab_3_title: 'Lưu ý chạy số',
    tab_3_content: 'Nghiêm cấm các hành vi gian lận (Cheat), tự đăng ký chéo. Tuân thủ quy định về nội dung quảng cáo.'
  },
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Lãi suất ngân hàng hôm nay: Big 4 đồng loạt giảm',
    summary: 'Cập nhật lãi suất tiền gửi và cho vay mới nhất từ các ngân hàng lớn.',
    content: 'Chi tiết về việc 4 ngân hàng lớn giảm lãi suất...',
    date: '2023-10-25',
    category: 'News',
    imageUrl: 'https://picsum.photos/400/200?random=10'
  },
  {
    id: '2',
    title: 'Cách tính điểm tín dụng CIC chuẩn 2025',
    summary: 'Hướng dẫn chi tiết cách đọc báo cáo CIC và cải thiện điểm số.',
    content: 'Điểm tín dụng CIC là yếu tố then chốt...',
    date: '2023-10-24',
    category: 'Knowledge',
    imageUrl: 'https://picsum.photos/400/200?random=11'
  },
  {
    id: '3',
    title: 'VIB ra mắt thẻ tín dụng Super Card mới',
    summary: 'Hoàn tiền đến 15% cho mua sắm trực tuyến và du lịch.',
    content: 'VIB vừa công bố dòng thẻ mới với nhiều ưu đãi...',
    date: '2023-10-22',
    category: 'Policy',
    imageUrl: 'https://picsum.photos/400/200?random=12'
  }
];

export const MOCK_CHANNEL_RESOURCES: ChannelResource[] = [
  {
    id: '1',
    title: 'Hướng dẫn xây tệp khách hàng',
    description: 'Xác định chân dung khách hàng (Công nhân, Văn phòng, hay kinh doanh tự do). Sử dụng Zalo OA để chăm sóc lại khách hàng cũ.',
    type: 'GUIDE',
    icon_name: 'Users'
  },
  {
    id: '2',
    title: 'Tài nguyên Content & Kịch bản',
    description: 'Các mẫu kịch bản tư vấn và hình ảnh quảng cáo được cập nhật hàng tuần.',
    type: 'SCRIPT',
    link_url: '#',
    icon_name: 'FileText'
  },
  {
    id: '3',
    title: 'Chiến lược Zalo Marketing 0 đồng',
    description: 'Cách tối ưu profile và kéo traffic tự nhiên từ các hội nhóm.',
    type: 'GUIDE',
    content: 'Nội dung chi tiết chiến lược...',
    icon_name: 'Share2'
  }
];

export const MOCK_TEMPLATES: LandingPageTemplate[] = [
  {
    id: '1',
    title: 'Phễu bán hàng Basic',
    description: 'Giao diện tối ưu chuyển đổi cho sản phẩm vay tín chấp. Form đăng ký nổi bật.',
    imageUrl: 'https://picsum.photos/400/300?random=20',
    demoUrl: '#',
    category: 'Finance'
  },
  {
    id: '2',
    title: 'Phễu bán hàng Pro',
    description: 'Thiết kế sang trọng, tích hợp so sánh các dòng thẻ và ưu đãi hoàn tiền.',
    imageUrl: 'https://picsum.photos/400/300?random=21',
    demoUrl: '#',
    category: 'Finance'
  },
  {
    id: '3',
    title: 'Phễu bán hàng Standard',
    description: 'Dành cho Leader muốn xây dựng hệ thống. Giới thiệu chính sách hoa hồng rõ ràng.',
    imageUrl: 'https://picsum.photos/400/300?random=22',
    demoUrl: '#',
    category: 'General'
  }
];

export const ADMIN_CREDENTIALS = {
  username: 'ntphucpq',
  password: '123456' 
};
