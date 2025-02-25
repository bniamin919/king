// Supabase Setu
const supabaseUrl = "https://eoiqwqzvsdnqlmotebrg.supabase.co"; // مقدار واقعی را جایگزین کن
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvaXF3cXp2c2RucWxtb3RlYnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMyNzIsImV4cCI6MjA1NjA4OTI3Mn0.hGUv9suBPrqf6_kWYlCFhx2je_h57Agz0B-_6ODFXKo"; // مقدار واقعی را جایگزین کن
const supabase = createClient(supabaseUrl, supabaseKey); // اصلاح این خط

// دریافت اطلاعات کاربر از مینی‌اپ تلگرام
const tg = window.Telegram.WebApp;
tg.expand(); // باز کردن تمام صفحه مینی‌اپ

// مقداردهی userId از اطلاعات تلگرام
const userId = tg.initDataUnsafe?.user?.id;
console.log("userId:", userId);  // چاپ شناسه تلگرام برای بررسی

if (!userId) {
    console.error("❌ Telegram user ID not found!");
} else {
    console.log("✅ Telegram user ID:", userId);
}

// انتخاب عناصر HTML
const coinDisplay = document.querySelector("#coin-display");
const coinButton = document.querySelector("#coin");

if (!coinDisplay || !coinButton) {
    console.error("❌ عناصر HTML پیدا نشدند!");
} else {
    console.log("✅ عناصر HTML پیدا شدند!");
}

// دریافت مقدار سکه‌های کاربر از دیتابیس
async function fetchCoins() {
    if (!userId) return; // اگر شناسه تلگرام نباشه، متوقف شو

    let { data, error } = await supabase
        .from("users")
        .select("coins")
        .eq("telegram_id", userId)
        .single();
    
    if (error) {
        console.error("❌ Error fetching coins:", error);
        return;
    }
    
    console.log("✅ سکه‌های کاربر از Supabase:", data.coins);  // چاپ تعداد سکه‌ها
    coinDisplay.textContent = data.coins;
}

// افزایش سکه‌ها هنگام کلیک روی تصویر
async function addCoin() {
    if (!userId) return; // اگر شناسه تلگرام نباشه، متوقف شو

    let currentCoins = parseInt(coinDisplay.textContent) || 0;
    let newCoins = currentCoins + 1;
    
    // به‌روزرسانی مقدار در UI
    coinDisplay.textContent = newCoins;
    
    // ارسال مقدار جدید به دیتابیس
    let { error } = await supabase
        .from("users")
        .update({ coins: newCoins })
        .eq("telegram_id", userId);
    
    if (error) {
        console.error("❌ Error updating coins:", error);
    } else {
        console.log("✅ سکه‌ها به دیتابیس بروزرسانی شدند.");
    }
}

// اضافه کردن Event Listener برای کلیک روی عکس سکه
coinButton.addEventListener("click", addCoin);

// دریافت مقدار سکه‌های کاربر هنگام لود صفحه
fetchCoins();
