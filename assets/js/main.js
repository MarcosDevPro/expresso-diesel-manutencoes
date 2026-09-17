/**
 * main.js
 * Ponto de entrada da aplicação. Orquestra a inicialização dos módulos.
 * Deve ser o último script carregado.
 */

(function (app) {
  "use strict";

  /**
   * Preenche os elementos que dependem de configuração: links de WhatsApp,
   * número exibido e ano corrente no rodapé.
   * @returns {void}
   */
  function aplicarConfiguracao() {
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-link-whatsapp]"),
      function (elemento) {
        var mensagem = elemento.getAttribute("data-link-whatsapp");
        elemento.setAttribute("href", app.linkWhatsApp(mensagem || undefined));
        elemento.setAttribute("target", "_blank");
        elemento.setAttribute("rel", "noopener");
      }
    );

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-numero-whatsapp]"),
      function (elemento) {
        elemento.textContent = app.WHATSAPP.numeroExibicao;
      }
    );

    var ano = document.querySelector("[data-ano-atual]");
    if (ano) ano.textContent = String(new Date().getFullYear());
  }

  /**
   * Destaca no menu a seção visível durante o scroll.
   * @returns {void}
   */
  function iniciarMenuAtivo() {
    if (!("IntersectionObserver" in window)) return;

    var secoes = Array.prototype.slice.call(
      document.querySelectorAll("main section[id]")
    );
    var links = {};

    Array.prototype.forEach.call(
      document.querySelectorAll('[data-menu] a[href^="#"]'),
      function (link) {
        links[link.getAttribute("href").slice(1)] = link;
      }
    );

    if (secoes.length === 0) return;

    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          var link = links[entrada.target.id];
          if (!link || !entrada.isIntersecting) return;

          Object.keys(links).forEach(function (chave) {
            links[chave].removeAttribute("aria-current");
          });
          link.setAttribute("aria-current", "page");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    secoes.forEach(function (secao) {
      observador.observe(secao);
    });
  }

  /** Inicialização geral. */
  function iniciar() {
    aplicarConfiguracao();
    app.iniciarNavegacao();
    app.iniciarFormulario();
    iniciarMenuAtivo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})(window.ExpressoDiesel);
