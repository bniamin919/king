console.log("✅ Script.js loaded!");
const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

// اتصال به Supabase
const supabaseUrl = "https://eoiqwqzvsdnqlmotebrg.supabase.co";  // مقدار واقعی رو جایگزین کن
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvaXF3cXp2c2RucWxtb3RlYnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMyNzIsImV4cCI6MjA1NjA4OTI3Mn0.hGUv9suBPrqf6_kWYlCFhx2je_h57Agz0B-_6ODFXKo";  // مقدار واقعی رو جایگزین کن
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// دریافت اطلاعات کاربر از تلگرام
let userId = Telegram.WebApp.initDataUnsafe?.user?.id?.toString() || "test_user";

// مقدار اولیه سکه‌ها از دیتابیس
async function getCoins() {
    let { data, error } = await supabase
        .from("users")
        .select("coins")
        .eq("id", userId)
        .single();

    if (error || !data) {
        console.log("User not found, creating new record...");
        await supabase.from("users").insert([{ id: userId, coins: 0 }]);
        return 0;
    }
    return data.coins;
}

// ذخیره سکه‌های جدید در دیتابیس
async function updateCoins(newCoins) {
    await supabase
        .from("users")
        .upsert([{ id: userId, coins: newCoins }]);
}

// مقدار سکه را از دیتابیس بگیر و نمایش بده
async function initializeCoins() {
    let coins = await getCoins();
    h1.textContent = coins.toLocaleString();
}

initializeCoins();

image.addEventListener('click', async (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    let coins = await getCoins();
    coins += 1;

    await updateCoins(coins);
    h1.textContent = coins.toLocaleString();

    if (x < 150 & y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 & y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 & y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 & y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);
});

document.addEventListener("DOMContentLoaded", function () {
    window.Telegram.WebApp.expand(); // نمایش تمام صفحه

    const tg = window.Telegram.WebApp;
    const userData = tg.initDataUnsafe; // دریافت اطلاعات کاربر

    if (userData && userData.user) {
        console.log("User ID:", userData.user.id);
        console.log("Username:", userData.user.username);
        console.log("First Name:", userData.user.first_name);
        console.log("Last Name:", userData.user.last_name || "N/A");

        const userInfoElement = document.getElementById("userInfo");
        if (userInfoElement) {
            userInfoElement.innerText = `👤 ${userData.user.first_name} (@${userData.user.username || "No username"})`;
        }
    } else {
        console.log("User data not available. Make sure you're running inside Telegram Mini App.");
    }
});
