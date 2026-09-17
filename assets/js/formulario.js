/**
 * formulario.js
 * Validação do formulário de contato e encaminhamento da solicitação.
 *
 * Sem back-end, o envio monta uma mensagem pré-formatada e abre o WhatsApp.
 * Para trocar por envio real (e-mail/API), substitua apenas `encaminhar`.
 */

window.ExpressoDiesel = window.ExpressoDiesel || {};

(function (app) {
  "use strict";

  /** Campos obrigatórios e suas mensagens de erro. */
  var REGRAS = {
    nome: "Informe seu nome.",
    telefone: "Informe um telefone para contato.",
    assunto: "Selecione o que você precisa.",
  };

  /**
   * Valida um campo e exibe/oculta a mensagem de erro correspondente.
   * @param {HTMLElement} campo
   * @returns {boolean} true se válido
   */
  function validarCampo(campo) {
    var mensagem = REGRAS[campo.name];
    if (!mensagem) return true;

    var valido = campo.value.trim() !== "";
    var alvoErro = document.querySelector('[data-erro-de="' + campo.name + '"]');

    campo.setAttribute("aria-invalid", String(!valido));
    if (alvoErro) alvoErro.textContent = valido ? "" : mensagem;

    return valido;
  }

  /**
   * Monta a mensagem de WhatsApp a partir dos dados do formulário.
   * @param {HTMLFormElement} formulario
   * @returns {string}
   */
  function montarMensagem(formulario) {
    function valor(nome) {
      var campo = formulario.elements[nome];
      return campo ? campo.value.trim() : "";
    }

    var linhas = [
      "Olá! Vim pelo site da Expresso Diesel.",
      "",
      "Nome: " + valor("nome"),
      "Telefone: " + valor("telefone"),
    ];

    if (valor("empresa")) linhas.push("Empresa: " + valor("empresa"));
    linhas.push("Assunto: " + valor("assunto"));

    if (valor("mensagem")) {
      linhas.push("", "Mensagem: " + valor("mensagem"));
    }

    return linhas.join("\n");
  }

  /**
   * Encaminha a solicitação. Ponto único de troca para um back-end real.
   * @param {HTMLFormElement} formulario
   * @returns {void}
   */
  function encaminhar(formulario) {
    var url =
      "https://wa.me/" +
      app.WHATSAPP.numeroInternacional +
      "?text=" +
      encodeURIComponent(montarMensagem(formulario));
    window.open(url, "_blank", "noopener");
  }

  /**
   * Inicializa o formulário de contato.
   * @returns {void}
   */
  app.iniciarFormulario = function () {
    var formulario = document.querySelector("[data-formulario-contato]");
    if (!formulario) return;

    var status = formulario.querySelector("[data-form-status]");
    var campos = Array.prototype.slice.call(formulario.querySelectorAll("[name]"));

    campos.forEach(function (campo) {
      campo.addEventListener("blur", function () {
        validarCampo(campo);
      });
    });

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      var invalidos = campos.filter(function (campo) {
        return !validarCampo(campo);
      });

      if (invalidos.length > 0) {
        if (status) {
          status.hidden = false;
          status.textContent = "Revise os campos destacados antes de enviar.";
        }
        invalidos[0].focus();
        return;
      }

      encaminhar(formulario);

      if (status) {
        status.hidden = false;
        status.textContent = "Abrindo o WhatsApp com sua mensagem. Já falamos!";
      }

      formulario.reset();
      campos.forEach(function (campo) {
        campo.removeAttribute("aria-invalid");
      });
    });
  };
})(window.ExpressoDiesel);
