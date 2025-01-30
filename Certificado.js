function generateCertificate() {
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const cedula = document.getElementById('cedula').value;
    const currentDate = new Date(); // Genera la fecha automáticamente

    // Validar que todos los campos estén llenos
    if (!name || !cedula) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Insertar los valores en el certificado
    document.getElementById('participant-name').textContent = name;
    document.getElementById('participant-cedula').textContent = cedula;
    document.getElementById('issue-date').textContent = currentDate.toLocaleDateString();

    // Mostrar el certificado
    document.getElementById('certificate').style.display = 'block';
}

function downloadCertificate() {
    const certificate = document.getElementById('certificate');

    // Utiliza html2canvas para capturar el certificado
    html2canvas(certificate, { scale: window.devicePixelRatio }).then(canvas => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("landscape", "mm", "a4");
    
        const imgData = canvas.toDataURL("image/png");
    
        // Obtener dimensiones del PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
    
        // Obtener dimensiones de la imagen
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
    
        // Calcular la escala manteniendo la proporción correcta
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2; // Centrar horizontalmente
        const imgY = (pdfHeight - imgHeight * ratio) / 2; // Centrar verticalmente
    
        pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save("certificado.pdf");
    });
    
}

// Asegúrate de que el botón de descarga también funcione correctamente
document.getElementById("certificate-form").addEventListener("submit", function(event) {
    event.preventDefault();
    generateCertificate();
});

document.querySelector("button[onclick='downloadCertificate()']").addEventListener("click", function() {
    downloadCertificate();
});
