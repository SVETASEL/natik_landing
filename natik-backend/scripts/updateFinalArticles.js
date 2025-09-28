const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateFinalArticles() {
  try {
    console.log('🔄 Updating final articles...');

    // Update article 8
    await prisma.article.update({
      where: { id: 8 },
      data: {
        content: `
    <h1>Los destinos de naturaleza más populares entre viajeros conscientes</h1>
    
    <p>Una nueva generación de viajeros está redefiniendo el turismo, priorizando destinos que ofrecen experiencias auténticas en contacto con la naturaleza. Estos son los lugares que están capturando la atención de los viajeros conscientes en 2024.</p>
    
    <h2>¿Qué buscan los viajeros conscientes?</h2>
    
    <p>Los viajeros conscientes no solo buscan paisajes hermosos, sino destinos que ofrezcan:</p>
    <ul>
        <li><strong>Conservación activa</strong>: Lugares donde el turismo contribuye directamente a la protección del ecosistema</li>
        <li><strong>Beneficio comunitario</strong>: Destinos donde las comunidades locales son protagonistas y beneficiarias del turismo</li>
        <li><strong>Experiencias educativas</strong>: Oportunidades de aprender sobre biodiversidad, cultura local y sostenibilidad</li>
        <li><strong>Bajo impacto</strong>: Actividades que minimizan la huella ambiental</li>
        <li><strong>Autenticidad</strong>: Experiencias genuinas lejos del turismo masivo</li>
    </ul>
    
    <h2>Top 5 destinos de naturaleza para viajeros conscientes</h2>
    
    <h3>1. Patagonia Chilena</h3>
    <p><strong>Por qué es especial:</strong> Paisajes prístinos, programas de conservación exitosos y turismo comunitario desarrollado.</p>
    <p><strong>Experiencias destacadas:</strong></p>
    <ul>
        <li>Trekking en Torres del Paine con guías locales</li>
        <li>Avistamiento de ballenas en Puerto Natales</li>
        <li>Estancias sustentables en la Patagonia</li>
        <li>Programas de reforestación participativa</li>
    </ul>
    
    <h3>2. Desierto de Atacama</h3>
    <p><strong>Por qué es especial:</strong> El desierto más árido del mundo con comunidades indígenas que mantienen tradiciones ancestrales.</p>
    <p><strong>Experiencias destacadas:</strong></p>
    <ul>
        <li>Turismo astronómico con comunidades atacameñas</li>
        <li>Termas naturales gestionadas localmente</li>
        <li>Cultivos ancestrales en oasis</li>
        <li>Artesanía tradicional en pueblos altiplánicos</li>
    </ul>
    
    <h3>3. Chiloé</h3>
    <p><strong>Por qué es especial:</strong> Patrimonio cultural único, biodiversidad marina y turismo comunitario consolidado.</p>
    <p><strong>Experiencias destacadas:</strong></p>
    <ul>
        <li>Navegación tradicional en dalcas</li>
        <li>Gastronomía local con productos del mar</li>
        <li>Observación de aves en humedales</li>
        <li>Talleres de construcción de palafitos</li>
    </ul>
    
    <h3>4. Valle del Elqui</h3>
    <p><strong>Por qué es especial:</strong> Cielos limpios para astronomía, agricultura sustentable y turismo místico responsable.</p>
    <p><strong>Experiencias destacadas:</strong></p>
    <ul>
        <li>Observación astronómica en observatorios comunitarios</li>
        <li>Turismo vitivinícola orgánico</li>
        <li>Destilación artesanal de pisco</li>
        <li>Terapias holísticas con plantas locales</li>
    </ul>
    
    <h3>5. Parque Nacional Conguillio</h3>
    <p><strong>Por qué es especial:</strong> Bosques de araucarias milenarias y cultura mapuche viva.</p>
    <p><strong>Experiencias destacadas:</strong></p>
    <ul>
        <li>Caminatas entre araucarias con guías mapuches</li>
        <li>Ceremonias tradicionales mapuches</li>
        <li>Gastronomía ancestral</li>
        <li>Talleres de medicina tradicional</li>
    </ul>
    
    <h2>Tendencias en turismo de naturaleza consciente</h2>
    
    <h3>Viajes más largos y profundos</h3>
    <p>Los viajeros conscientes prefieren estadías de 7-14 días que permitan una inmersión real en el destino, en lugar de visitas superficiales.</p>
    
    <h3>Grupos pequeños</h3>
    <p>El 78% prefiere experiencias en grupos de máximo 8 personas para minimizar el impacto y maximizar la interacción con comunidades locales.</p>
    
    <h3>Temporadas alternativas</h3>
    <p>Cada vez más viajeros eligen temporadas medias o bajas para evitar la masificación y obtener precios más justos para las comunidades.</p>
    
    <h2>El futuro del turismo de naturaleza</h2>
    
    <p>Los destinos de naturaleza que prosperarán en el futuro serán aquellos que logren equilibrar:</p>
    <ul>
        <li><strong>Conservación</strong>: Protección efectiva de ecosistemas</li>
        <li><strong>Beneficio comunitario</strong>: Desarrollo económico local justo</li>
        <li><strong>Experiencia del visitante</strong>: Vivencias auténticas y transformadoras</li>
        <li><strong>Sostenibilidad</strong>: Viabilidad económica a largo plazo</li>
    </ul>
    
    <p>Los viajeros conscientes están impulsando una revolución en el turismo de naturaleza, priorizando destinos que ofrecen no solo belleza natural, sino también impacto positivo y experiencias auténticas.</p>
        `
      }
    });

    console.log('✅ Updated article 8');

    // Update article 9
    await prisma.article.update({
      where: { id: 9 },
      data: {
        content: `
    <h1>Ecoturismo en la Patagonia: Una experiencia transformadora</h1>
    
    <p>La Patagonia chilena se ha consolidado como uno de los destinos de ecoturismo más importantes del mundo. Más allá de sus paisajes espectaculares, ofrece experiencias que transforman la perspectiva de los viajeros sobre la conservación y su relación con la naturaleza.</p>
    
    <h2>¿Qué hace única a la Patagonia?</h2>
    
    <h3>Paisajes de otro mundo</h3>
    <p>La Patagonia chilena alberga algunos de los paisajes más dramáticos del planeta:</p>
    <ul>
        <li><strong>Glaciares milenarios</strong>: Como el glaciar Grey y el glaciar Perito Moreno</li>
        <li><strong>Torres graníticas</strong>: Las icónicas Torres del Paine</li>
        <li><strong>Campos de hielo</strong>: Los terceros más grandes del mundo después de Antártica y Groenlandia</li>
        <li><strong>Fiordos profundos</strong>: Canales navegables entre montañas</li>
        <li><strong>Estepas infinitas</strong>: Praderas que se extienden hasta el horizonte</li>
    </ul>
    
    <h3>Biodiversidad única</h3>
    <p>A pesar de las condiciones extremas, la Patagonia alberga una biodiversidad sorprendente:</p>
    <ul>
        <li><strong>Fauna emblemática</strong>: Guanacos, pumas, cóndores, huemules</li>
        <li><strong>Vida marina</strong>: Ballenas, orcas, lobos marinos, pingüinos</li>
        <li><strong>Aves únicas</strong>: Más de 200 especies, incluyendo el cóndor andino</li>
        <li><strong>Flora adaptada</strong>: Plantas que han evolucionado para sobrevivir en condiciones extremas</li>
    </ul>
    
    <h2>Experiencias de ecoturismo transformadoras</h2>
    
    <h3>Trekking consciente en Torres del Paine</h3>
    <p>Más que una caminata, es una inmersión en uno de los ecosistemas más frágiles del mundo:</p>
    <ul>
        <li><strong>Circuito W</strong>: 4-5 días de trekking con interpretación ambiental</li>
        <li><strong>Circuito O</strong>: 8-10 días de inmersión total en la naturaleza</li>
        <li><strong>Day hikes</strong>: Caminatas de un día con guías especializados</li>
        <li><strong>Fotografía de naturaleza</strong>: Talleres con fotógrafos profesionales</li>
    </ul>
    
    <h3>Navegación por los fiordos</h3>
    <p>Explorar los canales patagónicos ofrece perspectivas únicas:</p>
    <ul>
        <li><strong>Avistamiento de glaciares</strong>: Observar el retroceso glaciar y el cambio climático</li>
        <li><strong>Vida marina</strong>: Encuentros con ballenas, orcas y delfines</li>
        <li><strong>Geología viva</strong>: Entender la formación de los fiordos</li>
        <li><strong>Silencio absoluto</strong>: Experiencias de meditación en la naturaleza</li>
    </ul>
    
    <h3>Estancias sustentables</h3>
    <p>Vivir la vida gaucha de manera responsable:</p>
    <ul>
        <li><strong>Trabajo con ganado</strong>: Participar en actividades ganaderas sustentables</li>
        <li><strong>Conservación privada</strong>: Conocer esfuerzos de conservación en tierras privadas</li>
        <li><strong>Gastronomía local</strong>: Cocina patagónica con ingredientes locales</li>
        <li><strong>Tradiciones gauchas</strong>: Aprender sobre la cultura rural patagónica</li>
    </ul>
    
    <h2>Impacto de conservación</h2>
    
    <h3>Proyectos de restauración</h3>
    <p>El ecoturismo financia directamente proyectos de conservación:</p>
    <ul>
        <li><strong>Rewilding</strong>: Reintroducción de especies nativas</li>
        <li><strong>Restauración de ecosistemas</strong>: Recuperación de áreas degradadas</li>
        <li><strong>Monitoreo científico</strong>: Investigación sobre cambio climático</li>
        <li><strong>Educación ambiental</strong>: Programas para comunidades locales</li>
    </ul>
    
    <h3>Conservación privada</h3>
    <p>Iniciativas como Tompkins Conservation han transformado la región:</p>
    <ul>
        <li><strong>Parque Pumalín</strong>: 400,000 hectáreas protegidas</li>
        <li><strong>Parque Patagonia</strong>: Restauración de ecosistemas de estepa</li>
        <li><strong>Corredores biológicos</strong>: Conexión entre áreas protegidas</li>
        <li><strong>Investigación científica</strong>: Estudios sobre biodiversidad patagónica</li>
    </ul>
    
    <h2>Beneficios para comunidades locales</h2>
    
    <p>El ecoturismo genera oportunidades económicas y ayuda a preservar tradiciones culturales, creando un modelo sostenible que beneficia tanto a la naturaleza como a las personas que la habitan.</p>
    
    <p>La Patagonia demuestra que el ecoturismo bien gestionado puede ser una herramienta poderosa para la conservación, ofreciendo a los viajeros experiencias que van más allá del simple entretenimiento para convertirse en verdaderas transformaciones personales.</p>
        `
      }
    });

    console.log('✅ Updated article 9');

    console.log('🎉 All articles updated successfully!');

  } catch (error) {
    console.error('❌ Error updating articles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateFinalArticles();
