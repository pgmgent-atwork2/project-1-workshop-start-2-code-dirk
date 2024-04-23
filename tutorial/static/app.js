(() => {
  const app = {
    init() {
      this.numPages = 8;
      this.cacheElements();
      this.buildUI();
    },
    cacheElements() {
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
  };
  app.init();
})();
