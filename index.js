const express = require("express");
const server = express();
const port = 3002;

server.use(express.json());    // Habilita o uso de JSON no corpo da requisição

const data = [
  {
    id: 1,
    name: "o homem de ferro",
    genre: "Ação",
  },
  {
    id: 2,
    name: "o homem de ferro 2",
    genre: "Ação",
  },
];// Array de livros

server.get("/livro", (req, res) => {
  res.json(data);
}); // Retorna todos os livros

const livroId = (req, res) => {
  const id = req.params.id;
  const livro = data.find((item) => item.id === Number(id));
  if (!livro) {
     res.status(404).send("Livro não encontrado");
  }
  res.json(livro);
};// Retorna um livro específico

server.get("/livro/:id", livroId);

server.post("/livro", (req, res) => {
    const { id, name, genre } = req.body; // Pegando os dados do corpo da 
    
     // Verifica se já existe um livro com o mesmo ID
  if (data.some((livro) => livro.id === id)) {
    return res.status(400).json({ error: "ID já existe!" }); // Retorna um erro
  }

  // Criando um novo livro e adicionando ao array
  const novoLivro = { id, name, genre };
  data.push(novoLivro);

  res.status(201).json(novoLivro); // Retorna o novo livro criado
});


server.delete("/livro/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = data.findIndex((item) => item.id === id);// findIndex retorna o índice do item no array
    if (index === -1) {
      return res.status(404).json({ error: "Livro não encontrado" });
    } else {
    data.splice(index, 1);//posicao, quantidade de elementos a serem removidos
    res.status(200).json({ message: "Livro removido com sucesso!" });}
});// Deleta um livro específico(por id)

server.put("/livro/:id", (req, res) => {
    const id = Number(req.params.id); // Pegamos o ID da URL e convertemos para número
    const { name, genre } = req.body;  // Pegamos os dados de name e genre enviados no corpo da requisição
  
    // Encontramos o índice do livro no array com o ID
    const index = data.findIndex((item) => item.id === id);
  
    if (index === -1) {
      return res.status(404).json({ error: "Livro não encontrado" }); // Se não encontrar o livro
    }
  
    // Atualizamos o livro com os novos dados
    data[index] = { id, name, genre };
  
    // Retornamos o livro atualizado
    res.status(200).json(data[index]);  // Envia o livro atualizado como resposta
  });
  

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
