/* ==========================================================================
   Jiawei Tong — Academic Homepage Scripts
   - Theme toggle (light/dark with system preference)
   - Full EN / ZH bilingual toggle
   - One-click email copy & BibTeX copy
   - Active navigation spy & scroll reveal
   ========================================================================== */

(function () {
  "use strict";

  const BIBTEX_MAP = {
    tong_2026_friend: `@inproceedings{tong2026friend,
  author    = {Tong, Jiawei and Zhu, Y. and Marx, Julian and Cui, Tingru and Liu, L. and Turel, Ofir},
  title     = {Friend or Challenger? Designing Pedagogical AI for Learning Engagement and Outcomes},
  booktitle = {ACIS 2026 Proceedings},
  year      = {2026},
  note      = {Forthcoming}
}`,
    tong_2025_better: `@inproceedings{tong2025better,
  author    = {Tong, Jiawei and Sun, Fang and Rao, Hui and Marx, Julian},
  title     = {Better Questions, Better Care? The Role of Patient Inquiry Quality and Delivery Models in Asynchronous Online Health Interactions},
  booktitle = {ACIS 2025 Proceedings},
  year      = {2025},
  url       = {https://aisel.aisnet.org/acis2025/69}
}`,
    tong_2025_understanding: `@inproceedings{tong2025understanding,
  author    = {Tong, Jiawei and Marx, Julian and Cui, Tingru and Turel, Ofir},
  title     = {Understanding AI Accountability Implementation in Organizations: Insights from a Chinese Commercial Bank},
  booktitle = {PACIS 2025 Proceedings},
  year      = {2025},
  url       = {https://aisel.aisnet.org/pacis2025/it_strategy/it_strategy/5}
}`,
    tong_2025_bridging: `@inproceedings{tong2025bridging,
  author    = {Tong, Jiawei and Marx, Julian and Cui, Tingru and Turel, Ofir},
  title     = {Bridging the AI Accountability Gap: The Role of Collaboration Paradigms and Reason-Responsiveness},
  booktitle = {ECIS 2025 Proceedings},
  year      = {2025},
  url       = {https://aisel.aisnet.org/ecis2025/human_ai/human_ai/2}
}`,
    tong_2024_combatting: `@inproceedings{tong2024combatting,
  author    = {Tong, Jiawei and Marx, Julian and Turel, Ofir and Cui, Tingru},
  title     = {Combatting Deepfake Misinformation on Social Media: A Scoping Review and Research Agenda},
  booktitle = {ACIS 2024 Proceedings},
  year      = {2024},
  url       = {https://aisel.aisnet.org/acis2024/25}
}`,
    mou_2024_effective: `@inproceedings{mou2024effective,
  author    = {Mou, Danlei and Cui, Tingru and Holtta-Otto, Katja and Du, Bo and Tong, Jiawei},
  title     = {Effective Stereotypical Bias Detection: The Impact of Human-AI Collaboration Modes on Human Reliance on AI Recommendation},
  booktitle = {ACIS 2024 Proceedings},
  year      = {2024},
  url       = {https://aisel.aisnet.org/acis2024/146}
}`,
    tong_2023_anthropomorphism: `@inproceedings{tong2023anthropomorphism,
  author    = {Tong, Jiawei and Cui, Tingru and Turel, Ofir and Du, Bo and Cheng, Huaihui},
  title     = {The Effects of Anthropomorphism and Explanation Types on User Perception and Acceptance: Implications for Explainable AI},
  booktitle = {ACIS 2023 Proceedings},
  year      = {2023},
  url       = {https://aisel.aisnet.org/acis2023/42}
}`,
  };

  /* ─── Theme Toggle ─────────────────────────────────────────────────────── */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  function applyTheme(isDark) {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    if (themeIcon) {
      themeIcon.classList.toggle("fa-sun", isDark);
      themeIcon.classList.toggle("fa-moon", !isDark);
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      applyTheme(!isDark);
    });
  }

  /* ─── Bilingual EN / ZH Toggle ─────────────────────────────────────────── */
  const langToggle = document.getElementById("langToggle");

  function applyLang(lang) {
    const resolved = lang === "zh" ? "zh" : "en";
    document.querySelectorAll("[data-en]").forEach(function (el) {
      el.innerHTML = el.dataset[resolved] || el.dataset.en;
    });
    if (langToggle) {
      langToggle.textContent = resolved === "en" ? "中文" : "EN";
    }
    document.documentElement.lang = resolved === "en" ? "en" : "zh-CN";
    localStorage.setItem("lang", resolved);
  }

  applyLang(localStorage.getItem("lang") || "en");

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      const next = (localStorage.getItem("lang") || "en") === "en" ? "zh" : "en";
      applyLang(next);
    });
  }

  /* ─── Copy Helpers (Email & BibTeX) ────────────────────────────────────── */
  function copyText(text, onDone) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onDone).catch(function () {
        fallbackCopy(text, onDone);
      });
    } else {
      fallbackCopy(text, onDone);
    }
  }

  function fallbackCopy(text, onDone) {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      onDone();
    } finally {
      document.body.removeChild(area);
    }
  }

  const copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", function () {
      const email = copyEmailBtn.dataset.email || "jiawei.tong.1@unimelb.edu.au";
      copyText(email, function () {
        const lang = localStorage.getItem("lang") || "en";
        const orig = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML =
          '<i class="fa-solid fa-check"></i><span>' +
          (lang === "zh" ? "已复制" : "Copied") +
          "</span>";
        setTimeout(function () {
          copyEmailBtn.innerHTML = orig;
        }, 1600);
      });
    });
  }

  document.querySelectorAll(".bib-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const key = btn.dataset.bib;
      const bib = BIBTEX_MAP[key];
      if (!bib) return;
      copyText(bib, function () {
        const lang = localStorage.getItem("lang") || "en";
        const orig = btn.innerHTML;
        btn.innerHTML =
          '<i class="fa-solid fa-check"></i> ' + (lang === "zh" ? "已复制 BibTeX" : "Copied BibTeX");
        setTimeout(function () {
          btn.innerHTML = orig;
        }, 1800);
      });
    });
  });

  /* ─── Scroll Reveal & Active Nav Highlight ─────────────────────────────── */
  const sections = Array.from(document.querySelectorAll(".section"));
  const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));

  if ("IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    sections.forEach(function (sec) {
      revealObs.observe(sec);
    });

    const spyObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle("active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    sections.forEach(function (sec) {
      spyObs.observe(sec);
    });
  } else {
    sections.forEach(function (sec) {
      sec.classList.add("visible");
    });
  }
})();
