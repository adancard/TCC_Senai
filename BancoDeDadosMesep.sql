DROP SCHEMA IF EXISTS msep_database;
CREATE SCHEMA msep_database;
use msep_database;

CREATE TABLE aluno (
    num_matricula_aluno Integer AUTO_INCREMENT PRIMARY KEY,
	nome varchar(100) not null,
    email_aluno VARCHAR(40),
    status_aluno BOOL DEFAULT 1
);

CREATE TABLE competencia (
	id_competencia integer auto_increment primary key,
    nome VARCHAR(100),
    tipo ENUM ('socioemocional', 'basica', 'tecnica'),
    descricao TEXT
);

CREATE TABLE criterio (
    id_criterio INT AUTO_INCREMENT PRIMARY KEY,
    id_Competencia integer NOT NULL,
    tipo ENUM ('Critica', 'Desejada'),
    nome VARCHAR(100) not null,
    constraint fk_competencia_capacidade foreign key(id_Competencia) references competencia (id_competencia)
);

create table alunoCriterio (
id_alunoCriterio Integer auto_increment primary key,
id_criterioAluno Integer not null,
num_matricula_aluno_capacidade Integer not null,
Avaliado Enum('SIM','NAO','AVALIAR'),
constraint fk_aluno_capacidade foreign key (num_matricula_aluno_capacidade) references aluno (num_matricula_aluno),
constraint fk_AlunoCritrio foreign key (id_criterioAluno) references Criterio (id_criterio)
);

CREATE TABLE curso(
    nome_curso VARCHAR(100) PRIMARY KEY,
    descricao VARCHAR(200),
    carga_horaria_horas INT
);

CREATE TABLE turmas (
    id_turma INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    curso_turma VARCHAR(100),
    periodo VARCHAR(50) NOT NULL,
    num_matricula_aluno INTEGER,
    CONSTRAINT turma_curso FOREIGN KEY (curso_turma) REFERENCES curso (nome_curso)
);

create table turmaAluno (
num_matricula_aluno Integer not null,
id_turma integer not null,
CONSTRAINT turmaAluno_aluno foreign key (num_matricula_aluno) references aluno(num_matricula_aluno),
CONSTRAINT turmaAluno_turmas foreign key (id_turma) references turmas(id_turma)
);


CREATE TABLE notas (
    id_nota INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome_aluno VARCHAR(100),
    nota INTEGER not null
);

INSERT INTO curso (nome_curso, descricao, carga_horaria_horas)
VALUES
('Desenvolvimento de Sistemas', 'Curso prático e teórico de Análise e Desenvolvimento de Sistemas. Aprenda a criar e gerenciar softwares.', 1200),
('Mecatronica', 'Curso de Mecatrônica: Integração de mecânica, eletrônica e computação para inovar na automação industrial.',2400),
('Administração','Curso de Administração: Formação em gestão empresarial, finanças e recursos humanos para líderes eficientes.',1400);

INSERT INTO aluno (nome, email_aluno)
VALUES
('Fernando Pereira', 'fernando1@emaileduc.com'),
('Juliana Santos Silva','juliana22@emaileduc.com'),
('Mariana Silva Almeida','mariana32@emaileduc.com'),
('Marcelo Mendes',  'marcelo11@emaileduc.com'),
( 'Luana Oliveira','luana123@emaileduc.com');

insert into Competencia(tipo,nome,descricao)
values('basica','fazer Programa em Java','O aluno soube desenvolver uma aplicação em java'),
('basica','respeitar as regras de programação','O aluno desenvolveu com qualidade'),
('basica','entendeu POO','O aluno entendeu a orientação a objetos'),
('tecnica','Progredir com o Kanban','soube utilizar kanban'),
('tecnica','respeitou o ambiente de desenvolvimento','colaborou no ambiente de desenvolvimento'),
('tecnica','Boas praticas ','o aluno teve otimas praticas como colaborador');

select * from competencia;

select * from Criterio;

select * from turmas;

select * from curso;

select * from aluno_criterio;

select *from notas;
