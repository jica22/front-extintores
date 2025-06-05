import IntegranteCard from "./components/IntegranteCard";
import simonassi from "./assets/simonassi.jpg";
import dl from "./assets/dl.jpg";
import santastico from "./assets/santastico.jpg";
import ph from "./assets/ph.jpg";
import joaoroberto from "./assets/joaoroberto.jpg";
import dlsol from "./assets/dlsol.jpg";
import grupo from "./assets/grupo.png";
export default function Group() {

  return (
    <div className="flex flex-col items-center justify-center bg-white p-20">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Trabalho de Back-End</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl text-center">
        Este projeto foi desenvolvido por alunos do curso de Engenharia de Software da Universidade do Extremo Sul Catarinense (UNESC) como parte da disciplina de Desenvolvimento de Back-End. O projeto foi orientado pelo professor Allan Stieg.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-8">
        <IntegranteCard
          nome="Arthur Ferreira"
          funcao="Notion e Documentação"
          fotoUrl={santastico}
        />
        <IntegranteCard
          nome="Davi Lugon"
          funcao="Apresentação e Notion"
          fotoUrl={dl}
          imagemAlternativa={dlsol}
        />
        <IntegranteCard
          nome="João Pedro Simonassi"
          funcao="Desenvolvedor Full Stack"
          fotoUrl={simonassi}
        />
          <IntegranteCard
            nome="João Roberto"
            funcao="Apresentação e Fotógrafo"
            fotoUrl={joaoroberto}
            funcaoAlternativa="Conseguidor de provas do ..."
          />
        <IntegranteCard
          nome="Rafael Pedro"
          funcao="Fotógrafo e Documentação"
          fotoUrl={ph}
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Foto do Grupo</h1>
        <img
            src={grupo}
            alt={`Foto do grupo`}
            className={"shadow-xl shadow-blue-200 rounded-md"}
          />
      </div>
    </div >
  );
}
