const express = require('express');
const router = express.Router();
const prisma = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Helper: check seed secret
function verifySeedSecret(req, res) {
  const provided = req.headers['x-seed-secret'] || req.headers['X-Seed-Secret'];
  const expected = process.env.SEED_SECRET;
  if (!expected) {
    return res.status(500).json({ error: 'SEED_SECRET not configured on server' });
  }
  if (!provided || provided !== expected) {
    return res.status(403).json({ error: 'Invalid seed secret' });
  }
  return null;
}

// Temporary one-time seeding endpoint
// Protect with: JWT admin + X-Seed-Secret header
router.post('/seed-articles', authenticateToken, requireAdmin, async (req, res) => {
  const secretErr = verifySeedSecret(req, res);
  if (secretErr) return; // Response already sent

  try {
    // If there are already articles, skip to keep it idempotent
    const existingCount = await prisma.article.count();
    if (existingCount > 0) {
      return res.status(409).json({
        status: 'skipped',
        message: 'Articles already exist. Seed is intended for empty databases only.',
        existingCount
      });
    }

    const categories = [
      { name: 'Certificación', slug: 'certificacion' },
      { name: 'Noticias', slug: 'noticias' },
      { name: 'Tendencias', slug: 'tendencias' },
      { name: 'Destinos', slug: 'destinos' },
      { name: 'Opiniones', slug: 'opiniones' }
    ];

    const articles = [
      {
        title: "El Sello S y los desafíos reales del turismo sostenible en Chile",
        excerpt: "Hablar de turismo sostenible está de moda, pero ¿cómo saber realmente qué empresas lo practican? Chile tiene un sistema de certificación que busca responder esta pregunta, aunque no está exento de desafíos.",
        content: `<h1>El Sello S y los desafíos reales del turismo sostenible en Chile</h1>
        
        <p>Hablar de turismo sostenible está de moda, pero ¿cómo saber realmente qué empresas lo practican? Chile tiene un sistema de certificación que busca responder esta pregunta, aunque no está exento de desafíos.</p>
        
        <h2>El sistema de sellos de Sernatur</h2>
        
        <p>Sernatur maneja tres tipos de certificaciones para clasificar los servicios turísticos:</p>
        
        <ul>
            <li><strong>Sello R</strong> (Servicio Turístico Registrado): Para empresas que cumplen los requisitos básicos</li>
            <li><strong>Sello Q</strong> (Sello de Calidad Turística): Para servicios que destacan por su calidad</li>
            <li><strong>Sello S</strong> (Turismo Sustentable): El que nos interesa para el turismo sostenible</li>
        </ul>`,
        imageUrl: "assets/blog_sellos.png",
        categorySlug: "certificacion",
        featured: true,
        published: true,
        publishedAt: new Date("2025-09-21")
      },
      {
        title: "Chile se corona como destino verde mundial: ¿Qué hay detrás de este éxito?",
        excerpt: "Chile no para de ganar premios por su turismo verde. Hace poco, el país se llevó el reconocimiento como 'Principal Destino Verde de Sudamérica' en los World Travel Awards 2024.",
        content: `<p>Chile no para de ganar premios por su turismo verde. Hace poco, el país se llevó el reconocimiento como "Principal Destino Verde de Sudamérica" en los World Travel Awards 2024, los famosos "Oscar" del turismo.</p>`,
        imageUrl: "assets/blog_img5.jpg",
        categorySlug: "noticias",
        featured: false,
        published: true,
        publishedAt: new Date("2025-09-16")
      },
      {
        title: "El nuevo turista chileno: más consciente, más conectado con la naturaleza",
        excerpt: "Los viajeros están cambiando, y Chile lo está notando. Ya no basta con ofrecer solo sol y playa o paisajes bonitos.",
        content: `<p>Los viajeros están cambiando, y Chile lo está notando. Ya no basta con ofrecer solo sol y playa o paisajes bonitos. Los turistas de hoy buscan algo más: experiencias auténticas, responsables y que realmente los conecten con el lugar que visitan.</p>`,
        imageUrl: "assets/blog_img3.jpg",
        categorySlug: "tendencias",
        featured: false,
        published: true,
        publishedAt: new Date("2025-09-09")
      },
      {
        title: "2025: El año en que Latinoamérica se vuelve el destino favorito",
        excerpt: "Latinoamérica está viviendo su mejor momento turístico. Desde las selvas amazónicas hasta las playas del Caribe.",
        content: `<p>Latinoamérica está viviendo su mejor momento turístico. Desde las selvas amazónicas hasta las playas del Caribe, pasando por ciudades llenas de historia, la región se está convirtiendo en el destino que todos quieren visitar.</p>`,
        imageUrl: "assets/blog_img4.jpg",
        categorySlug: "destinos",
        featured: false,
        published: true,
        publishedAt: new Date("2025-09-02")
      },
      {
        title: "'Chile no puede promover turismo de naturaleza sin sustentabilidad'",
        excerpt: "La Subsecretaria de Turismo sostiene que el principal atractivo del país es su naturaleza, y que no es posible promover turismo de naturaleza si no es sustentable.",
        content: `<p>Chile ha recibido cerca de 30 premios de turismo, entre ellos el reconocimiento en 2023 como Mejor Destino Verde del Mundo por los World Travel Awards.</p>`,
        imageUrl: "assets/blog_img6.png",
        categorySlug: "opiniones",
        featured: false,
        published: true,
        publishedAt: new Date("2025-08-15")
      },
      {
        title: "Natik es seleccionado por Start-Up Chile como una de las startups de la generación BIG10",
        excerpt: "Revisa aquí el listado completo de los 62 proyectos que entrarán a nuestros programas Build, Ignite y Growth.",
        content: `<p>Natik es un marketplace para reservas de eco-friendly alojamientos y experiencias locales en Chile y Latinoamérica.</p>`,
        imageUrl: "assets/blog_img7.png",
        categorySlug: "noticias",
        featured: false,
        published: true,
        publishedAt: new Date("2025-07-18")
      },
      {
        title: "Guía completa para elegir alojamientos sustentables en Chile",
        excerpt: "Todo lo que necesitas saber para identificar y reservar alojamientos verdaderamente sustentables en tu próximo viaje.",
        content: `<p>Elegir un alojamiento verdaderamente sustentable puede ser un desafío en un mercado lleno de greenwashing. Esta guía te ayudará a identificar las características clave.</p>`,
        imageUrl: "assets/blog_img1.jpg",
        categorySlug: "tendencias",
        featured: false,
        published: true,
        publishedAt: new Date("2025-07-01")
      },
      {
        title: "Los destinos de naturaleza más populares entre viajeros conscientes",
        excerpt: "Explora los rincones de Chile que están captando la atención de quienes buscan experiencias auténticas en contacto con la naturaleza.",
        content: `<p>Chile ofrece una diversidad de paisajes únicos que atraen cada vez más a viajeros conscientes. Desde el desierto más árido del mundo hasta glaciares milenarios.</p>`,
        imageUrl: "assets/blog_img2.jpg",
        categorySlug: "destinos",
        featured: false,
        published: true,
        publishedAt: new Date("2025-06-15")
      },
      {
        title: "Ecoturismo en la Patagonia: Una experiencia transformadora",
        excerpt: "Descubre cómo el ecoturismo en la Patagonia chilena está redefiniendo la forma en que viajamos y nos conectamos con la naturaleza.",
        content: `<p>La Patagonia chilena se ha convertido en un referente mundial del ecoturismo, ofreciendo experiencias que van más allá del simple avistamiento de paisajes.</p>`,
        imageUrl: "assets/blog_img8.jpg",
        categorySlug: "destinos",
        featured: false,
        published: true,
        publishedAt: new Date("2025-06-01")
      }
    ];

    // Upsert categories first
    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category
      });
    }

    // Create articles if not existing
    let created = 0;
    for (const article of articles) {
      const category = await prisma.category.findUnique({ where: { slug: article.categorySlug } });
      if (!category) continue;

      const existing = await prisma.article.findFirst({ where: { title: article.title } });
      if (existing) continue;

      await prisma.article.create({
        data: {
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          imageUrl: article.imageUrl,
          featured: article.featured,
          published: article.published,
          publishedAt: article.publishedAt,
          categoryId: category.id
        }
      });
      created += 1;
    }

    return res.json({
      status: 'ok',
      message: 'Seed completed',
      created
    });
  } catch (err) {
    console.error('Seed error:', err);
    return res.status(500).json({ error: 'Seed failed', details: err.message });
  }
});

module.exports = router;
