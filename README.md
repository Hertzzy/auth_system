# 🚀 BACK END SISTEMA DE LOGIN

Bem-vindo(a). Este é um projeto Back end pessoal de um sistema de login de usários!

O objetivo deste projeto é avaliar minhas habilidades de programação no desenvolvimento desse pequeno sistema.

---

- [🧠 Sobre o Projeto](#-sobre-o-projeto)
- [🚰 Fluxo](#fluxo)
- [⚔️ Modelagem de Dados](#️modelagem-de-dados)
- [📓 Relacionamento das tabelas](#relacionamento-das-tabelas)
- [📓 Criação do bando de dados](#criação-do-banco-de-dados)
- [📓 Conexão com o banco de dados](#conexão-com-o-banco-de-dados)
- [📓 Migração das tabelas no Bando de Dados](#migração-das-tabelas-no-bando-de-dados)


# 🧠 Sobre o Projeto

Tenho estudado programação diariamente focado em aprender e crescer como desenvolvedor.
Fiz esse projeto no intuito de aplicar o que tenho aprendido em cursos, faculdade e palestra.

Neste projeto, está incluído os **Pefis de usuários**

- Interação do projeto.  **CRUD (Create, Read, Update e Delete)**;

# 🚰 Fluxo

- CRUD de usuários;
- Relacionamento entre as tabelas
- Middleware de Autenticação;
- Middleware de verificação de perfil do usuário;
- Tabelas Criadas: **(users, roles, users_roles)**


# ⚔️ Modelagem de Dados

## USERS

|    |                    Atributo                    | Tipo     |
|----| ---------------------------------------------- | -------- |
| PK | ID                                             | `INTEGER`|
|    | NAME                                           | `VARCHAR`|
|    | EMAIL                                          | `VARCHAR`|
|    | PASSWORD_HASH                                  | `VARCHAR`|
|    | STATUS (`Active`, `Inactive`,`Banned`)         | `ENUM`   |

## ROLES

|    |                    Atributo                    | Tipo     |
|----| ---------------------------------------------- | -------- |
| PK | ID                                             | `INTEGER`|
|    | ROLE_NAME(`ADMIN`, `MANAGER`,`USER`)           | `ENUM`   |
|    | DESCRIPTION                                    | `VARCHAR`|


## USERS_ROLES

|    |                    Atributo                    | Tipo     |
|----| ---------------------------------------------- | -------- |
| PK | ID                                             | `INTEGER`|
| FK | USER_ID                                        | `INTEGER`|
| FK | ROLE_ID                                        | `INTEGER`|

# 📓 Relacionamento das tabelas
O model users armazena os dados dos usuários e se relaciona com o model roles de forma que um usuário pode ter várias funções, e uma função pode ser atribuída a vários usuários. A tabela de associação users_roles gerencia essa relação muitos para muitos entre users e roles.

### Em outras palavras:

- Um usuário pode ter diferentes permissões e responsabilidades dependendo das funções que possui.
- O sistema pode controlar o acesso a funcionalidades e recursos com base nas funções atribuídas aos usuários.
- Isso permite uma implementação flexível e escalável de gestão de acesso e autorização.

# 📓 Criação do banco de dados

`CREATE DATABASE db_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`


**OPERAÇÕES NECESSÁRIAS**

- `CREATE`
- `READE`
- `UPDATE`
- `DELETE`

# 📓 Conexão com o banco de dados

A conexão do projeto com o banco de dados é feita pelo arquivo **.env** onde é passado as infromações do banco de dados:

- `DB_HOST` -> localhost
- `DB_BASE` -> Nome do Bando de Dados
- `DB_USER` -> Nome do usuário no Banco de Dados
- `DB_PASS` -> Senha
- `DB_DIALEC` -> Dialeto usado Banco de Dados

##