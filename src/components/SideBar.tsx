import React from "react";
//e importante importar tambem outros componentes que estavam sendo usados em app.tsx, pois a referencia nao vem so copiando o codigo. E lembrar de deletar a referencia de app.tsx caso aquele componente nao esteja mais sendo utilizado la (como e o nosso caso. Button esta sendo utilizado junto com Sidebar, entao precisamos chama-lo aqui e, como nao estamos utilizando mais nenhum botam em app.tsx, podemos apagar a referencia la.)
import { Button } from "./Button";

//aqui no componente eu recebo os elementos que eu vou usar (e que estao no app.tsx) colocando-os dentro de {} (codigo jsx).
//eu escolhi usar o mesmo nome que eles tinham antes pra nao ter que fazer muitas alteracoes, mas e possivel colocar qualquer nome no primeiro argumento que indica o nome do que estamos passando e = {o nome desse elemento em app.tsx} pra que aponte para o elemento certo que queremos.
//entao, por exemplo, se eu chamo generos={genres}, aqui no componente filho, ao inves de genres eu chamaria generos
const SideBar = ({ genres, handleClickButton, selectedGenreId }) => {
  return (

    //o resto e so copiar e colar a parte exata que vai ficar dentro do componente
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
};

//exportar e importar em app.tsx pra que ele possa ser usado como um componente <Sidebar />
export default SideBar;
