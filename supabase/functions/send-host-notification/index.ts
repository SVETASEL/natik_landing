import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    const { 
      name, 
      email, 
      property_name, 
      website, 
      region, 
      whatsapp, 
      property_type, 
      created_at 
    } = await req.json()

    // Send email using Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'notifications@yourdomain.com', // Replace with your verified domain
        to: ['your-email@domain.com'], // Replace with your email
        subject: `🏡 Nueva solicitud de anfitrión: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2f9e72; border-bottom: 2px solid #2f9e72; padding-bottom: 10px;">
              Nueva Solicitud de Anfitrión - Natik
            </h2>
            
            <div style="background-color: #f8f6f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Información del Anfitrión</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Nombre:</td>
                  <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2f9e72;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Propiedad:</td>
                  <td style="padding: 8px 0;">${property_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Región:</td>
                  <td style="padding: 8px 0;">${region}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">WhatsApp:</td>
                  <td style="padding: 8px 0;"><a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" style="color: #2f9e72;">${whatsapp}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Tipo de Propiedad:</td>
                  <td style="padding: 8px 0;">${property_type}</td>
                </tr>
                ${website ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Website/Instagram:</td>
                  <td style="padding: 8px 0;"><a href="${website}" style="color: #2f9e72;" target="_blank">${website}</a></td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Fecha de Solicitud:</td>
                  <td style="padding: 8px 0;">${new Date(created_at).toLocaleString('es-ES')}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #e7f7ef; padding: 15px; border-radius: 8px; border-left: 4px solid #2f9e72;">
              <p style="margin: 0; color: #2f9e72; font-weight: bold;">
                💡 Próximos pasos:
              </p>
              <ul style="color: #666; margin: 10px 0 0 0;">
                <li>Revisar la información del anfitrión</li>
                <li>Contactar por email o WhatsApp</li>
                <li>Enviar formulario completo si hay match</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Este email fue generado automáticamente por el sistema de Natik
              </p>
            </div>
          </div>
        `
      })
    })

    if (!emailResponse.ok) {
      throw new Error(`Email service error: ${emailResponse.statusText}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email notification sent successfully' 
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error sending notification:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
