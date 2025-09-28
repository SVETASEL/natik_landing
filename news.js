// API Configuration
const API_BASE_URL = (typeof CONFIG !== 'undefined' && CONFIG.API_BASE_URL) ? CONFIG.API_BASE_URL : 'http://localhost:3001/api';

// API service for news operations
class NewsAPI {
  static async fetchArticles(params = {}) {
    try {
      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${API_BASE_URL}/articles?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }

  static async fetchArticleById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  }

  static async fetchRelatedArticles(id, limit = 3) {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}/related?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching related articles:', error);
      return [];
    }
  }

  static async fetchCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
}

// Legacy newsData for backward compatibility (will be removed)
const newsData = [
  {
    id: 1,
    title: "El Sello S y los desafíos reales del turismo sostenible en Chile",
    excerpt:
      "Hablar de turismo sostenible está de moda, pero ¿cómo saber realmente qué empresas lo practican? Chile tiene un sistema de certificación que busca responder esta pregunta, aunque no está exento de desafíos.",
    content: `
      <h1>El Sello S y los desafíos reales del turismo sostenible en Chile</h1>
    
    <p>Hablar de turismo sostenible está de moda, pero ¿cómo saber realmente qué empresas lo practican? Chile tiene un sistema de certificación que busca responder esta pregunta, aunque no está exento de desafíos.</p>
    
    <h2>El sistema de sellos de Sernatur</h2>
    
    <p>Sernatur maneja tres tipos de certificaciones para clasificar los servicios turísticos:</p>
    
    <ul>
        <li><strong>Sello R</strong> (Servicio Turístico Registrado): Para empresas que cumplen los requisitos básicos</li>
        <li><strong>Sello Q</strong> (Sello de Calidad Turística): Para servicios que destacan por su calidad</li>
        <li><strong>Sello S</strong> (Turismo Sustentable): El que nos interesa para el turismo sostenible</li>
    </ul>
    
    <p><strong>Cristóbal Benítez, director de Sernatur</strong>, destaca que el Sello S "cuenta con reconocimiento internacional del Consejo Global de Turismo Sostenible (GSTC) y es auditado por un organismo independiente". Esto le da credibilidad internacional.</p>
    
    <h3>¿Qué evalúa el Sello S?</h3>
    
    <p>La certificación mide el cumplimiento de criterios de sustentabilidad en tres ámbitos:</p>
    
    <ul>
        <li><strong>Económico</strong>: Que la actividad genere beneficios locales y sea viable</li>
        <li><strong>Sociocultural</strong>: Que respete y beneficie a las comunidades locales</li>
        <li><strong>Ambiental</strong>: Que minimice impactos negativos en la naturaleza</li>
    </ul>
    
    <h2>El problema del costo: cuando las buenas intenciones no alcanzan</h2>
    
    <p>Aquí viene uno de los principales obstáculos. Aunque postular al Sello S es gratuito, las empresas deben pagar una auditoría externa realizada por un organismo certificado. Este costo puede ser prohibitivo para empresas pequeñas.</p>
    
    <blockquote>
        <p><strong>Claudia Huepe, académica de la Universidad Andrés Bello</strong>, explica el dilema: "Hay muchas empresas que han adoptado acciones sustentables y generan impacto positivo, pero no pueden avalarlo porque no tienen medios económicos para pagar la certificación. Cuando las empresas son pequeñas y quieren hacer las cosas bien, la primera inversión es mejorar internamente - por ejemplo en gestión de residuos - antes de certificarse".</p>
    </blockquote>
    
    <h3>La solución parcial: Compromiso Turismo Sustentable</h3>
    
    <p>Para abordar este problema, Sernatur creó el "Compromiso Turismo Sustentable", un distintivo básico enfocado especialmente en micro y pequeñas empresas que atienden turistas nacionales. Es como una versión "light" del Sello S, más accesible pero igualmente válida.</p>
    
    <h2>Las mejoras en camino</h2>
    
    <p>Conscientes de estos desafíos, Sernatur está trabajando en mejoras al sistema. <strong>Cristóbal Benítez</strong> explica que están "en proceso de actualización de condiciones, a las que se sumará el desarrollo de políticas internas de sustentabilidad en empresas de turismo".</p>
    
    <p>Además, están implementando un nuevo Sistema de Competitividad Turística, diseñado junto al Banco Interamericano de Desarrollo (BID), que permitirá "un acompañamiento personalizado a las empresas para cubrir sus brechas competitivas".</p>
    
    <h2>Capacitación: más allá de los sellos</h2>
    
    <p>Sernatur no se limita a certificar. También ofrece cursos de capacitación en:</p>
    
    <ul>
        <li>Sustentabilidad Turística</li>
        <li>Cambio Climático y Gestión de Riesgos</li>
        <li>Accesibilidad</li>
        <li>Prevención contra la explotación sexual infantil en turismo</li>
        <li>Un nuevo curso de género (próximamente)</li>
    </ul>
    
    <p><strong>Cristóbal Benítez</strong> destaca que estos programas buscan "mejorar los conocimientos y competencias de los trabajadores del sector".</p>
    
    <h2>Los desafíos que quedan por resolver</h2>
    
    <h3>1. El problema de la coordinación</h3>
    
    <blockquote>
        <p><strong>Gustavo Salinas, de Aprotur</strong>, identifica un obstáculo clave: "Aunque la industria turística requiere trabajo articulado, en la práctica no siempre ocurre así. Es fundamental que todos los planes no se queden en el papel. El compromiso no es solo del gobierno, municipios o empresas, sino de cada actor involucrado en el turismo sostenible".</p>
    </blockquote>
    
    <p>Este es quizás el desafío más grande: lograr que todos remen para el mismo lado.</p>
    
    <h3>2. La falta de datos confiables</h3>
    
    <blockquote>
        <p><strong>Claudia Huepe</strong> insiste en algo fundamental: "Una meta pendiente es aprender a medir lo importante en cifras. Sernatur tiene que empezar a ser más como un laboratorio del turismo, con cifras reales del impacto que está dejando el turismo en Chile".</p>
    </blockquote>
    
    <p>Sin datos precisos es imposible:</p>
    
    <ul>
        <li>Saber si las medidas funcionan</li>
        <li>Identificar dónde hay problemas</li>
        <li>Tomar decisiones informadas</li>
        <li>Demostrar el valor del turismo sostenible</li>
    </ul>
    
    <h3>3. La brecha entre grandes y pequeñas empresas</h3>
    
    <p>Los sistemas de certificación, por bien intencionados que sean, suelen favorecer a empresas grandes que tienen recursos para pagar auditorías y consultorías. Las empresas pequeñas, que muchas veces son las más conectadas con las comunidades locales, quedan en desventaja.</p>
    
    <h2>¿Qué está haciendo el sector privado?</h2>
    
    <p>Las asociaciones gremiales también están tomando cartas en el asunto. <strong>Gustavo Salinas</strong> cuenta que desde Aprotur "apoyamos tanto a instituciones públicas como privadas en la profesionalización del turismo en Chile, a través de mesas de trabajo, capacitaciones, asesorías y trabajo en terreno, siempre impulsando el turismo sostenible e inclusivo".</p>
    
    <p>Desde la Asociación de Periodistas de Turismo (Aptur), "mostramos acciones positivas que se desarrollan en los territorios, pero también damos a conocer el desarrollo y la realidad de los destinos".</p>
    
    <h2>La realidad detrás de los sellos</h2>
    
    <p>Los sistemas de certificación son importantes, pero no son la panacea. El verdadero turismo sostenible requiere:</p>
    
    <ul>
        <li><strong>Compromiso real</strong>: No solo obtener un sello para marketing, sino implementar cambios genuinos.</li>
        <li><strong>Visión a largo plazo</strong>: Entender que la sostenibilidad es una inversión, no un gasto.</li>
        <li><strong>Colaboración</strong>: Trabajar juntos entre empresas, comunidades, gobierno y organizaciones.</li>
        <li><strong>Medición constante</strong>: Evaluar continuamente el impacto de las acciones.</li>
        <li><strong>Accesibilidad</strong>: Hacer que las buenas prácticas sean posibles para empresas de todos los tamaños.</li>
    </ul>
    
    <h2>El camino hacia adelante</h2>
    
    <p>Chile tiene las herramientas básicas para promover el turismo sostenible, pero necesita afinar su implementación. El desafío no es solo crear más sellos o certificaciones, sino asegurar que realmente impulsen cambios positivos y sean accesibles para todos los actores del sector.</p>
    
    <blockquote>
        <p>Como dice <strong>Gustavo Salinas</strong>: "Cada uno debe tomar, revisar y realizar acciones, aunque sean pequeñas". Al final, el turismo sostenible no se construye solo con certificaciones gubernamentales, sino con el compromiso diario de cada persona y empresa involucrada en la industria.</p>
    </blockquote>
    
    <hr>
    
    <p><em>Fuente: País Circular - Entrevistas con Cristóbal Benítez (Director de Sernatur), Claudia Huepe (Académica UNAB), y Gustavo Salinas (Aprotur/Aptur)</em></p>
    `,
    image: "assets/blog_sellos.png",
    category: "Certificación",
    date: "2025-09-21",
    featured: true,
  },
  {
    id: 2,
    title:
      "Chile se corona como destino verde mundial: ¿Qué hay detrás de este éxito?",
    excerpt:
      "Chile no para de ganar premios por su turismo verde. Hace poco, el país se llevó el reconocimiento como 'Principal Destino Verde de Sudamérica' en los World Travel Awards 2024, los famosos 'Oscar' del turismo. Pero esto no es casualidad: Chile ya había ganado como 'Destino Verde Líder del Mundo' en 2023, 2022, 2020 y 2019.",
    content: `
      <p>Chile no para de ganar premios por su turismo verde. Hace poco, el país se llevó el reconocimiento como "Principal Destino Verde de Sudamérica" en los World Travel Awards 2024, los famosos "Oscar" del turismo. Pero esto no es casualidad: Chile ya había ganado como "Destino Verde Líder del Mundo" en 2023, 2022, 2020 y 2019.</p>

<p>Estos premios no son solo una palmadita en la espalda. Reflejan un cambio real en cómo Chile está enfocando su industria turística, apostando por un modelo más responsable y sostenible.</p>

<h2>¿Qué significa realmente turismo sostenible?</h2>

<p>Antes de seguir, aclaremos algunos conceptos que suelen confundirse. <strong>Claudia Huepe, académica de Administración en Ecoturismo de la Universidad Andrés Bello</strong>, nos explica la diferencia entre turismo sostenible y sustentable:</p>

<blockquote>
    <p>"Algo sostenible se puede mantener en el tiempo. Si hablamos de turismo, buscamos que sea soportable ecológicamente, viable económicamente y que considere la integración social. Pero el turismo no puede ser solo sostenible, en el sentido de conservar todo como está. Lo que queremos es mejorarlo, y de ahí hablamos de turismo sustentable".</p>
</blockquote>

<p>En términos más simples, <strong>Gustavo Salinas, director de comunicaciones de la Asociación de Profesionales y Técnicos del Turismo en Chile (Aprotur)</strong>, lo resume así: ambos conceptos buscan "desarrollar la actividad turística bajo un equilibrio económico, ambiental y sociocultural, preservando el medio ambiente para futuras generaciones y protegiendo a las comunidades locales".</p>

<h2>La nueva hoja de ruta: Estrategia Nacional 2035</h2>

<p>En julio de 2024, Chile dio un paso importante con el lanzamiento de la <a href="https://www.subturismo.gob.cl/wp-content/uploads/2024/07/estrategia-nacional-de-turismo-sostenible-2035-2.pdf">Estrategia Nacional de Turismo Sostenible 2035</a>. Este no es un documento más perdido en los escritorios gubernamentales: se creó con la participación de más de dos mil personas del sector turístico.</p>

<p><strong>Cristóbal Benítez, director de Sernatur</strong>, explica que "el objetivo es consolidar el turismo como una actividad estratégica para el desarrollo sostenible de las regiones. La meta al 2035 es que Chile sea reconocido por su turismo sostenible, que contribuya al bienestar de las personas, la conservación del medio ambiente y el crecimiento económico".</p>

<h3>Los ocho pilares del plan</h3>

<p>La estrategia no se queda en buenas intenciones. Define ocho líneas de acción concretas:</p>

<ul>
    <li><strong>Cultura y conciencia turística</strong>: Educar tanto a operadores como a visitantes</li>
    <li><strong>Acción climática proactiva</strong>: Prepararse para los efectos del cambio climático</li>
    <li><strong>Compromiso empresarial</strong>: Que las empresas realmente adopten prácticas sostenibles</li>
    <li><strong>Turismo y biodiversidad</strong>: Proteger áreas naturales mientras se disfrutan</li>
    <li><strong>Bienestar de comunidades locales</strong>: Que el turismo beneficie a quienes viven en los destinos</li>
    <li><strong>Seguridad y resiliencia</strong>: Prepararse para emergencias y crisis</li>
    <li><strong>Turismo inclusivo</strong>: Que todos puedan disfrutar de viajar</li>
    <li><strong>Destinos sostenibles</strong>: Planificar el desarrollo turístico de manera responsable</li>
</ul>

<h2>El cambio climático: el desafío más urgente</h2>

<p>No podemos hablar de turismo sostenible sin mencionar el cambio climático, que afecta directamente a los destinos turísticos. Chile no se quedó atrás y en noviembre de 2024 aprobó el <strong>Plan Sectorial de Adaptación al Cambio Climático del Turismo</strong>.</p>

<blockquote>
    <p><strong>Cristóbal Benítez</strong> explica que "Chile asumió el compromiso de adoptar medidas proactivas que fortalezcan la resiliencia del sector turístico para adaptarse a las nuevas condiciones climáticas y garantizar su rol como motor del desarrollo económico".</p>
</blockquote>

<p>El plan tiene cuatro objetivos principales:</p>

<ol>
    <li><strong>Fortalecer instituciones</strong>: Integrar mejor la gestión local y el ordenamiento territorial</li>
    <li><strong>Promover experiencias resilientes</strong>: Implementar prácticas que reduzcan impactos ambientales</li>
    <li><strong>Mejorar respuesta a emergencias</strong>: Tener información y canales de comunicación claros ante desastres</li>
    <li><strong>Conservar destinos</strong>: Restaurar biodiversidad y cuidar el patrimonio natural y urbano</li>
</ol>

<h2>¿Qué viene después?</h2>

<p>Los reconocimientos internacionales y las estrategias en papel son un buen comienzo, pero el verdadero desafío está en la implementación. Chile tiene las bases para convertirse en un referente mundial de turismo sostenible, pero necesita que todos los actores del sector - desde grandes operadores hasta pequeñas posadas familiares - se sumen al cambio.</p>

<p>La pregunta ahora es si Chile podrá mantener este liderazgo y traducirlo en beneficios concretos para sus comunidades locales y el medio ambiente. Los próximos años serán clave para responder esta interrogante.</p>

<hr>

<p><em>Fuente: País Circular - Entrevistas con Cristóbal Benítez (Director de Sernatur), Claudia Huepe (Académica UNAB), y Gustavo Salinas (Aprotur/Aptur)</em></p>
    `,
    image: "assets/blog_img5.jpg",
    category: "Noticias",
    date: "2025-09-16",
    featured: false,
  },
  {
    id: 3,
    title:
      "El nuevo turista chileno: más consciente, más conectado con la naturaleza",
    excerpt:
      "Los viajeros están cambiando, y Chile lo está notando. Ya no basta con ofrecer solo sol y playa o paisajes bonitos. Los turistas de hoy buscan algo más: experiencias auténticas, responsables y que realmente los conecten con el lugar que visitan.",
    content: `
     
    
    <p>Los viajeros están cambiando, y Chile lo está notando. Ya no basta con ofrecer solo sol y playa o paisajes bonitos. Los turistas de hoy buscan algo más: experiencias auténticas, responsables y que realmente los conecten con el lugar que visitan.</p>
    
    <h2>Un cambio de mentalidad evidente</h2>
    
    <blockquote>
        <p><strong>Gustavo Salinas, director de comunicaciones de Aprotur</strong>, ve este cambio todos los días: "Tanto a nivel nacional como internacional, hay un cambio en cómo el visitante se conecta con los territorios. Ha aumentado considerablemente la cantidad de personas que va a la cordillera o parques a hacer trekking. Hay un interés importante por conectarse con actividades en la naturaleza".</p>
    </blockquote>
    
    <p>Este no es solo un cambio de actividades, sino de mentalidad. El turista de hoy es más tecnológico y se involucra activamente en planificar su viaje. "Ya no compra solo un paquete turístico. Quiere reconocer los territorios con su color real, busca lugares donde pueda interactuar con la localidad, comprar artesanías, probar la gastronomía local, alojar en residencias familiares", explica Salinas.</p>
    
    <h2>¿Cuesta más ser un turista responsable?</h2>
    
    <p>Una pregunta que muchos se hacen es si este turismo más consciente significa gastar más dinero. Las opiniones están divididas entre los expertos.</p>
    
    <p><strong>Gustavo Salinas</strong> cree que no necesariamente: el turismo sostenible no implica automáticamente un mayor gasto para el viajero. Sin embargo, <strong>Claudia Huepe, académica de la Universidad Andrés Bello</strong>, tiene una perspectiva diferente:</p>
    
    <blockquote>
        <p>"Es una lástima, pero si una empresa quiere trabajar con productos ecológicos o biodegradables, todavía tiene un costo más alto. Para mí es casi imposible que no cueste un poquito más. Pero las personas que buscan experiencias de turismo sostenible lo entienden, lo valoran y no les molesta pagar un poco más".</p>
    </blockquote>
    
    <p>La clave parece estar en el valor percibido. Los viajeros conscientes entienden que pagar un poco más puede significar:</p>
    
    <ul>
        <li>Mejor trato a los trabajadores locales</li>
        <li>Menos impacto ambiental</li>
        <li>Mayor beneficio para las comunidades del destino</li>
        <li>Experiencias más auténticas y menos masificadas</li>
    </ul>
    
    <h2>Datos que sorprenden: el caso del cicloturismo</h2>
    
    <p><strong>Claudia Huepe</strong> no solo enseña sobre ecoturismo, también lo vive. Se dedica al cicloturismo en la Patagonia y sus descubrimientos son reveladores:</p>
    
    <blockquote>
        <p>"El año pasado hicimos un estudio sobre el impacto del cicloturismo en la Carretera Austral, que nunca había sido medido. Descubrimos que casi dos mil personas al año viajan en bicicleta por esa ruta. Además, el cicloturista en la Patagonia es el viajero que pasa más días en el destino. A pequeña escala, es quien más impacta positivamente la economía local".</p>
    </blockquote>
    
    <p>Este estudio es importante por varias razones:</p>
    
    <ul>
        <li>Demuestra que hay nichos de turismo sostenible muy valiosos</li>
        <li>Los cicloturistas, aunque sean menos en número, generan más impacto económico local</li>
        <li>Permanecen más tiempo, lo que distribuye mejor los beneficios</li>
    </ul>
    
    <h2>La importancia de medir lo que hacemos</h2>
    
    <blockquote>
        <p>El estudio del cicloturismo destaca algo crucial que menciona <strong>Claudia Huepe</strong>: "Si no tenemos información base, no podemos mejorar nada. Hablamos mucho de turismo sostenible, pero no sabemos realmente qué hay que mejorar, ni el impacto que están teniendo nuestras acciones".</p>
    </blockquote>
    
    <p>Esta reflexión es clave. Chile necesita:</p>
    
    <ul>
        <li>Más estudios sobre diferentes tipos de turismo</li>
        <li>Medición constante del impacto económico, social y ambiental</li>
        <li>Datos que permitan tomar decisiones informadas</li>
    </ul>
    
    <p>Como sugiere Huepe: "Sernatur tiene que empezar a ser más como un laboratorio o barómetro del turismo, con cifras reales del impacto que está dejando el turismo en Chile".</p>
    
    <h2>El perfil del nuevo viajero chileno</h2>
    
    <p>Basándose en las tendencias observadas, el nuevo turista que llega a Chile (y el chileno que viaja por su país) tiene estas características:</p>
    
    <p><strong>Más informado</strong>: Investiga antes de viajar y no se conforma con información superficial.</p>
    
    <p><strong>Más tecnológico</strong>: Usa apps, redes sociales y plataformas digitales para planificar y compartir su experiencia.</p>
    
    <p><strong>Busca autenticidad</strong>: Prefiere experiencias locales genuinas antes que atracciones turísticas masivas.</p>
    
    <p><strong>Consciente del impacto</strong>: Considera las consecuencias ambientales y sociales de sus decisiones de viaje.</p>
    
    <p><strong>Permanece más tiempo</strong>: Prefiere conocer menos lugares pero de manera más profunda.</p>
    
    <p><strong>Valora la naturaleza</strong>: Busca activamente conectarse con espacios naturales y actividades al aire libre.</p>
    
    <h2>¿Qué significa esto para Chile?</h2>
    
    <p>Este cambio en el perfil del turista es una oportunidad enorme para Chile. El país tiene exactamente lo que estos nuevos viajeros buscan: naturaleza espectacular, comunidades auténticas, y una creciente conciencia sobre la sostenibilidad.</p>
    
    <p>Pero también es un desafío. Chile debe asegurarse de que su oferta turística evolucione al ritmo de estas nuevas demandas, sin perder la autenticidad que justamente buscan estos viajeros conscientes.</p>
    
    <hr>
    
    <p><em>Fuente: País Circular - Entrevistas con Claudia Huepe (Académica UNAB) y Gustavo Salinas (Aprotur/Aptur)</em></p>
    `,
    image: "assets/blog_img3.jpg",
    category: "Tendencias",
    date: "2025-09-09",
    featured: false,
  },
  {
    id: 4,
    title: "2025: El año en que Latinoamérica se vuelve el destino favorito",
    excerpt:
      "Latinoamérica está viviendo su mejor momento turístico. Desde las selvas amazónicas hasta las playas del Caribe, pasando por ciudades llenas de historia, la región se está convirtiendo en el destino que todos quieren visitar.",
    content: `
      <p>Latinoamérica está viviendo su mejor momento turístico. Desde las selvas amazónicas hasta las playas del Caribe, pasando por ciudades llenas de historia, la región se está convirtiendo en el destino que todos quieren visitar. Y 2025 podría ser el año que lo confirme definitivamente.</p>
    
    <h2>Los viajeros ahora quieren algo diferente</h2>
    
    <p>La gente ya no solo quiere tomarse fotos bonitas. Ahora buscan experiencias que realmente importen: hoteles que no dañen el medio ambiente, tours que ayuden a las comunidades locales, y actividades que protejan la naturaleza.</p>
    
    <p>Países como <strong>Costa Rica, Colombia y Ecuador</strong> ya eran famosos por su turismo verde, pero ahora están ofreciendo experiencias aún más increíbles: ver ballenas, caminar por reservas naturales y conocer proyectos de conservación.</p>
    
    <p>Mientras tanto, destinos menos conocidos como <strong>Guatemala y Bolivia</strong> están sorprendiendo a los viajeros que buscan algo completamente diferente.</p>
    
    <h2>La tecnología cambia todo</h2>
    
    <p>Ahora es mucho más fácil planear un viaje gracias a la tecnología. Imagínate poder "visitar" un lugar virtualmente antes de ir, o tener una app que te arme el itinerario perfecto según tus gustos.</p>
    
    <p>En Latinoamérica esto significa:</p>
    
    <ul>
        <li>Museos que puedes visitar desde tu casa</li>
        <li>Tours virtuales por ruinas mayas con guías digitales</li>
        <li>Apps locales para encontrar hoteles únicos</li>
        <li>Realidad aumentada para aprender sobre la historia de los lugares</li>
    </ul>
    
    <h2>Todos quieren descansar de verdad</h2>
    
    <p>Después de años complicados, la gente busca viajes que realmente los relajen y los hagan sentir mejor. No solo quieren vacaciones, sino encontrar paz y equilibrio.</p>
    
    <p>Latinoamérica es perfecta para esto:</p>
    
    <ul>
        <li>Retiros de yoga en los Andes</li>
        <li>Meditación en la selva amazónica</li>
        <li>Spas naturales en aguas termales</li>
        <li>Hoteles boutique perdidos en la naturaleza</li>
        <li>Playas escondidas donde nadie te molesta</li>
    </ul>
    
    <p>La idea es simple: reconectarse con lo básico. Ver un amanecer en las montañas, disfrutar un atardecer en el mar, o simplemente conversar con alguien local.</p>
    
    <h2>Las comunidades locales toman protagonismo</h2>
    
    <p>Una de las mejores noticias es que las comunidades locales están participando más en el turismo. Ya no son solo espectadores, sino protagonistas:</p>
    
    <ul>
        <li>Crean sus propios hoteles rurales</li>
        <li>Organizan festivales culturales</li>
        <li>Ofrecen comida típica auténtica</li>
        <li>Venden artesanías tradicionales</li>
        <li>Comparten sus tradiciones con los visitantes</li>
    </ul>
    
    <h2>Nuevos destinos están apareciendo</h2>
    
    <p>Mientras <strong>México, Brasil y Perú</strong> siguen siendo súper populares, están surgiendo nuevas rutas increíbles:</p>
    
    <ul>
        <li><strong>Caribe colombiano</strong>: Playas espectaculares sin tantas multitudes</li>
        <li><strong>Patagonia argentina</strong>: Paisajes únicos para los más aventureros</li>
        <li><strong>Selvas de Belice</strong>: Aventuras en la naturaleza más pura</li>
    </ul>
    
    <h2>¿Por qué 2025 es tan especial?</h2>
    
    <p>Este año se están juntando varias cosas importantes:</p>
    
    <ol>
        <li><strong>Los viajeros son más conscientes</strong>: Quieren que su viaje tenga un impacto positivo</li>
        <li><strong>La tecnología está madura</strong>: Las herramientas digitales realmente funcionan bien</li>
        <li><strong>Hay más opciones</strong>: Desde hoteles de lujo hasta aventuras económicas</li>
        <li><strong>Las comunidades están preparadas</strong>: Saben cómo recibir turistas de manera sostenible</li>
    </ol>
    
    <h2>El futuro se ve prometedor</h2>
    
    <p>Latinoamérica no solo quiere recibir más turistas, sino hacerlo bien: cuidando la naturaleza, fortaleciendo las comunidades locales, y asegurándose de que los visitantes se lleven experiencias que realmente los transformen.</p>
    
    <p>La región tiene todo para ser el destino favorito del mundo: naturaleza increíble, culturas fascinantes, gente acogedora, y ahora, una mentalidad más responsable y sostenible.</p>
    
    <p>¿Ya sabes qué lugar de Latinoamérica quieres conocer este año?</p>
    
    <hr>
    `,
    image: "assets/blog_img4.jpg",
    category: "Destinos",
    date: "2025-09-02",
    featured: false,
  },
  {
    id: 5,
    title:
      "'Chile no puede promover turismo de naturaleza sin sustentabilidad' - así dice la Subsecretaria de Turismo",
    excerpt:
      "Chile ha recibido cerca de 30 premios de turismo, entre ellos el reconocimiento en 2023 como <strong>Mejor Destino Verde del Mundo</strong> por los World Travel Awards. Este logro, según la Subsecretaria de Turismo Verónica Pardo, no solo es motivo de orgullo, sino que también conlleva compromisos importantes. La autoridad sostuvo que el principal atractivo del país es su naturaleza, y que no es posible promover turismo de naturaleza si no es sustentable. Por ello, llamó a los operadores a asumir dicho compromiso",
    content: `
  <p>Chile ha recibido cerca de 30 premios de turismo, entre ellos el reconocimiento en 2023 como <strong>Mejor Destino Verde del Mundo</strong> por los World Travel Awards. Este logro, según la Subsecretaria de Turismo Verónica Pardo, no solo es motivo de orgullo, sino que también conlleva compromisos importantes. La autoridad sostuvo que el principal atractivo del país es su naturaleza, y que no es posible promover turismo de naturaleza si no es sustentable. Por ello, llamó a los operadores a asumir dicho compromiso.</p>

  <p>Pardo explicó que la <strong>Estrategia Nacional de Turismo Sustentable</strong>, diseñada para los próximos diez años, estará acompañada por un <strong>Plan de Turismo Sustentable</strong> que define acciones concretas. Esta estrategia, que será lanzada a fines de marzo, se elaboró con la participación de más de 2.200 personas de todas las regiones, incluyendo gremios, representantes del gobierno y actores individuales.</p>

  <p>La subsecretaria destacó que la sustentabilidad debe ser adoptada tanto por el Estado, como por empresarios, residentes y visitantes. “Chile es un país cuyo desarrollo turístico está basado en sus recursos naturales y culturales, por lo tanto, la sustentabilidad es prioritaria”, señaló.</p>

  <h2>Destinos sostenibles prioritarios</h2>
  <p>La autoridad indicó que se eligieron tres destinos para implementar lineamientos de turismo sostenible: <strong>Rapa Nui, San Pedro de Atacama y Torres del Paine</strong>. En estos lugares se busca establecer criterios de gestión de residuos, control de accesos y prácticas que limiten la masificación desordenada.</p>

  <h2>Alianzas con gremios y certificaciones</h2>
  <p>Actualmente, los operadores turísticos están trabajando para acceder al <em>Sello S</em> (de sustentabilidad). Asimismo, se han establecido acuerdos de producción limpia con distintos gremios: con ACHIGA en el uso responsable de agua, con hoteleros en la gestión de residuos, y conversaciones en curso con el Aeropuerto de Santiago. Según informó Pardo, Sernatur mantiene un registro de operadores turísticos certificados y se espera que este año se sumen muchos más.</p>

  <h2>Turismo, economía y comunidad</h2>
  <p>Durante una visita a Angelmó, la subsecretaria subrayó que el turismo genera desarrollo económico y territorial con equidad. Insistió en que el ideal es que los guías, la gastronomía y la oferta cultural provengan de la comunidad local, fortaleciendo así la identidad y participación de los territorios.</p>

  <h2>Turismo y cambio climático</h2>
  <p>La estrategia también considera los riesgos del cambio climático en los destinos turísticos. Pardo recordó que la ONU ha llamado a fomentar un turismo sostenible y resiliente ante emergencias. Como ejemplo, mencionó los recientes incendios en la región de Valparaíso, que si bien no dañaron atractivos turísticos directamente, afectaron gravemente las reservas y la economía local.</p>

  <p>Actualmente, el turismo representa un <strong>3,5% del PIB nacional</strong>. Solo la Región de Valparaíso concentra el 10,7% de esa cifra, y en febrero aporta un 3% del total. Alrededor del 17% de los turistas internacionales que llegan a Chile visitan esta región, lo que refuerza la importancia de cuidar su imagen y sostenibilidad.</p>
    `,
    image: "assets/blog_img6.png",
    category: "Opiniones",
    date: "2025-08-15",
    featured: false,
  },
  {
    id: 6,
    title:
      "Natik es seleccionado por Start-Up Chile cómo una de las startups de la generación BIG10",
    excerpt:
      "Revisa aquí el listado completo de los 62 proyectos que entrarán a nuestros programas Build, Ignite y Growth.",
    content: `
   <h1>Build</h1>

  <section>
    <h2>50x</h2>
    <h3>HQ: Chile</h3>
    <p>50x ayuda a los propietarios de almacenamiento de baterías y activos flexibles a maximizar los retornos financieros (NPV) y descarbonizar la red, al proporcionar pronósticos de optimización en tiempo real en las operaciones a través de los mercados de energía.</p>
  </section>

  <section>
    <h2>Carriapp</h2>
    <h3>HQ: Chile</h3>
    <p>Carri es un optimizador de compras que, usando información de distintas tiendas, calcula la mejor combinación para tu lista del supermercado, considerando precios, promociones, despachos y membresías para que ahorres sin complicarte.</p>
  </section>

  <section>
    <h2>cobraAI</h2>
    <h3>HQ: Chile</h3>
    <p>Legaltech que combina abogados con IA avanzada para ofrecer una recuperación de deudas eficiente. Su plataforma de IA automatiza el flujo de trabajo de principio a fin, desde la clasificación de casos hasta las presentaciones judiciales, mientras que sus abogados proporcionan un juicio estratégico y garantía de calidad.</p>
  </section>

  <section>
    <h2>Cumpl.io</h2>
    <h3>HQ: Chile</h3>
    <p>Cumpl.io busca mejorar y asistir a emprendedores y compañías en la construcción de relaciones con nuevos contratistas y proveedores, otorgando acceso a due diligence potenciada con Agentes de IA y fuentes de datos extensas.</p>
  </section>

  <section>
    <h2>Flick AI</h2>
    <h3>HQ: Estados Unidos</h3>
    <p>Flick AI es un asistente inteligente que guía a los usuarios y ejecuta acciones en plataformas SaaS, para convertirlos en usuarios expertos desde el día uno.</p>
  </section>

  <section>
    <h2>Glorisk</h2>
    <h3>HQ: Chile</h3>
    <p>Glorisk es una plataforma que capacita y certifica colaboradores en ciberseguridad, riesgo operacional y continuidad del negocio, usando misiones, niveles y gamificación para reducir errores humanos y prevenir pérdidas en empresas.</p>
  </section>

  <section>
    <h2>Kellu</h2>
    <h3>HQ: Chile</h3>
    <p>Plataforma potenciada con agentes de IA que optimizan la operación de empresas de servicios. Automatiza gestión, interacción y potencia ventas recurrentes. Simple e inteligente para escalar negocios con procesos fluidos y centralizados.</p>
  </section>

  <section>
    <h2>Natik</h2>
    <h3>HQ: Chile</h3>
    <p>Natik es un marketplace para reservas de eco-friendly alojamientos y experiencias locales en Chile y Latinoamérica. A través de su plataforma, Natik conecta turistas con estancias únicas –como domos y cabañas rurales– apoyando a comunidades locales y la conservación de la naturaleza.</p>
  </section>

  <section>
    <h2>Nouu</h2>
    <h3>HQ: Chile</h3>
    <p>App donde las personas publican tareas y otros postulan para realizarlas. Ofrecen geolocalización en tiempo real, pagos inmediatos tras cada tarea, usuarios verificados y a MarIA, nuestra asistente IA enfocada en adultos mayores.</p>
  </section>

  <section>
    <h2>Plak</h2>
    <h3>HQ: Perú</h3>
    <p>Plak es una plataforma DXP que facilita el acceso a la nube para empresas en Latinoamérica, usando tecnología ARM para mayor rapidez y eficiencia.</p>
  </section>

  <section>
    <h2>Propicheck</h2>
    <h3>HQ: Chile</h3>
    <p>Propicheck automatiza el diagnóstico legal de propiedades, entregando informes claros y confiables en minutos. Usa inteligencia artificial y proyecta integrar blockchain para transformar la compraventa inmobiliaria en una experiencia 100% digital.</p>
  </section>

  <section>
    <h2>Reneé</h2>
    <h3>HQ: Chile</h3>
    <p>Reneé es un reclutador IA on demand: automatiza más de 20 etapas del proceso de selección, desde la publicación hasta la entrega de finalistas validados, reduciendo tiempos y costos hasta en 70 % y permitiendo contratar sin equipos de RRHH.</p>
  </section>

  <section>
    <h2>Ruklo</h2>
    <h3>HQ: Chile</h3>
    <p>Ruklo es una plataforma que digitaliza y centraliza la fidelización mediante tarjetas digitales, personalización en tiempo real, colaboraciones entre comercios, notificaciones push y análisis de datos para retener clientes y optimizar estrategias.</p>
  </section>

  <section>
    <h2>Rupestre</h2>
    <h3>HQ: Chile</h3>
    <p>Rupestre ayuda a industrias a cuantificar y reducir su huella de carbono a través de simulaciones inteligentes, permitiendo una descarbonización basada en datos sin comprometer la productividad.</p>
  </section>

  <section>
    <h2>Sheltr</h2>
    <h3>HQ: Argentina</h3>
    <p>Sheltr es una plataforma impulsada por IA para la construcción de viviendas de forma personalizada y a bajo costo. La plataforma combina herramientas de diseño inteligente con construcción industrializada para ayudar a familias y desarrolladores a construir más rápido y mejores.</p>
  </section>

  <section>
    <h2>Streamdata</h2>
    <h3>HQ: Chile</h3>
    <p>Streamdata es la plataforma que transforma cómo las empresas acceden a sus bases de datos. Con un chat inteligente, genera analítica a través de consultas, visualizaciones, predicciones y reportes.</p>
  </section>

  <section>
    <h2>Yotta-i</h2>
    <h3>HQ: Estados Unidos</h3>
    <p>Yotta se encarga de las estafas para que las empresas puedan acelerar el cierre de nuevos negocios. Su tecnología patentada alerta a los usuarios con un software de cumplimiento de ciberseguridad orientado al usuario que reduce las responsabilidades y cubre financieramente a las empresas.</p>
  </section>

  <section>
    <h2>Zaku</h2>
    <h3>HQ: Chile</h3>
    <p>Zaku es una plataforma digital que, mediante tecnología, garantiza transparencia en la gestión de recursos de las ONGs, un factor clave para diversificar sus fuentes de financiamiento y alcanzar sostenibilidad a largo plazo.</p>
  </section>

  <h1>Ignite</h1>

  <section>
    <h2>Acquora</h2>
    <h3>HQ: Chile</h3>
    <p>Acquora transforma las operaciones industriales críticas mediante inteligencia espacial predictiva basada en datos satelitales, IA y ML. Permite prevenir desastres, optimizar la gestión de recursos naturales y aumentar la eficiencia en industrias estratégicas.</p>
  </section>

  <hr> <br>

  <p>Listado completo: 
      <a href="https://startupchile.org/blog/estas-son-las-startups-seleccionadas-para-big-10/" target="_blank" rel="noopener noreferrer">
        Startup Chile - Startups seleccionadas para BIG 10
      </a>
    </p>
    `,
    image: "assets/blog_img7.png",
    category: "Noticias",
    date: "2025-07-18",
    featured: false,
  },
];

// DOM elements
let newsGrid;
let newsLoading;
let newsEmpty;

// Initialize news page
document.addEventListener("DOMContentLoaded", function () {
  // Only run on news page
  if (!document.getElementById("newsGrid")) return;

  newsGrid = document.getElementById("newsGrid");
  newsLoading = document.getElementById("newsLoading");
  newsEmpty = document.getElementById("newsEmpty");

  loadNews();
});

// Pagination state
let currentPage = 0;
const articlesPerPage = 6;
let allArticles = [];
let displayedArticles = [];

// Load and display news
async function loadNews() {
  // Show loading state
  if (newsLoading) newsLoading.style.display = "block";
  if (newsEmpty) newsEmpty.style.display = "none";

  try {
    // Fetch all articles from API
    allArticles = await NewsAPI.fetchArticles({ limit: 50 }); // Fetch more articles for pagination

    // Hide loading state
    if (newsLoading) newsLoading.style.display = "none";

    if (allArticles.length === 0) {
      if (newsEmpty) newsEmpty.style.display = "block";
      return;
    }

    // Display first 6 articles
    displayedArticles = allArticles.slice(0, articlesPerPage);
    currentPage = 1;
    
    renderNewsCards();
    setupLoadMoreButton();

  } catch (error) {
    console.error('Error loading news:', error);
    if (newsLoading) newsLoading.style.display = "none";
    if (newsEmpty) newsEmpty.style.display = "block";
  }
}

// Render news cards
function renderNewsCards() {
  if (!newsGrid) return;

  const newsHTML = displayedArticles
    .map((article) => createNewsCard(article))
    .join("");

  newsGrid.innerHTML = newsHTML;
}

// Setup load more button
function setupLoadMoreButton() {
  let loadMoreBtn = document.getElementById('loadMoreBtn');
  
  if (!loadMoreBtn) {
    // Create load more button if it doesn't exist
    loadMoreBtn = document.createElement('button');
    loadMoreBtn.id = 'loadMoreBtn';
    loadMoreBtn.className = 'load-more-btn';
    loadMoreBtn.textContent = 'Más noticias';
    loadMoreBtn.addEventListener('click', loadMoreArticles);
    
    // Apply inline styles as fallback
    Object.assign(loadMoreBtn.style, {
      display: 'block',
      margin: '40px auto 0',
      padding: '15px 30px',
      backgroundColor: '#2c5530',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      textAlign: 'center',
      minWidth: '200px',
      transition: 'all 0.3s ease'
    });
    
    // Insert after news grid in the news container
    const newsContainer = document.querySelector('.news-container');
    if (newsContainer) {
      newsContainer.appendChild(loadMoreBtn);
    }
  }
  
  // Show/hide button based on whether there are more articles
  const hasMoreArticles = displayedArticles.length < allArticles.length;
  loadMoreBtn.style.display = hasMoreArticles ? 'block' : 'none';
}

// Load more articles
function loadMoreArticles() {
  const startIndex = currentPage * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const newArticles = allArticles.slice(startIndex, endIndex);
  
  displayedArticles = [...displayedArticles, ...newArticles];
  currentPage++;
  
  renderNewsCards();
  setupLoadMoreButton();
}

// Create individual news card
function createNewsCard(article) {
  // Handle both API and legacy data formats
  const date = article.publishedAt || article.date;
  const image = article.imageUrl || article.image;
  const category = article.category?.name || article.category;
  
  const formattedDate = formatDate(date);

  return `
    <article class="news-card" onclick="openNewsDetail(${article.id})">
      <div class="news-card-image">
        <img src="${image}" alt="${article.title}" class="news-card-img" />
      </div>
      <div class="news-card-content">
        <div class="news-card-meta">
          <span class="news-card-date">${formattedDate}</span>
          <span class="news-card-category">${category}</span>
        </div>
        <h2 class="news-card-title">${article.title}</h2>
        <p class="news-card-excerpt">${article.excerpt}</p>
      </div>
    </article>
  `;
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("es-ES", options);
}

// Open news detail page
function openNewsDetail(articleId) {
  // Store the article ID in localStorage for the detail page
  localStorage.setItem("currentNewsId", articleId);

  // Navigate to detail page
  window.location.href = `news-detail.html?id=${articleId}`;
}

// Get news article by ID
async function getNewsById(id) {
  try {
    return await NewsAPI.fetchArticleById(id);
  } catch (error) {
    console.error('Error getting article by ID:', error);
    // Fallback to legacy data
    return newsData.find((article) => article.id === parseInt(id));
  }
}

// Get related news (exclude current article, limit to 3)
async function getRelatedNews(currentId, limit = 3) {
  try {
    return await NewsAPI.fetchRelatedArticles(currentId, limit);
  } catch (error) {
    console.error('Error getting related articles:', error);
    // Fallback to legacy data
    return newsData
      .filter((article) => article.id !== parseInt(currentId))
      .slice(0, limit);
  }
}

// Export functions for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    newsData,
    getNewsById,
    getRelatedNews,
    formatDate,
  };
}
