/**
 * navegacao.js
 * Menu responsivo: alternância em telas pequenas, fechamento por Esc/clique
 * em link e sincronização com o tamanho da janela.
 */

window.ExpressoDiesel = window.ExpressoDiesel || {};

(function (app) {
  "use strict";

  /** Largura máxima em que o menu opera em modo "gaveta". */
  var LARGURA_MOBILE = 900;

  /**
   * Inicializa o comportamento da navegação principal.
   * @returns {void}
   */
  app.iniciarNavegacao = function () {
    var toggle = document.querySelector("[data-menu-toggle]");
    var menu = document.querySelector("[data-menu]");

    if (!toggle || !menu) return;

    /**
     * Define o estado do menu.
     * @param {boolean} aberto
     */
    function definirEstado(aberto) {
      toggle.setAttribute("aria-expanded", String(aberto));
      menu.hidden = !aberto;
    }

    /** Em telas grandes o menu é sempre visível; em mobile, começa fechado. */
    function sincronizarComViewport() {
      definirEstado(window.innerWidth > LARGURA_MOBILE);
    }

    toggle.addEventListener("click", function () {
      var aberto = toggle.getAttribute("aria-expanded") === "true";
      definirEstado(!aberto);
    });

    Array.prototype.forEach.call(menu.querySelectorAll("a"), function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= LARGURA_MOBILE) definirEstado(false);
      });
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && window.innerWidth <= LARGURA_MOBILE) {
        definirEstado(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", sincronizarComViewport);
    sincronizarComViewport();
  };
})(window.ExpressoDiesel);
