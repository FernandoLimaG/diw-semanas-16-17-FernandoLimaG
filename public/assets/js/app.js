const API_URL = "http://localhost:3000/contatos";

/* Cadastrar Contato */
const form = document.getElementById('contact-form');

if (form) {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const contato = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value
        };

        try {
            const resposta = await fetch("http://localhost:3000/contatos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contato)
            });

            if (!resposta.ok) {
                throw new Error('Erro ao cadastrar contato');
            }

            alert('Contato cadastrado com sucesso!');
            form.reset();
        } catch (error) {
            console.error('Erro ao cadastrar contato:', error);
            alert('Erro ao cadastrar contato. Por favor, tente novamente.');    
        }
    });
}

/* Listar Contatos */
const tabelaContatos = document.getElementById('contactTableBody');

if(tabelaContatos) {
    carregarContatos();
}

async function carregarContatos() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar contatos');
        }
        const contatos = await resposta.json();
        tabelaContatos.innerHTML = '';
        contatos.forEach(contato => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${contato.nome}</td>
                <td>${contato.telefone}</td>
                <td>${contato.email}</td>
            `;
            tabelaContatos.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao carregar contatos:', error);
        alert('Erro ao carregar contatos. Por favor, tente novamente.');
    }
}