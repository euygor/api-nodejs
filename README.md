# Api simples para sistema de login útilizando autenticação JWT

0 - Comando para baixar as dependências do projeto: npm install

1 - Configurar os seguintes arquivos com seus dados do banco de dados MYSQL: ".env", "config/config.json"

2 - Para executar as migrations no banco de dados basta rodar o comando: npx sequelize-cli db:migrate

3 - Comando para dar start em desenvolvimento: npm run start-dev

4 - Comando para dar start em produção: npm run start

5 - Comando para monitorar e converter arquivos typescript para javascript: tsc -w

6 - Segue abaixo os endpoints desta API

--- POST: /signup (Parâmetros: name, email, password)

--- POST: /signin (Parâmetros: email, password)

--- GET: /users (PRECISA ESTAR AUTENTICADO) (Parâmetro obrigátorio: token)

--- GET: /user/id (PRECISA ESTAR AUTENTICADO) (Parâmetro obrigátorio: token)

--- PUT: /update/id (PRECISA ESTAR AUTENTICADO) (Parâmetro obrigátorio: token) (Parâmetros opcionais: name, email, password)

--- DELETE: /deletar/id (PRECISA ESTAR AUTENTICADO) (Parâmetro obrigátorio: token)

OBS: Caso queira colocar essa API em produção alterar a função sign do jwt nas funções "signin" e "signup" do UserController, passando apenas o id como parâmetro sendo assim tornando o token seguro é cumprindo a LGPD, como desenvolvi essa API apenas para compartilhar conhecimento passei como parâmetro na função sign do jwt, todos os dados informados pelo usuário, dessa forma quem descriptografar o token vai ter acesso a todas as informações sensíveis de determinado usuário.

# End!
