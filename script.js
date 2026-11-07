
// MANIFESTO WORD ANIMATION

const words = document.getElementById('statement');

const raw = words.textContent.trim().split(/\s+/);

words.innerHTML = raw
    .map(word => `<span>${word} </span>`)
    .join('');

const spans = [...words.querySelectorAll('span')];

function fillWords() {
    const rect = words.getBoundingClientRect();

    const progress = Math.max(
        0,
        Math.min(
            1,
            (innerHeight * .78 - rect.top) /
            (rect.height + innerHeight * .25)
        )
    );

    const count = progress * spans.length;

    spans.forEach((span, index) => {
        span.classList.toggle('lit', index < count + 1);
    });
}


// REVEAL ANIMATIONS

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('visible');

            // AVATAR ANIMATION

            if (entry.target.classList.contains('avatar-card')) {

                document.querySelectorAll('.avatars img')
                    .forEach((img, index) => {

                        setTimeout(() => {
                            img.classList.add('show');
                        }, index * 75);

                    });

            }

            // COUNTERS

            entry.target.querySelectorAll('[data-count]')
                .forEach(element => {

                    countUp(element, +element.dataset.count);

                });

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: .2
});


document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});


// NUMBER COUNTER

function countUp(element, end) {

    if (element.dataset.done) return;

    element.dataset.done = '1';

    const start = performance.now();

    const duration = 1400;

    function tick(now) {

        const progress = Math.min(
            1,
            (now - start) / duration
        );

        const value = Math.round(
            end * (1 - Math.pow(1 - progress, 3))
        );

        element.textContent =
            value + (end === 10 ? '+' : '');

        if (progress < 1) {
            requestAnimationFrame(tick);
        }

    }

    requestAnimationFrame(tick);
}


// SCROLL EFFECTS

addEventListener('scroll', () => {

    fillWords();

    const photo = document.querySelector('.hero-photo');

    if (innerWidth > 760) {

        photo.style.transform =
            `translateY(${scrollY * .12}px)`;

    }

}, {
    passive: true
});

fillWords();


// HIRE HANI FORM

document.getElementById('hireForm')
    .addEventListener('submit', event => {

        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const subject = encodeURIComponent(
            'A new mission for Hani 10'
        );

        const body = encodeURIComponent(
            `Name: ${data.get('name')}\n` +
            `Email: ${data.get('email')}\n` +
            `Mission: ${data.get('mission')}\n\n` +
            `Details:\n${data.get('details')}`
        );

        document.getElementById('formNote').textContent =
            'Opening your email app so you can send the mission to Hani.';

        location.href =
            `mailto:?subject=${subject}&body=${body}`;

    });
