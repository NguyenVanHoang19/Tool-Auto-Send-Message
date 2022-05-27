const puppeteer = require("puppeteer");
const readline = require("readline");
// Thay FB_EMAIL bằng email hoặc tên đăng nhập của ban nhé
var username = "";
//Thay FB_PASSWORD bằng passoword của bạn nhé
var password = "";

(async () => {
  // Chạy browser với chế độ headless:false, tức là có giao diện
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  // Truy cập vào trang m.facebook.com
  await page.goto("https://m.facebook.com");
  // Nhập email vào ô đăng nhập
  await page.type("#m_login_email", username);
  // Nhập password vào ô đăng nhập
  await page.type("#m_login_password", password);
  // Click nút đăng nhập
  await page.click("button[value='Log In']");
  // Đợi trang tải xong
  await page.waitForNavigation();

  //Truy cập đến của sổ chat của bạn bè ( Bạn tự thay ID người nhận nha hoặc Id của bạn để test cũng được )
  await page.goto(
    "https://m.facebook.com/messages/thread/" + 100029544289541 + "/"
  );

  const messages = [
    "Cám ơn cậu đã ở đây làm bạn những lúc tôi yếu đuối nhất",
    "Những lúc tôi cần sự giúp đổ nhất đã luôn kéo tôi lên, ngàn vạn lời nói cũng không kể hết.",
    "Chỉ muốn nói cho cậu biết:",
    "Từ khi biết cậu khổng có một chuyện tốt nào phát sinh! Cậu là đồ sao chối!!!",
    "Bắt đầu từ ngày mai, chính phủ đã quyết đinh loại bỏ tất cả những người lớn lên xấu xí, những thanh niên yếu kém làm tốn hại đến bộ mặt của thành phố!",
    "Cậu mau mau thu dọn đồ đạc, đi nơi khác tị nạn, chớ nói với người khác là tôi báo cho cậu, nhớ lấy!",
    "Không cần cảm ơn tôi đâu!",
  ];

  let index = 0;
  await page.type("#composerInput", messages[0]);
  await page.click("button[value='Gửi']");
  index = 1;

  let scheduler = setInterval(async function () {
    await page.type("#composerInput", messages[index]);
    await page.click("button[value='Gửi']");
    index++;
    if (index === messages.length) clearInterval(scheduler);
  }, 10000);
})();


