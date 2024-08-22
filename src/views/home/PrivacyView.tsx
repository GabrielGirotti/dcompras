export default function PrivacyView() {
  return (
    <article className="flex flex-col py-5 max-w-[800px] items-center mt-5">
      <p className="font-poppins text-lg text-white text-left px-8">
        Al utilizar nuestros servicios, nos confías tus datos. Entendemos que es
        una gran responsabilidad y nos esforzamos al máximo para proteger tu
        información y permitirte controlarla.
      </p>
      <div className="bg-yellow mt-5 py-8 w-screen flex flex-col items-center">
        <h2 className="font-poppins font-semibold text-lg text-black text-left max-w-[800px] px-8">
          Queremos informarte del tipo de datos que recogemos cuando utilizas
          nuestros servicios
        </h2>
        <p className="font-poppins text-lg text-black text-left max-w-[800px] mt-5 px-8">
          Recogemos información para proporcionar los mejores servicios a todos
          nuestros usuarios: desde determinar información básica, como el idioma
          que hablas, hasta datos más complejos, como los anuncios que te
          resultarán más útiles, las personas que más te interesan online o los
          vídeos de YouTube que te pueden gustar. El tipo de información que
          recoge FitFusion y cómo se utiliza esa información depende del uso que
          hagas de nuestros servicios y de cómo administres los controles de
          privacidad. Si no has iniciado sesión en una cuenta de FitFusion,
          almacenamos la información que recogemos con identificadores únicos
          vinculados al navegador, la aplicación o el dispositivo que utilices.
          Esto nos permite, por ejemplo, mantener tus preferencias en todas las
          sesiones de navegación, como tu idioma preferido o si quieres que te
          mostremos resultados de búsqueda o anuncios más relevantes basados en
          tu actividad. Si has iniciado sesión, también recogemos información
          que almacenamos en tu cuenta de FitFusion y que tratamos como
          información personal.
        </p>
      </div>
    </article>
  );
}
