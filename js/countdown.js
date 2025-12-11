// Countdown Timer Module
import { WEDDING_DATE } from './config.js';

export function initCountdown() {
    const countdownDate = WEDDING_DATE.getTime();

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "<div class='col-span-4 font-serif text-3xl'>Hôm Nay Là Ngày Cưới Của Chúng Tôi!</div>";
        }
    }, 1000);
}
