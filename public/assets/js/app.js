fetch("http://localhost:3000/")
    .then(response => response.json())
    .then(data => {
        console.log("Dados recebidos do JSON-server:", data);
    })
    .catch(error => {
        console.error("Erro ao buscar dados do JSON-server:", error);
    });