Como rodar localmente

primeiro, renomeie .env.example para .env

mude a primeira linha com os dados de acesso do banco de dados(postgresql)
alterando apenas user, pass, host, port e database

rode o comando yarn para instalar as depencencias

apos isso, rode o comando yarn typeorm migration:run para rodar as migrations e instalar o banco de dados

para criar um novo usuario para o sitema, utilize um programa de API rest como postman ou insominia

apos isso, rode o comando yarn dev:server

servidor estará rodando no endereço http://localhost:3334

CRIAR NOVO USUÁRIO
com os seguintes dados, você pode criar um novo usuario

rota: http://localhost:3334/users/newUser, tipo: post
(enviar no corpo do request tipo json)
{
	"name": "nome do aluno/coordenador",
	"login": "login do aluno/coordenador",
	"password": "senha do aluno/coordenador",
	"type": number
}

obs: o "type": number deve ser um numero onde 2 = aluno e 3 = coordenador
