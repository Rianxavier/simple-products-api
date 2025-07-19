# 🚀 Desafio Back-End - API de Produtos

## 🔢 Objetivo

Avaliar capacidade de estruturar pequenos projetos, lógica e clareza.

---

## 📊 Enunciado do desafio

Para backend: Crie uma API com as seguintes rotas:

* **POST /products**: cadastra um produto com nome, preço e SKU
* **GET /products**: retorna os produtos ordenados pelo nome
* **GET /products/\:id**: retorna os dados de um produto específico
* **PUT /products/\:id**: atualiza os dados de um produto
* **DELETE /products/\:id**: remove um produto

Cada item retornado em qualquer rota **GET** deve conter, além do nome, preço e SKU:

> **A primeira letra do alfabeto ausente no nome do produto**, considerando apenas letras de a-z (ou '\_' se todas se repetirem).

---

## 🔧 Requisitos

* Os dados devem ser **salvos em banco de dados**
* Validação simples dos dados:

  * Nome não pode ser vazio
  * Preço deve ser maior que zero
  * SKU deve ser único
  * Outras validações que considerar relevantes

---

## ⚠️ Observação

> A API foi desenvolvida utilizando **NestJS**, **Prisma** e **SQLite** para persistência dos dados, estruturando o projeto em camadas com boas práticas de organização e validações robustas.
