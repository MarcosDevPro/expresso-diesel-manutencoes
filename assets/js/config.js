/**
 * config.js
 * Ponto único de configuração dos dados da empresa.
 * Ao mudar telefone, e-mail ou região, altere apenas este arquivo.
 *
 * Script clássico (sem import/export) para funcionar também via file://.
 */

window.ExpressoDiesel = window.ExpressoDiesel || {};

(function (app) {
  "use strict";

  app.EMPRESA = Object.freeze({
    nome: "Expresso Diesel",
    razaoSocial: "Expresso Diesel Manutenções Automotivas",
    cnpj: "36.804.476/0001-22",
    regiaoAtendimento: "Grande São Paulo — região metropolitana",
  });

  app.WHATSAPP = Object.freeze({
    /** Formato internacional, apenas dígitos: 55 + DDD + número. */
    numeroInternacional: "5521981059681",
    /** Formato de exibição na tela. */
    numeroExibicao: "(21) 98105-9681",
    /** Mensagem padrão do botão flutuante. */
    mensagemPadrao:
      "Olá! Vim pelo site da Expresso Diesel e preciso de atendimento.",
  });

  /**
   * Monta o link wa.me com mensagem pré-preenchida.
   * @param {string} [mensagem]
   * @returns {string}
   */
  app.linkWhatsApp = function (mensagem) {
    var texto = mensagem || app.WHATSAPP.mensagemPadrao;
    return (
      "https://wa.me/" +
      app.WHATSAPP.numeroInternacional +
      "?text=" +
      encodeURIComponent(texto)
    );
  };
})(window.ExpressoDiesel);
