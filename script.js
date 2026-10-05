/* =========================================================
   ✏️ CONFIGURAÇÃO — número de WhatsApp
   Formato: indicativo do país + número, sem "+" nem espaços.
   Exemplo: 351912345678
   ========================================================= */
const WHATSAPP_NUMERO = "351900000000";
const MENSAGEM_PADRAO = "Olá Joana! Gostaria de fazer uma marcação.";

/* --------- Não é preciso mexer abaixo desta linha --------- */
const waLink = (texto) => `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;

// Todos os botões de WhatsApp
document.querySelectorAll("[data-wa]").forEach((link) => {
  link.href = waLink(link.dataset.msg || MENSAGEM_PADRAO);
});

document.getElementById("ano").textContent = new Date().getFullYear();

/* ---------- Marcação em três toques ---------- */
const preview = document.getElementById("preview");
const sendBtn = document.getElementById("builder-send");
const nomeInput = document.getElementById("nome");

function montarMensagem() {
  const servico = document.querySelector('input[name="servico"]:checked').value;
  const periodo = document.querySelector('input[name="periodo"]:checked').value;
  const nome = nomeInput.value.trim();

  let msg = nome ? `Olá Joana! Chamo-me ${nome}.` : "Olá Joana!";
  if (servico === "outra questão") {
    msg += " Tenho uma questão para lhe colocar.";
  } else if (servico.startsWith("a formação")) {
    msg += ` Gostaria de saber mais sobre ${servico}.`;
  } else {
    msg += ` Gostaria de marcar ${servico}`;
    msg += periodo ? `, de preferência ${periodo}.` : ".";
  }
  if (servico !== "outra questão" && servico.startsWith("a formação") && periodo) {
    msg += ` Tenho mais disponibilidade ${periodo}.`;
  }
  return msg;
}

function atualizar() {
  const msg = montarMensagem();
  preview.textContent = msg;
  sendBtn.href = waLink(msg);
}

document.querySelectorAll('.builder input').forEach((el) => el.addEventListener("input", atualizar));
atualizar();

/* ---------- Copiar código de desconto ---------- */
const copyBtn = document.getElementById("copy-code");
const copyHint = document.getElementById("copy-hint");
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.code);
    copyHint.textContent = "Copiado!";
  } catch {
    copyHint.textContent = "Código: " + copyBtn.dataset.code;
  }
  copyBtn.classList.add("is-copied");
  setTimeout(() => {
    copyHint.textContent = "Copiar";
    copyBtn.classList.remove("is-copied");
  }, 2200);
});
