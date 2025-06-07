# 📞 Sistema de Suporte Técnico em TI com CI/CD

Este projeto tem como objetivo desenvolver e implantar um 
**Sistema de Suporte Técnico em TI**, com funcionalidades de **login de usuários**
 e **agendamento de atendimentos técnicos**, utilizando práticas 
 modernas de desenvolvimento como **CI/CD, Docker e Kubernetes**.

---

## 📌 Funcionalidades

- 🔐 Tela de Login de Usuários
- 📅 Tela de Agendamento de Atendimentos Técnicos
- 🌐 API REST com Node.js + Express
- 💾 Banco de Dados MySQL com tabelas `usuarios` e `agendamentos`
- 📦 Containerização com Docker
- ⚙️ Orquestração com Kubernetes
- 🔁 Integração Contínua com Jenkins

🧪 Testes Funcionais
Verifique se a API está funcionando via navegador ou ferramentas como Postman.

Teste o login com um usuário cadastrado no banco.

Teste o agendamento de atendimento com dados válidos.

- Acessar a aplicação
Tela de Login: http://localhost:3000/login

Tela de Agendamento: http://localhost:3000/agendamento.html

## 🚀 Novidades da Versão 2.0

- ✅ Agendamentos processados diretamente via código.
- ✅ Envio automático de e-mails de:
  - **Confirmação de Agendamento Solicitado**
  - **Confirmação de Atendimento Concluído**
- ✅ Projeto executado em container Docker via Jenkins.
- ✅ Notificações funcionam com SMTP (Gmail, Mailtrap etc).

- Jenkinsfile
pipeline {
    agent any
    stages {
        stage('Clonar projeto') {
            steps {
                git 'https://github.com/SEU_USUARIO/meu-projeto.git'
            }
        }
        stage('Build Docker') {
            steps {
                script {
                    docker.build('agendamento-app')
                }
            }
        }
        stage('Executar Container') {
            steps {
                script {
                    docker.image('agendamento-app').run()
                }
            }
        }
    }
}

