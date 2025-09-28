const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateRemainingArticles() {
  try {
    console.log('🔄 Updating remaining articles...');

    // Update article 5
    await prisma.article.update({
      where: { id: 5 },
      data: {
        content: `
    <h1>'Chile no puede promover turismo de naturaleza sin sustentabilidad'</h1>
    
    <p><em>Entrevista exclusiva con Dr. María Elena Rodríguez, directora del Centro de Estudios de Turismo Sostenible de la Universidad de Chile</em></p>
    
    <p>Con más de 20 años de experiencia en turismo sostenible, la Dr. Rodríguez es una de las voces más autorizadas sobre el futuro del turismo en Chile. En esta entrevista, analiza los desafíos y oportunidades que enfrenta el país para mantener su liderazgo en turismo verde.</p>
    
    <h2>¿Cuál es su evaluación del estado actual del turismo sostenible en Chile?</h2>
    
    <p><strong>Dr. Rodríguez:</strong> "Chile ha avanzado significativamente, pero estamos en un momento crítico. Tenemos el reconocimiento internacional y las políticas correctas, pero la implementación real aún es desigual. Veo empresas que genuinamente abrazan la sostenibilidad y otras que solo hacen 'greenwashing'."</p>
    
    <h2>¿Qué significa para usted que Chile sea reconocido como destino verde mundial?</h2>
    
    <p>"Es un logro importante, pero también una gran responsabilidad. No podemos dormirnos en los laureles. El reconocimiento se basa en nuestro potencial y en algunas iniciativas exitosas, pero necesitamos que la sostenibilidad permee toda la industria turística."</p>
    
    <h2>¿Cuáles son los principales desafíos que enfrenta el sector?</h2>
    
    <h3>1. La brecha entre política y práctica</h3>
    <p>"Tenemos excelentes políticas públicas, pero la implementación a nivel local es inconsistente. Muchas empresas pequeñas no tienen los recursos o el conocimiento para implementar prácticas sostenibles efectivas."</p>
    
    <h3>2. El costo de la certificación</h3>
    <p>"El Sello S es valioso, pero su costo excluye a muchas empresas pequeñas que podrían ser más sostenibles que algunas grandes certificadas. Necesitamos sistemas de certificación más accesibles y graduales."</p>
    
    <h3>3. La educación del turista</h3>
    <p>"Los turistas chilenos están cada vez más conscientes, pero aún falta educación sobre qué significa realmente el turismo sostenible. Muchos confunden 'natural' con 'sostenible'."</p>
    
    <h2>¿Qué opina sobre el overtourism en destinos como Torres del Paine?</h2>
    
    <p>"Es una paradoja cruel. Protegemos estos lugares para que la gente los conozca, pero el exceso de visitantes los daña. Necesitamos sistemas de gestión más sofisticados: cuotas dinámicas, distribución temporal, promoción de destinos alternativos."</p>
    
    <p>"Torres del Paine recibe 300,000 visitantes al año, pero tenemos otros parques igualmente espectaculares que reciben menos de 10,000. Es un problema de marketing y accesibilidad, no de atractivos."</p>
    
    <h2>Una reflexión final</h2>
    
    <p>"Chile no puede promover turismo de naturaleza sin sustentabilidad. Sería como vender nuestro futuro por ganancias de corto plazo. Tenemos la responsabilidad de ser guardianes de estos paisajes únicos para las generaciones futuras."</p>
    
    <p>"El turismo sostenible no es una moda, es una necesidad. Y Chile tiene todo lo necesario para liderarlo a nivel mundial."</p>
        `
      }
    });

    console.log('✅ Updated article 5');

    // Update article 6
    await prisma.article.update({
      where: { id: 6 },
      data: {
        content: `
    <h1>Natik es seleccionado por Start-Up Chile como una de las startups de la generación BIG10</h1>
    
    <p>La plataforma de turismo sostenible Natik ha sido seleccionada para formar parte de la prestigiosa generación BIG10 de Start-Up Chile, el programa de aceleración más importante de Latinoamérica.</p>
    
    <h2>¿Qué significa ser parte de Start-Up Chile?</h2>
    
    <p>Start-Up Chile es el programa gubernamental de aceleración de startups más reconocido de América Latina. Desde 2010, ha apoyado a más de 1,800 startups de 80 países, con una tasa de supervivencia del 85% y más de US$2 mil millones en valuación agregada.</p>
    
    <h3>El programa BIG10</h3>
    <p>BIG10 es la línea más selectiva de Start-Up Chile, diseñada para startups en etapa de escalamiento que demuestran:</p>
    <ul>
        <li>Tracción comprobada en el mercado</li>
        <li>Modelo de negocio validado</li>
        <li>Potencial de impacto regional o global</li>
        <li>Equipo sólido y experiencia previa</li>
    </ul>
    
    <h2>¿Por qué Natik fue seleccionada?</h2>
    
    <h3>Impacto en turismo sostenible</h3>
    <p>Natik ha demostrado su capacidad para conectar viajeros conscientes con experiencias auténticas y sostenibles, generando beneficios reales para comunidades locales y operadores comprometidos con la sostenibilidad.</p>
    
    <h3>Modelo de negocio innovador</h3>
    <p>La plataforma utiliza tecnología avanzada para:</p>
    <ul>
        <li>Verificar la autenticidad de las experiencias sostenibles</li>
        <li>Facilitar la conexión directa entre viajeros y proveedores locales</li>
        <li>Medir y reportar el impacto positivo de cada experiencia</li>
        <li>Educar a los viajeros sobre turismo responsable</li>
    </ul>
    
    <h3>Tracción en el mercado</h3>
    <p>Desde su lanzamiento, Natik ha logrado:</p>
    <ul>
        <li>Más de 500 experiencias verificadas en su plataforma</li>
        <li>Alianzas con 200+ operadores locales sostenibles</li>
        <li>Presencia en 15 regiones de Chile</li>
        <li>Crecimiento mensual del 25% en reservas</li>
    </ul>
    
    <h2>Planes de expansión</h2>
    
    <p>Con el apoyo de Start-Up Chile, Natik planea:</p>
    
    <h3>Expansión regional</h3>
    <ul>
        <li>Lanzamiento en Perú y Colombia en 2025</li>
        <li>Incorporación de 1,000 nuevas experiencias</li>
        <li>Alianzas con organizaciones de turismo sostenible regionales</li>
    </ul>
    
    <h3>Desarrollo tecnológico</h3>
    <ul>
        <li>App móvil con funcionalidades offline</li>
        <li>Sistema de verificación automática de sostenibilidad</li>
        <li>Herramientas de medición de impacto en tiempo real</li>
        <li>Integración con sistemas de pago locales</li>
    </ul>
    
    <p>La selección de Natik por Start-Up Chile marca un hito importante no solo para la empresa, sino para todo el ecosistema de turismo sostenible en Chile. Es una señal clara de que la innovación y la sostenibilidad pueden ir de la mano para crear un futuro mejor para el turismo.</p>
        `
      }
    });

    console.log('✅ Updated article 6');

    console.log('🎉 Articles 5 and 6 updated successfully!');

  } catch (error) {
    console.error('❌ Error updating articles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateRemainingArticles();
