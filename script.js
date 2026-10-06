/**
 * TALLER DE COMPARACIÓN Y SELECCIÓN DE SGBD PARA PyMEs
 * Script de Control de Presentación e Interactividad
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos del DOM ---
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentSlideIndex = 0;

  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const slideCounter = document.getElementById('slideCounter');
  const progressFill = document.getElementById('progressFill');
  const slideBreadcrumb = document.getElementById('slideBreadcrumb');
  const slideDots = document.getElementById('slideDots');

  const btnNotes = document.getElementById('btnNotes');
  const notesDrawer = document.getElementById('notesDrawer');
  const notesBody = document.getElementById('notesBody');
  const btnCloseNotes = document.getElementById('btnCloseNotes');

  const btnOverview = document.getElementById('btnOverview');
  const overviewModal = document.getElementById('overviewModal');
  const overviewGrid = document.getElementById('overviewGrid');
  const btnCloseOverview = document.getElementById('btnCloseOverview');
  const overviewBackdrop = document.getElementById('overviewBackdrop');

  const btnFullscreen = document.getElementById('btnFullscreen');
  const fullscreenIcon = document.getElementById('fullscreenIcon');
  const btnTheme = document.getElementById('btnTheme');
  const themeIcon = document.getElementById('themeIcon');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // --- Generar Puntos Indicadores Inferiores ---
  function initDots() {
    slideDots.innerHTML = '';
    slides.forEach((slide, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('slide-dot');
      if (idx === currentSlideIndex) dot.classList.add('active');
      dot.title = `Diapositiva ${idx + 1}: ${slide.dataset.title || ''}`;
      dot.addEventListener('click', () => goToSlide(idx));
      slideDots.appendChild(dot);
    });
  }

  // --- Generar Mosaico de Vista General ---
  function initOverviewGrid() {
    overviewGrid.innerHTML = '';
    slides.forEach((slide, idx) => {
      const thumb = document.createElement('div');
      thumb.classList.add('overview-thumb');
      if (idx === currentSlideIndex) thumb.classList.add('current');

      const section = slide.dataset.section || 'Sección';
      const title = slide.dataset.title || `Diapositiva ${idx + 1}`;

      thumb.innerHTML = `
        <div class="thumb-header">
          <span class="thumb-num">${String(idx + 1).padStart(2, '0')}</span>
          <span>${section}</span>
        </div>
        <div class="thumb-title">${title}</div>
      `;

      thumb.addEventListener('click', () => {
        goToSlide(idx);
        closeOverview();
      });

      overviewGrid.appendChild(thumb);
    });
  }

  // --- Actualizar Estado de la Diapositiva ---
  function updateSlideState() {
    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Actualizar botones de navegación
    btnPrev.disabled = currentSlideIndex === 0;
    btnNext.disabled = currentSlideIndex === totalSlides - 1;

    // Actualizar Contador y Barra de Progreso
    const currentNum = String(currentSlideIndex + 1).padStart(2, '0');
    const totalNum = String(totalSlides).padStart(2, '0');
    slideCounter.textContent = `${currentNum} / ${totalNum}`;

    const progressPct = ((currentSlideIndex + 1) / totalSlides) * 100;
    progressFill.style.width = `${progressPct}%`;

    // Actualizar Breadcrumb
    const currentSlide = slides[currentSlideIndex];
    const section = currentSlide.dataset.section || '';
    const title = currentSlide.dataset.title || '';
    slideBreadcrumb.textContent = `${currentNum} / ${section} · ${title}`;

    // Actualizar Dots
    const dots = slideDots.querySelectorAll('.slide-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlideIndex);
    });

    // Actualizar Notas del Orador si el drawer está abierto
    updateSpeakerNotes();

    // Actualizar miniatura activa en overview
    const thumbs = overviewGrid.querySelectorAll('.overview-thumb');
    thumbs.forEach((th, idx) => {
      th.classList.toggle('current', idx === currentSlideIndex);
    });
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlideIndex = index;
    updateSlideState();
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  // --- Actualizar Notas del Orador ---
  function updateSpeakerNotes() {
    const currentSlide = slides[currentSlideIndex];
    const notesElem = currentSlide.querySelector('.speaker-notes-content');
    if (notesElem) {
      notesBody.innerHTML = notesElem.innerHTML;
    } else {
      notesBody.innerHTML = `<p style="color: var(--text-muted); font-style: italic;">Sin notas específicas para esta diapositiva.</p>`;
    }
  }

  function toggleNotes() {
    const isOpen = notesDrawer.classList.toggle('open');
    btnNotes.classList.toggle('active', isOpen);
    if (isOpen) {
      updateSpeakerNotes();
      showToast('Notas del orador abiertas');
    }
  }

  // --- Vista General / Mosaico ---
  function openOverview() {
    overviewModal.classList.add('open');
    btnOverview.classList.add('active');
  }

  function closeOverview() {
    overviewModal.classList.remove('open');
    btnOverview.classList.remove('active');
  }

  function toggleOverview() {
    if (overviewModal.classList.contains('open')) {
      closeOverview();
    } else {
      openOverview();
    }
  }

  // --- Pantalla Completa ---
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Fullscreen error:', err);
      });
      fullscreenIcon.classList.replace('ph-corners-out', 'ph-corners-in');
      showToast('Pantalla completa activada [F]');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      fullscreenIcon.classList.replace('ph-corners-in', 'ph-corners-out');
      showToast('Pantalla completa desactivada');
    }
  }

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      fullscreenIcon.classList.replace('ph-corners-out', 'ph-corners-in');
    } else {
      fullscreenIcon.classList.replace('ph-corners-in', 'ph-corners-out');
    }
  });

  // --- Tema Oscuro / Claro ---
  function toggleTheme() {
    const isDark = document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light', !isDark);

    if (isDark) {
      themeIcon.classList.replace('ph-sun', 'ph-moon');
      showToast('Modo Oscuro Cyber activado');
    } else {
      themeIcon.classList.replace('ph-moon', 'ph-sun');
      showToast('Modo Claro Ejecutivo activado');
    }
  }

  // --- Toast Notification ---
  let toastTimer = null;
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // --- Pestañas Internas de Fichas Técnicas (Tabs) ---
  const tabButtons = document.querySelectorAll('.ptab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parentSlide = e.target.closest('.slide');
      if (!parentSlide) return;

      const targetTabId = e.target.dataset.tab;
      
      // Desactivar botones de esa diapositiva
      parentSlide.querySelectorAll('.ptab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      // Mostrar contenido objetivo
      parentSlide.querySelectorAll('.ptab-content').forEach(c => c.classList.remove('active'));
      const activeContent = parentSlide.querySelector(`#${targetTabId}`);
      if (activeContent) activeContent.classList.add('active');
    });
  });

  // --- Clics en Diapositiva 1 y 4 para Saltar Directo a la Ficha ---
  const jumpCards = document.querySelectorAll('.sgbd-card-overview, .bento-engine-card');
  jumpCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetSlide = parseInt(card.dataset.targetSlide, 10);
      if (!isNaN(targetSlide)) {
        goToSlide(targetSlide - 1);
      }
    });
  });

  // --- Filtrado de Matriz Comparativa (Diapositiva 10) ---
  const matrixPills = document.querySelectorAll('.matrix-pill-btn');
  const matrixRows = document.querySelectorAll('.comparison-table tbody tr');

  matrixPills.forEach(pill => {
    pill.addEventListener('click', () => {
      matrixPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      matrixRows.forEach(row => {
        if (filter === 'all' || row.dataset.cat === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // --- Calculadora y Simulador de Recomendación PyME (Diapositiva 11) ---
  const btnRunCalc = document.getElementById('btnRunCalc');
  const pymeAppType = document.getElementById('pymeAppType');
  const pymeConcurrency = document.getElementById('pymeConcurrency');
  const pymeInfra = document.getElementById('pymeInfra');

  const resultEngineTitle = document.getElementById('resultEngineTitle');
  const resultMatchScore = document.getElementById('resultMatchScore');
  const resultJustification = document.getElementById('resultJustification');
  const rRam = document.getElementById('rRam');
  const rCost = document.getElementById('rCost');
  const rTool = document.getElementById('rTool');
  const rTip = document.getElementById('rTip');

  function calculateRecommendation() {
    const app = pymeAppType.value;
    const conc = pymeConcurrency.value;
    const infra = pymeInfra.value;

    let engine = 'PostgreSQL';
    let score = '98% de Compatibilidad';
    let justification = '';
    let ram = '4 GB';
    let cost = '$0 (Libre)';
    let tool = 'DBeaver / pgAdmin';
    let tip = 'Ecosistema robusto sin costo de licencias ni bloqueos futuros.';

    if (app === 'pos' && conc === 'single') {
      engine = 'SQLite';
      score = '99% de Compatibilidad';
      justification = 'Para un Punto de Venta (POS) local de caja única y recursos mínimos, <strong>SQLite</strong> elimina la necesidad de instalar o mantener un servidor de base de datos. Los respaldos se hacen simplemente copiando un archivo.';
      ram = '< 256 MB';
      cost = '$0 (Dominio Público)';
      tool = 'DB Browser for SQLite';
      tip = 'Ideal para operar sin fallos de conexión a red LAN.';
    } else if (app === 'legacy' || (infra === 'windows' && app === 'erp' && conc === 'medium')) {
      if (app === 'legacy') {
        engine = 'MS SQL Server Express';
        score = '95% de Compatibilidad';
        justification = 'Para software administrativo nativo en Windows desarrollado en .NET / C#, <strong>MS SQL Server Express</strong> ofrece integración perfecta y la mejor herramienta de administración visual (SSMS). Mantener atención al límite de 10 GB.';
        ram = '4 GB (Cómputo máx. 1.4 GB)';
        cost = '$0 (Hasta 10 GB de datos)';
        tool = 'SQL Server Management Studio (SSMS)';
        tip = 'Verificar periódicamente el tamaño de los archivos .mdf.';
      } else {
        engine = 'PostgreSQL';
        score = '96% de Compatibilidad';
        justification = 'Para un ERP con facturación e inventario con múltiples terminales en red, <strong>PostgreSQL</strong> brinda máxima solidez ACID y evita los topes de 10 GB de la edición Express de Microsoft.';
        ram = '4 GB - 8 GB';
        cost = '$0 (Ilimitado)';
        tool = 'pgAdmin / DBeaver';
        tip = 'Excelente integración con frameworks modernos y reporting.';
      }
    } else if (app === 'web') {
      engine = 'MySQL / MariaDB';
      score = '97% de Compatibilidad';
      justification = 'Para tiendas online, catálogos web y portales e-commerce, <strong>MySQL / MariaDB</strong> cuenta con la mayor compatibilidad del ecosistema web (WordPress, PrestaShop, WooCommerce) y un enorme mercado de soporte técnico.';
      ram = '2 GB - 4 GB';
      cost = '$0 (GPL / MariaDB)';
      tool = 'HeidiSQL / phpMyAdmin';
      tip = 'Instalación rápida en cualquier hosting o VPS local.';
    } else if (app === 'catalog') {
      engine = 'MongoDB';
      score = '94% de Compatibilidad';
      justification = 'Para catálogos dinámicos con atributos heterogéneos y cambios frecuentes de especificaciones, <strong>MongoDB</strong> permite esquemas flexibles en JSON/BSON sin migraciones rígidas de tablas.';
      ram = '4 GB - 8 GB';
      cost = '$0 (Community Edition)';
      tool = 'MongoDB Compass';
      tip = 'Se aconseja complementar con un motor relacional para el libro contable.';
    } else {
      engine = 'PostgreSQL';
      score = '98% de Compatibilidad';
      justification = 'Para sistemas de facturación, contabilidad e inventarios con concurrencia media o alta, <strong>PostgreSQL</strong> es la opción óptima por su estricto cumplimiento ACID, cero costos de licencia y soporte de datos híbridos (relacional + JSONB).';
      ram = '4 GB - 8 GB';
      cost = '$0 (Ilimitado)';
      tool = 'DBeaver / pgAdmin 4';
      tip = 'La inversión más segura a largo plazo para la empresa.';
    }

    // Efecto visual de recálculo
    const calcResult = document.getElementById('calcResult');
    calcResult.style.opacity = '0.5';
    calcResult.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      resultEngineTitle.textContent = engine;
      resultMatchScore.textContent = score;
      resultJustification.innerHTML = justification;
      rRam.textContent = ram;
      rCost.textContent = cost;
      rTool.textContent = tool;
      rTip.textContent = tip;
      
      calcResult.style.opacity = '1';
      calcResult.style.transform = 'scale(1)';
      showToast(`Evaluación completada: Recomendado ${engine}`);
    }, 200);
  }

  if (btnRunCalc) {
    btnRunCalc.addEventListener('click', calculateRecommendation);
    [pymeAppType, pymeConcurrency, pymeInfra].forEach(select => {
      select.addEventListener('change', calculateRecommendation);
    });
  }

  // --- Atajos de Teclado ---
  document.addEventListener('keydown', (e) => {
    // Si el usuario está interactuando con un select o input, no intervenir flechas
    if (['SELECT', 'INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case ' ': // Barra espaciadora
      case 'PageDown':
        e.preventDefault();
        nextSlide();
        break;

      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;

      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;

      case 'End':
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;

      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;

      case 'n':
      case 'N':
        e.preventDefault();
        toggleNotes();
        break;

      case 'o':
      case 'O':
        e.preventDefault();
        toggleOverview();
        break;

      case 't':
      case 'T':
        e.preventDefault();
        toggleTheme();
        break;

      case 'Escape':
        if (overviewModal.classList.contains('open')) {
          closeOverview();
        } else if (notesDrawer.classList.contains('open')) {
          toggleNotes();
        }
        break;
    }
  });

  // --- Soporte Táctil / Swipe ---
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
      if (diffX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, { passive: true });

  // --- Event Listeners de Botones de Control ---
  btnPrev.addEventListener('click', prevSlide);
  btnNext.addEventListener('click', nextSlide);
  btnNotes.addEventListener('click', toggleNotes);
  btnCloseNotes.addEventListener('click', toggleNotes);
  btnOverview.addEventListener('click', toggleOverview);
  btnCloseOverview.addEventListener('click', closeOverview);
  overviewBackdrop.addEventListener('click', closeOverview);
  btnFullscreen.addEventListener('click', toggleFullscreen);
  btnTheme.addEventListener('click', toggleTheme);

  // Inicialización
  initDots();
  initOverviewGrid();
  updateSlideState();
});
