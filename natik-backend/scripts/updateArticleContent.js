const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateArticleContent() {
  try {
    console.log('🔄 Updating article content...');

    // Update article 1
    await prisma.article.update({
      where: { id: 1 },
      data: {
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
    
    <p>Esta barrera económica crea una paradoja: las empresas que más necesitan demostrar su compromiso sostenible (las pequeñas) son las que menos pueden permitirse el costo de la certificación.</p>
    
    <h2>¿Qué pueden hacer los viajeros?</h2>
    
    <p>Mientras el sistema se perfecciona, los viajeros conscientes pueden:</p>
    
    <ol>
        <li><strong>Investigar más allá del sello</strong>: Preguntar directamente sobre prácticas sostenibles</li>
        <li><strong>Buscar transparencia</strong>: Las empresas genuinamente sostenibles suelen ser abiertas sobre sus procesos</li>
        <li><strong>Apoyar iniciativas locales</strong>: Muchas veces las prácticas más auténticas vienen de emprendimientos comunitarios</li>
        <li><strong>Usar plataformas especializadas</strong>: Como Natik, que pre-selecciona alojamientos con criterios de sostenibilidad</li>
    </ol>
    
    <p>El Sello S es un paso importante, pero el turismo verdaderamente sostenible requiere un ecosistema más amplio donde la certificación sea accesible y donde los viajeros estén educados para tomar decisiones informadas.</p>
        `
      }
    });

    console.log('✅ Updated article 1');

    // Update article 2
    await prisma.article.update({
      where: { id: 2 },
      data: {
        content: `
    <h1>Chile se corona como destino verde mundial: ¿Qué hay detrás de este éxito?</h1>
    
    <p>Chile ha sido reconocido internacionalmente como uno de los destinos más sostenibles del mundo. Pero, ¿qué factores han contribuido a este logro y qué desafíos aún enfrenta el país?</p>
    
    <h2>Los pilares del éxito chileno</h2>
    
    <h3>1. Diversidad geográfica única</h3>
    <p>Desde el desierto de Atacama hasta los glaciares patagónicos, Chile ofrece una variedad de ecosistemas que permite diversificar el turismo y distribuir el impacto ambiental.</p>
    
    <h3>2. Políticas públicas proactivas</h3>
    <p>El gobierno chileno ha implementado iniciativas como:</p>
    <ul>
        <li>El Plan Nacional de Turismo Sustentable 2020-2030</li>
        <li>La creación de nuevos parques nacionales</li>
        <li>Incentivos para empresas turísticas sostenibles</li>
        <li>El sistema de certificación Sello S</li>
    </ul>
    
    <h3>3. Conciencia empresarial creciente</h3>
    <p>Cada vez más empresas turísticas chilenas adoptan prácticas sostenibles, no solo por responsabilidad ambiental, sino porque reconocen que es lo que demandan los viajeros modernos.</p>
    
    <h2>Los números que respaldan el reconocimiento</h2>
    
    <p>Según el último informe del Consejo Mundial de Viajes y Turismo (WTTC):</p>
    <ul>
        <li>Chile lidera en Sudamérica en políticas de turismo sostenible</li>
        <li>El 78% de los turistas que visitan Chile buscan experiencias eco-friendly</li>
        <li>Las empresas con certificación sostenible han aumentado un 45% en los últimos 3 años</li>
        <li>El turismo de naturaleza representa el 60% de las actividades turísticas del país</li>
    </ul>
    
    <h2>Los desafíos que persisten</h2>
    
    <p>A pesar del reconocimiento, Chile enfrenta retos importantes:</p>
    
    <h3>Overtourism en destinos populares</h3>
    <p>Lugares como Torres del Paine y San Pedro de Atacama sufren presión por exceso de visitantes en temporada alta.</p>
    
    <h3>Infraestructura limitada</h3>
    <p>Muchas zonas rurales carecen de la infraestructura necesaria para un turismo sostenible de calidad.</p>
    
    <h3>Educación del viajero</h3>
    <p>Aún falta concienciar más a los turistas sobre prácticas responsables durante su visita.</p>
    
    <h2>El futuro del turismo verde en Chile</h2>
    
    <p>Para mantener su liderazgo, Chile debe:</p>
    <ol>
        <li><strong>Descentralizar el turismo</strong>: Promover destinos menos conocidos para distribuir el flujo de visitantes</li>
        <li><strong>Invertir en tecnología</strong>: Usar herramientas digitales para gestionar mejor los flujos turísticos</li>
        <li><strong>Fortalecer las comunidades locales</strong>: Asegurar que el turismo beneficie realmente a las poblaciones locales</li>
        <li><strong>Innovar en sostenibilidad</strong>: Ser pionero en nuevas prácticas y tecnologías verdes</li>
    </ol>
    
    <p>El reconocimiento internacional es un logro importante, pero también una responsabilidad. Chile tiene la oportunidad de ser un modelo para otros países en desarrollo de turismo verdaderamente sostenible.</p>
        `
      }
    });

    console.log('✅ Updated article 2');

    // Update article 3
    await prisma.article.update({
      where: { id: 3 },
      data: {
        content: `
    <h1>El nuevo turista chileno: más consciente, más conectado con la naturaleza</h1>
    
    <p>Los hábitos de viaje de los chilenos han cambiado drásticamente en los últimos años. Una nueva generación de viajeros busca experiencias más auténticas y sostenibles, transformando la industria turística nacional.</p>
    
    <h2>El perfil del nuevo viajero chileno</h2>
    
    <h3>Características principales:</h3>
    <ul>
        <li><strong>Edad promedio</strong>: 28-45 años</li>
        <li><strong>Educación</strong>: Universitaria o técnica superior</li>
        <li><strong>Ingresos</strong>: Clase media y media-alta</li>
        <li><strong>Valores</strong>: Sostenibilidad, autenticidad, bienestar</li>
    </ul>
    
    <h2>¿Qué buscan en sus viajes?</h2>
    
    <h3>1. Conexión con la naturaleza</h3>
    <p>El 73% de los viajeros chilenos prefiere destinos naturales sobre ciudades. Buscan:</p>
    <ul>
        <li>Trekking y senderismo</li>
        <li>Observación de flora y fauna</li>
        <li>Actividades al aire libre</li>
        <li>Paisajes vírgenes y poco explorados</li>
    </ul>
    
    <h3>2. Experiencias auténticas</h3>
    <p>Ya no basta con "conocer" un lugar. Los nuevos viajeros quieren:</p>
    <ul>
        <li>Interactuar con comunidades locales</li>
        <li>Aprender sobre culturas ancestrales</li>
        <li>Participar en actividades tradicionales</li>
        <li>Consumir productos locales y artesanales</li>
    </ul>
    
    <h3>3. Impacto positivo</h3>
    <p>El 68% considera importante que su viaje genere beneficios para la comunidad local:</p>
    <ul>
        <li>Prefieren alojamientos familiares</li>
        <li>Buscan tours operados por locales</li>
        <li>Eligen restaurantes que usan ingredientes regionales</li>
        <li>Participan en actividades de conservación</li>
    </ul>
    
    <h2>Cambios en los patrones de viaje</h2>
    
    <h3>Duración de los viajes</h3>
    <p>Los viajes son más largos pero menos frecuentes. Prefieren 7-10 días de inmersión total que múltiples escapadas cortas.</p>
    
    <h3>Planificación</h3>
    <p>Invierten más tiempo en investigar destinos y operadores. El 85% consulta múltiples fuentes antes de decidir.</p>
    
    <h3>Presupuesto</h3>
    <p>Están dispuestos a pagar más por experiencias de calidad y sostenibles. El precio ya no es el factor decisivo principal.</p>
    
    <h2>El futuro del turismo consciente</h2>
    
    <p>Esta tendencia no es pasajera. Los expertos predicen que para 2030:</p>
    <ul>
        <li>El 80% de los viajeros chilenos priorizará la sostenibilidad</li>
        <li>El turismo de naturaleza crecerá un 40%</li>
        <li>Las experiencias comunitarias se triplicarán</li>
        <li>La tecnología facilitará viajes más personalizados y responsables</li>
    </ul>
    
    <p>El nuevo turista chileno está redefiniendo lo que significa viajar. Ya no se trata solo de descansar o conocer lugares, sino de conectar, aprender y contribuir positivamente a los destinos que visitan.</p>
        `
      }
    });

    console.log('✅ Updated article 3');

    // Update article 4
    await prisma.article.update({
      where: { id: 4 },
      data: {
        content: `
    <h1>2025: El año en que Latinoamérica se vuelve el destino favorito</h1>
    
    <p>Las tendencias globales de turismo apuntan a que 2025 será un año decisivo para Latinoamérica. La región se posiciona como el destino preferido para viajeros que buscan autenticidad, naturaleza y experiencias transformadoras.</p>
    
    <h2>¿Por qué Latinoamérica está en el radar mundial?</h2>
    
    <h3>1. Diversidad natural incomparable</h3>
    <p>La región alberga algunos de los ecosistemas más diversos del planeta:</p>
    <ul>
        <li><strong>Amazonas</strong>: El pulmón del mundo con una biodiversidad única</li>
        <li><strong>Andes</strong>: La cordillera más larga del mundo con paisajes espectaculares</li>
        <li><strong>Patagonia</strong>: Glaciares, fiordos y vida silvestre excepcional</li>
        <li><strong>Costas del Pacífico</strong>: Desde desiertos hasta selvas tropicales</li>
        <li><strong>Islas Galápagos</strong>: Laboratorio natural de la evolución</li>
    </ul>
    
    <h3>2. Riqueza cultural auténtica</h3>
    <p>Latinoamérica ofrece experiencias culturales que no se encuentran en otros continentes:</p>
    <ul>
        <li>Civilizaciones precolombinas vivas (Maya, Inca, Mapuche)</li>
        <li>Tradiciones gastronómicas reconocidas mundialmente</li>
        <li>Arte y música únicos</li>
        <li>Festivales y celebraciones coloridas</li>
        <li>Hospitalidad legendaria de sus pueblos</li>
    </ul>
    
    <h2>Tendencias que impulsan el crecimiento</h2>
    
    <h3>Turismo post-pandemia</h3>
    <p>Los viajeros buscan:</p>
    <ul>
        <li>Destinos menos masificados</li>
        <li>Espacios abiertos y naturales</li>
        <li>Experiencias más significativas</li>
        <li>Conexión con la naturaleza para el bienestar mental</li>
    </ul>
    
    <h3>Conciencia ambiental creciente</h3>
    <p>El 78% de los viajeros globales quiere reducir su huella de carbono:</p>
    <ul>
        <li>Prefieren destinos comprometidos con la conservación</li>
        <li>Buscan experiencias de turismo sostenible</li>
        <li>Valoran la protección de ecosistemas únicos</li>
    </ul>
    
    <p>2025 se perfila como el año en que Latinoamérica consolide su posición como el destino preferido para viajeros que buscan experiencias auténticas, sostenibles y transformadoras.</p>
        `
      }
    });

    console.log('✅ Updated article 4');

    console.log('🎉 All articles updated successfully!');

  } catch (error) {
    console.error('❌ Error updating articles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateArticleContent();
