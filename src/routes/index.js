import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import Login from "../pages/Login/login";
import TelaTurmas from "../pages/Turmas/telaTurmas";
import TelaCurricular from "../pages/telaCurricular/telaCurricular";
import TelaProjeto from "../pages/Competencias/TelaProjeto";
import DropdownComponent from "../pages/Tabela/telaTabela";
import Avaliar from "../pages/avaliarAluno/avaliarAluno";
import CriarCompetencias from "../pages/Competencias/criarCompetencias";
import VerificarNotas from "../pages/Notas/verificarNotas";
import criarNovaTurma from "../pages/Turmas/criarNovaTurma"
import TelaPDF from "../pages/pdf/TelaPdf";
import TelaNota from "../pages/Notas/verificarNotas";
import VisualizarNotas from "../pages/Notas/visualizarNotas";

const Stack = createStackNavigator();



export default function Routes() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="TelaTurmas" component={TelaTurmas}
                options={{ headerShown: false }} />

            <Stack.Screen name="Currículo" component={TelaCurricular}
                options={{ headerShown: false }} />

            <Stack.Screen name="Projeto" component={TelaProjeto}
                options={{ headerShown: false }} />

            <Stack.Screen name="Tabela" component={DropdownComponent}
                options={{ headerTitle: "Escolha uma Competência" }} />

            <Stack.Screen name="Avaliar" component={Avaliar} />

            <Stack.Screen name="CriarCompetencias" component={CriarCompetencias}
                options={{ headerTitle: "Criar competências e critérios" }} />

            <Stack.Screen name="VerificarNotas" component={VerificarNotas}
                options={{ headerTitle: "Verificar Notas" }} />

            <Stack.Screen name="criarTurmasEAlunos" component={criarNovaTurma}
                options={{ headerTitle: "Criar Turmas e Alunos" }} />

            <Stack.Screen name="TelaPDF" component={TelaPDF}
                options={{ headerTitle: "Tela de pdf" }} />

            <Stack.Screen name="TelaNota" component={TelaNota}
                options={{ headerTitle: "Avaliar" }} />

            <Stack.Screen name="VisualizarNotas" component={VisualizarNotas}
                options={{headerTitle: "Notas"}} />

</Stack.Navigator>
    )
}
