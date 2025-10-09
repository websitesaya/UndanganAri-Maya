// Fungsi untuk mengambil parameter dari URL
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Countdown Timer
function countdown() {
  const countDate = new Date("Oct 17, 2025 18:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  const dayEl = document.querySelector(".day");
  const hourEl = document.querySelector(".hour");
  const minuteEl = document.querySelector(".minute");
  const secondEl = document.querySelector(".second");

  if (dayEl) dayEl.innerText = textDay;
  if (hourEl) hourEl.innerText = textHour;
  if (minuteEl) minuteEl.innerText = textMinute;
  if (secondEl) secondEl.innerText = textSecond;
}

setInterval(countdown, 1000);

// Play Music and Start Snow After DOM Load
window.addEventListener("DOMContentLoaded", () => {
  // TAMBAHAN: Set nama tamu dari URL ke cover
  const guestNameParam = getURLParameter('nama');
  const coverGuestNameEl = document.getElementById('cover-guest-name');
  
  if (guestNameParam && coverGuestNameEl) {
    coverGuestNameEl.textContent = guestNameParam;
    console.log("Nama tamu berhasil di-set:", guestNameParam);
  } else {
    console.log("Nama tamu tidak ditemukan di URL atau elemen tidak ada");
  }

  const audio = document.getElementById("bg-music");
  const cover = document.getElementById("cover");
  const openBtn = document.getElementById("openInvitation");

  console.log("Audio:", audio);
  console.log("Cover:", cover);
  console.log("Button:", openBtn);

  // Musik hanya dimulai setelah user klik tombol
  if (openBtn && audio && cover) {
    openBtn.addEventListener("click", () => {
      console.log("Button clicked!");

      // Mainkan musik
      audio.play().then(() => {
        console.log("Music playing!");
      }).catch(err => {
        console.log("Audio play prevented:", err);
      });

      // Sembunyikan cover dengan animasi
      cover.style.transition = "opacity 0.5s";
      cover.style.opacity = "0";
      setTimeout(() => {
        cover.style.display = "none";
      }, 500);
    });
  } else {
    console.error("Element not found!");
    console.log("Missing elements:", {
      audio: !audio,
      cover: !cover,
      openBtn: !openBtn
    });
  }

  // Counter foto galeri
  const slider = document.querySelector('.gallery-slider');
  const counter = document.getElementById('current-photo');
  const total = document.getElementById('total-photos');

  if (slider && counter && total) {
    const images = slider.querySelectorAll('img');
    total.textContent = images.length;

    slider.addEventListener('scroll', () => {
      const scrollLeft = slider.scrollLeft;
      const width = slider.offsetWidth;
      const current = Math.round(scrollLeft / width) + 1;
      counter.textContent = current;
    });
  }

  // Jalankan Efek Hujan Salju
  createSnowflakes();

  // RSVP Form Handler dengan WhatsApp
  const rsvpForm = document.getElementById('rsvpForm');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nama = document.getElementById('namaInput').value.trim();
      const kehadiran = document.getElementById('kehadiranSelect').value;
      const ucapan = document.getElementById('ucapanTextarea').value.trim();

      if (!nama || !kehadiran) {
        alert('Mohon lengkapi nama dan pilihan kehadiran!');
        return;
      }

      const nomorWhatsApp = '6282318640249';
      let pesan = `*RSVP Undangan*\n\n`;
      pesan += `Nama: ${nama}\n`;
      pesan += `Kehadiran: ${kehadiran}\n`;

      if (ucapan) {
        pesan += `\nUcapan:\n${ucapan}`;
      }

      const pesanEncoded = encodeURIComponent(pesan);
      const waLink = `https://wa.me/${nomorWhatsApp}?text=${pesanEncoded}`;
      window.open(waLink, '_blank');
    });
  }
});

// Hujan Salju
function createSnowflakes() {
  const snowContainer = document.querySelector('.snow');
  if (!snowContainer) return;

  const numberOfSnowflakes = 100;
  for (let i = 0; i < numberOfSnowflakes; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.width = `${Math.random() * 10 + 5}px`;
    snowflake.style.height = snowflake.style.width;
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
    snowContainer.appendChild(snowflake);
  }
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
