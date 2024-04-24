(() => {
  const app = {
    init() {
      this.numPages = 8;
      this.cacheElements();
      this.buildUI();
      this.listenForThemeToggle();
    },
    cacheElements() {
      this.theme = localStorage.getItem('S2C-theme') || 'dark';
      this.$btnThemeToggle = document.getElementById('btn-theme-toggle');
      this.$placeholder = document.querySelector('.placeholder');
      this.$slides = document.getElementById('slides');
    },
    async buildUI() {
      // Set theme
      this.setTheme(this.theme);
      // Add slides
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
        if (this.theme === 'dark') this.setTheme('light')
        else this.setTheme('dark')
      });
    },
    setTheme(theme) {
      localStorage.setItem('S2C-theme', theme);
      if (theme === 'dark') {
        return document.getElementById('theme-light')?.remove();
      } else {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `static/revealjs/theme/beige.css`;
        link.id = 'theme-light';
        document.head.appendChild(link);
      }
    }
  };
  app.init();
})();
