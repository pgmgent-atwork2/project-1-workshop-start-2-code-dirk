(() => {
  const app = {
    init() {
      this.numPages = 8;
      this.cacheElements();
      this.buildUI();
      this.listenForThemeToggle();
    },
    cacheElements() {
      this.$btnThemeToggle = document.getElementById('btn-theme-toggle');
      this.$placeholder = document.querySelector('.placeholder');
      this.$slides = document.getElementById('slides');
    },
    async buildUI() {
      for (let i = 1; i <= this.numPages; i++) {
        const res = await fetch(`static/slides/${i}.html`);
        const html = await res.text();
        this.$slides.innerHTML += html;
      }
      Reveal.initialize({
        controls: true,
        progress: true,
        center: true,
        hash: true,
        plugins: [RevealHighlight, CopyCode]
      });
      this.$placeholder.style.display = 'none';
      // Reveal.slide(0);
    },
    listenForThemeToggle() {
      this.$btnThemeToggle.addEventListener('click', () => {
        if (document.getElementById('theme-light')) {
          document.getElementById('theme-light').remove();
        } else {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'static/revealjs/theme/beige.css';
          link.id = 'theme-light';
          document.head.appendChild(link);
        }
      });
    }
  };
  app.init();
})();
