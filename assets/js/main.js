// اتصال به Supabase با امنیت بیشتر (باید مقدار کلید را در سرور نگه داشت)
const supabaseUrl = "https://eoiqwqzvsdnqlmotebrg.supabase.co";
const supabase = createClient(supabaseUrl, "PUBLIC_ANON_KEY"); // مقدار کلید را از سرور دریافت کنید

// دریافت اطلاعات کاربر از مینی‌اپ تلگرام
const tg = window.Telegram.WebApp;
tg.expand();
const userId = tg.initDataUnsafe?.user?.id;

if (!userId) {
    console.error("❌ Telegram user ID not found!");
} else {
    console.log("✅ Telegram user ID:", userId);
}

// انتخاب عنصر صحیح برای نمایش سکه‌ها
const coinDisplay = document.querySelector(".coin-count-container h1");
const coinButton = document.querySelector("#coin");

if (!coinDisplay || !coinButton) {
    console.error("❌ عناصر HTML پیدا نشدند!");
} else {
    console.log("✅ عناصر HTML پیدا شدند!");
}

// دریافت مقدار سکه‌های کاربر از دیتابیس
async function fetchCoins() {
    if (!userId) return;

    let { data, error } = await supabase
        .from("users")
        .select("coins")
        .eq("telegram_id", userId)
        .single();
    
    if (error || !data) {
        console.error("❌ Error fetching coins:", error);
        coinDisplay.textContent = "0"; // مقدار پیش‌فرض
        return;
    }
    
    console.log("✅ سکه‌های کاربر از Supabase:", data.coins);
    coinDisplay.textContent = data.coins;
}

// افزایش سکه‌ها هنگام کلیک روی تصویر
async function addCoin() {
    if (!userId) return;

    let currentCoins = parseInt(coinDisplay.textContent) || 0;
    let newCoins = currentCoins + 1;
    coinDisplay.textContent = newCoins;
    
    let { error } = await supabase
        .from("users")
        .update({ coins: newCoins })
        .eq("telegram_id", userId);
    
    if (error) {
        console.error("❌ Error updating coins:", error);
    } else {
        console.log("✅ سکه‌ها به‌روزرسانی شدند.");
    }
}

// اضافه کردن Event Listener برای کلیک روی عکس سکه
if (coinButton) {
    coinButton.addEventListener("click", addCoin);
}

// دریافت مقدار سکه‌های کاربر هنگام لود صفحه
fetchCoins();
