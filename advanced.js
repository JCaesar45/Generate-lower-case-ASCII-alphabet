const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let width, height;

class Particle {
  constructor(x, y, char) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.life = 120;
    this.size = Math.random() * 18 + 14;
    this.hue = 42;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.12;
    this.life--;
    this.vx *= 0.98;
    this.vy *= 0.98;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.life / 120;
    ctx.fillStyle = `hsl(${this.hue}, 88%, 82%)`;
    ctx.font = `${this.size}px monospace`;
    ctx.fillText(this.char, this.x, this.y);
    ctx.restore();
  }
}

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createBackgroundParticles() {
  if (Math.random() < 0.4) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const char = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    particles.push(new Particle(x, y, char));
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  createBackgroundParticles();

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.life <= 0) particles.splice(i, 1);
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);

function lascii(start, end) {
  const result = [];
  for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
    result.push(String.fromCharCode(i));
  }
  return result;
}

document.getElementById("generate").addEventListener("click", () => {
  const startInput = document.getElementById("start").value.trim();
  const endInput = document.getElementById("end").value.trim();

  if (
    !startInput ||
    !endInput ||
    startInput.length !== 1 ||
    endInput.length !== 1
  )
    return;

  const start = startInput.toLowerCase();
  const end = endInput.toLowerCase();

  if (start > end) {
    const resultEl = document.getElementById("result");
    resultEl.classList.remove("show");
    setTimeout(() => {
      resultEl.style.borderColor = "#ff4444";
      resultEl.classList.add("show");
      document.getElementById(
        "array"
      ).innerHTML = `<span style="color:#ff8888">Invalid range — start must come before end</span>`;
      setTimeout(() => resultEl.classList.remove("show"), 1800);
    }, 10);
    return;
  }

  const sequence = lascii(start, end);
  const arrayEl = document.getElementById("array");
  const resultContainer = document.getElementById("result");

  arrayEl.innerHTML = sequence
    .map((char) => `<span class="letter">${char}</span>`)
    .join("");

  resultContainer.classList.remove("show");

  setTimeout(() => {
    resultContainer.classList.add("show");

    const rect = arrayEl.getBoundingClientRect();
    sequence.forEach((char, index) => {
      const burstX = rect.left + (rect.width / sequence.length) * index + 20;
      const burstY = rect.top + 30;
      for (let i = 0; i < 8; i++) {
        const p = new Particle(burstX, burstY, char);
        p.vx = (Math.random() - 0.5) * 12;
        p.vy = (Math.random() - 0.5) * 12 - 4;
        p.life = 80;
        particles.push(p);
      }
    });
  }, 50);
});

document.getElementById("copy-result").addEventListener("click", () => {
  const arrayText = Array.from(document.getElementById("array").children)
    .map((el) => el.textContent)
    .join(", ");
  navigator.clipboard.writeText(`[${arrayText}]`).then(() => {
    const btn = document.getElementById("copy-result");
    const original = btn.textContent;
    btn.textContent = "COPIED ✓";
    setTimeout(() => (btn.textContent = original), 1400);
  });
});

document.querySelectorAll(".copy-code").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-target");
    const codeEl = document.getElementById(id);
    navigator.clipboard.writeText(codeEl.textContent).then(() => {
      const original = btn.textContent;
      btn.textContent = "COPIED ✓";
      setTimeout(() => (btn.textContent = original), 1400);
    });
  });
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".code-panel")
      .forEach((p) => p.classList.remove("active"));

    tab.classList.add("active");
    document
      .getElementById(`code-${tab.getAttribute("data-tab")}`)
      .classList.add("active");
  });
});

document.getElementById("copy-all").addEventListener("click", (e) => {
  e.preventDefault();
  const allCode = `// JavaScript\n${
    document.getElementById("js-code").textContent
  }\n\n# Python\n${
    document.getElementById("py-code").textContent
  }\n\n// Java\n${document.getElementById("java-code").textContent}`;
  navigator.clipboard
    .writeText(allCode)
    .then(() => alert("All three implementations copied to clipboard ✨"));
});

resize();
animate();
