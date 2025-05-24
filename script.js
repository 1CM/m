document.addEventListener('DOMContentLoaded', () => {
  // === Cookie Consent ===
  const cookieBanner = document.getElementById('cookieConsent');
  if (cookieBanner) {
    if (!localStorage.getItem('cookiesAccepted')) {
      cookieBanner.classList.add('show');
    }

    window.acceptCookies = function () {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.classList.remove('show');
    };
  }

  // === Banner Scroll ===
  const banner = document.getElementById('certBanner');
  const wrapper = document.querySelector('.cert-banner-wrapper');

  if (banner && wrapper) {
    banner.innerHTML += banner.innerHTML;

    const items = banner.children;
    const originalCount = items.length / 2;
    let totalWidth = 0;
    for (let i = 0; i < originalCount; i++) {
      const style = getComputedStyle(items[i]);
      totalWidth += items[i].offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    let scrollPos = 0;
    const speed = 0.5;
    let paused = false;

    wrapper.addEventListener('mouseenter', () => paused = true);
    wrapper.addEventListener('mouseleave', () => paused = false);

    function animate() {
      if (!paused) {
        scrollPos += speed;
        if (scrollPos >= totalWidth) scrollPos = 0;
        banner.style.transform = `translateX(${-scrollPos}px)`;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // === Modal Logic ===
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');

  if (modal && modalImg && modalClose) {
    document.querySelectorAll('.cert-image').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        paused = true;
      });
    });

    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
      paused = false;
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        paused = false;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        paused = false;
      }
    });
  }
});
