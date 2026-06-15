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

            const mensagem = document.getElementById('mensagem');

            mensagem.innerHTML = `
                <div class="alert alert-success">
                    Contato cadastrado com sucesso!
                </div>
            `;

            form.reset();

            setTimeout(() => {
                mensagem.innerHTML = "";
            }, 3000);

        } catch (error) {
            console.error('Erro ao cadastrar contato:', error);

            const mensagem = document.getElementById('mensagem');

            mensagem.innerHTML = `
                <div class="alert alert-success">
                    Erro ao cadastrar contato.
                </div>
            `;

            setTimeout(() => {
                mensagem.innerHTML = "";
            }, 3000);
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
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarContato('${contato.id}')">
                        Editar
                    </button>

                    <button class="btn btn-danger btn-sm" onclick="excluirContato('${contato.id}')">
                        Excluir
                    </button>
                </td>
            `;
            tabelaContatos.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao carregar contatos:', error);
        alert('Erro ao carregar contatos. Por favor, tente novamente.');
    }
}

async function excluirContato(id) {
    const confirmar = confirm("Deseja excluir este contato?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir contato");
        }

        carregarContatos();
    } catch (error) {
        console.error(error);
        alert("Erro ao excluir contato");
    }
    
}

async function editarContato(id) {
    const novoNome = prompt("Nome: ");
    const novoTelefone = prompt("Telefone: ");
    const novoEmail = prompt("Email: ");

    if (!novoNome || !novoTelefone) {
        alert("Os campos 'Nome' e 'Telefone' são obrigatórios.");
    }

    const contatoAtualizado = {
        nome: novoNome,
        telefone: novoTelefone,
        email: novoEmail
    };

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contatoAtualizado)
        });

        if(!resposta.ok) {
            throw new Error("Erro ao editar o contato");
        }

        carregarContatos();
    } catch(error) {
        console.error(error);
        alert("Erro ao editar contato.");
    }
}