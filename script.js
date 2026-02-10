document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Form Handling
    const form = document.getElementById('quoteForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const service = document.getElementById('service').value;
        const details = document.getElementById('details').value;
        
        // Construct WhatsApp Message
        const phoneNumber = '5519989404946';
        
        const message = `*Olá! Gostaria de um orçamento.*\n\n` +
                        `👤 *Nome:* ${name}\n` +
                        `🛠 *Serviço:* ${service}\n` +
                        `📝 *Detalhes:* ${details}`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
    });

    // QR Code Generation
    const showQrBtn = document.getElementById('showQrBtn');
    const qrContainer = document.getElementById('qrcode-container');
    const qrCodeDiv = document.getElementById('qrcode');
    let qrCodeGenerated = false;

    showQrBtn.addEventListener('click', () => {
        if (!qrCodeGenerated) {
            // Clear previous if any
            qrCodeDiv.innerHTML = '';
            
            // Generate new QR Code
            new QRCode(qrCodeDiv, {
                text: window.location.href, // Use current URL
                width: 200,
                height: 200,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
            
            qrCodeGenerated = true;
        }
        
        // Toggle visibility
        if (qrContainer.classList.contains('hidden')) {
            qrContainer.classList.remove('hidden');
            showQrBtn.innerHTML = '<span class="icon">🔼</span> Ocultar QR Code';
        } else {
            qrContainer.classList.add('hidden');
            showQrBtn.innerHTML = '<span class="icon">🔗</span> Gerar QR Code da Página';
        }
    });

    // Download QR Code
    document.getElementById('downloadQrBtn').addEventListener('click', () => {
        const img = qrCodeDiv.querySelector('img');
        if (img) {
            const link = document.createElement('a');
            link.href = img.src;
            link.download = 'greghi-qrcode.png';
            link.click();
        }
    });
});
