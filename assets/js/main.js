console.log("✅ Script.js loaded!");
const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count')

if(coins == null){
    localStorage.setItem('coins' , '0');
    h1.textContent = '0';
}else{
    h1.textContent = Number(coins).toLocaleString();
}

if(total == null){
    localStorage.setItem('total' , '500')
    body.querySelector('#total').textContent = '/500';
}else {
    body.querySelector('#total').textContent = `/${total}`;
}


if(power == null){
    localStorage.setItem('power' , '500');
    body.querySelector('#power').textContent = '500';
}else{
    body.querySelector('#power').textContent = power;
}


if(count == null){
    localStorage.setItem('count' , '1')
}

image.addEventListener('click' , (e)=> {

    let x = e.offsetX;
    let y = e.offsetY;


    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');
    
    if(Number(power) > 0){
        localStorage.setItem('coins' , `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;
    
        localStorage.setItem('power' , `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    } 

    if(x < 150 & y < 150){
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x < 150 & y > 150){
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x > 150 & y > 150){
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    }
    else if (x > 150 & y < 150){
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }


    setTimeout(()=>{
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

setInterval(()=> {
    count = localStorage.getItem('count')
    power = localStorage.getItem('power');
    if(Number(total) > power){
        localStorage.setItem('power' , `${Number(power) + Number(count)}`);
        body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
        body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
    }
}, 1000);


document.addEventListener("DOMContentLoaded", function () {
    window.Telegram.WebApp.expand(); // نمایش تمام صفحه

    const tg = window.Telegram.WebApp;
    const userData = tg.initDataUnsafe; // دریافت اطلاعات کاربر

    if (userData && userData.user) {
        console.log("User ID:", userData.user.id);
        console.log("Username:", userData.user.username);
        console.log("First Name:", userData.user.first_name);
        console.log("Last Name:", userData.user.last_name || "N/A");

        // نمایش اطلاعات کاربر در صفحه (اگر بخوای)
        const userInfoElement = document.getElementById("userInfo");
        if (userInfoElement) {
            userInfoElement.innerText = `👤 ${userData.user.first_name} (@${userData.user.username || "No username"})`;
        }
    } else {
        console.log("User data not available. Make sure you're running inside Telegram Mini App.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // بررسی کن که آیا در مینی‌اپ تلگرام باز شده یا نه
    if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.expand(); // نمایش تمام صفحه

        const userData = tg.initDataUnsafe; // دریافت اطلاعات کاربر

        if (userData && userData.user) {
            const userName = userData.user.first_name || "کاربر ناشناس";
            document.getElementById("user-name").innerText = `👤 خوش آمدی، ${userName}!`;
        } else {
            document.getElementById("user-name").innerText = "❌ خطا در دریافت اطلاعات کاربر!";
        }
    } else {
        document.getElementById("user-name").innerText = "❌ لطفا این بازی را در تلگرام باز کنید!";
    }
});
