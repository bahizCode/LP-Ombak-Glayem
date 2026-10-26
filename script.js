const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

toggle.addEventListener('click', () => {
    root.classList.toggle('dark'); // togle mengembalikan true atau false
    const isDark = root.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    // ini cara menyimpan thema di lokal
    // if (savedTheme === 'dark') {root.classList.add('dark');}
    // if (savedTheme === 'light') {root.classList.remove('dark');}

    // ini cara menyimpan thema sesuai dengan os user
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    // ini untuk tuna netra agar bisa mengetahui apakah tombol toggle sudah ditekan atau belum
    toggle.setAttribute('aria-pressed', root.classList.contains('dark'));
}
applyTheme();

const track = document.getElementById('carousel-track');
const prev = document.getElementById('carousel-prev');
const next = document.getElementById('carousel-next');
const dots = document.querySelectorAll('#carousel-dots button');
const slides = document.querySelectorAll('.carousel-slide');

let index = 0;
const totalSlides = slides.length;

function goTo (newIndex) {
    index = newIndex;

    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
}

function nextBtn() {
    goTo((index + 1) % totalSlides);
}

function prevBtn() {
    goTo((index - 1 + totalSlides) % totalSlides);
}

next.addEventListener('click', nextBtn);
prev.addEventListener('click', prevBtn);

const ACTIVE = ['w-8', 'bg-sea', 'dark:bg-sea-light'];
const INACTIVE = ['w-2.5', 'bg-ink/25', 'dark:bg-white/25'];

function updateDots() {
    dots.forEach((dot, i) => {
        const isActive = i === index;
        console.log(isActive);

        dot.classList.remove(...(isActive ? INACTIVE : ACTIVE));
        dot.classList.add(...(isActive ? ACTIVE : INACTIVE));

        //aksesibilitas dan keyboardTandai dot yang aktif untuk screen reader. Tambahkan di updateDots, di dalam forEach:

        if (isActive) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
    })
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        goTo(Number(dot.dataset.index));
    })
    console.log(dot.dataset.index);
})

// AUTO PLAY
let timer;

function startAutoplay() {
  timer = setInterval(nextBtn, 5000); // ganti slide tiap 5 detik
}

function stopAutoplay() {
  clearInterval(timer);
}

startAutoplay();

// Berhenti saat kursor di atas carousel
const carousel = document.getElementById('carousel');
carousel.addEventListener('mouseenter', stopAutoplay);
carousel.addEventListener('mouseleave', startAutoplay);

//Tombol panah keyboard

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextBtn();
  if (e.key === 'ArrowLeft') prevBtn();
});

//Blank ke wa
const form = document.getElementById('email-form');
const emailInput = document.getElementById('email-input');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // cegah reload
  if (emailInput.checkValidity()) {
    const phoneNumber = "6285862475705";
    const message = `Halo, email saya: ${emailInput.value}`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = waUrl;
  } else {
    emailInput.reportValidity();
  }
});
