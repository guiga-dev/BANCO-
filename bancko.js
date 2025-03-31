const form = document.querySelector('form');
const nome = document.getElementById('nome');
const chave_pix = document.getElementById('chave_pix');
const valor = document.getElementById('valor');
const descricao = document.getElementById('descricao');
const containerMensagemSucesso = document.querySelector('.success-message');
const nomeErro = document.getElementById('nome-erro'); // Mensagem de erro abaixo do campo nome

function validaNome(nomecompleto) {
    const nomeComoArray = nomecompleto.trim().split(' ');
    return nomeComoArray.length >= 2;
}

// Formatar o campo "Valor" para exibir "R$"
valor.addEventListener('input', function () {
    let valorFormatado = this.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (valorFormatado) {
        this.value = `R$ ${parseFloat(valorFormatado / 100).toFixed(2)}`; // Formata como moeda
    } else {
        this.value = ""; // Se apagar tudo, remove o "R$"
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nomeValido = validaNome(nome.value);
    const valorNumerico = parseFloat(valor.value.replace("R$", "").replace(",", "."));

    if (!nomeValido) {
        nomeErro.textContent = "Preencha com nome e sobrenome!";
        nomeErro.style.display = "block";
        return;
    } else {
        nomeErro.style.display = "none";
    }

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
        alert('Digite um valor válido para a transferência');
        return;
    }

    // Exibir a mensagem de sucesso
    containerMensagemSucesso.textContent = `Montante de R$ ${valorNumerico.toFixed(2)} enviado com sucesso para ${nome.value}!`;
    containerMensagemSucesso.style.display = 'block';

    // Limpar os campos depois de um tempo
    setTimeout(() => {
        nome.value = "";
        chave_pix.value = "";
        valor.value = "";
        descricao.value = "";
        containerMensagemSucesso.style.display = 'none';
    }, 3000);
});
