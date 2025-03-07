function generateCertificate() {
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const cedula = document.getElementById('cedula').value;
    const role = document.getElementById('role').value; // Campo para el rol
    const currentDate = new Date(); // Genera la fecha automáticamente

    // Validar que todos los campos estén llenos
    if (!name || !cedula || !role) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Insertar los valores en el certificado
    document.getElementById('participant-name').textContent = name;
    document.getElementById('participant-cedula').textContent = cedula;
    document.getElementById('participant-role').textContent = role; // Añadir rol al certificado
    document.getElementById('issue-date').textContent = currentDate.toLocaleDateString();

    // Mostrar el certificado
    document.getElementById('certificate').style.display = 'block';
}

function downloadCertificate() {
    const certificate = document.getElementById('certificate');

    // Utiliza html2canvas para capturar el certificado con mayor resolución (scale:2)
    html2canvas(certificate, { scale: 2 }).then(canvas => {
        // Crea un PDF usando jsPDF en orientación horizontal (landscape)
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("landscape", "mm", "a4");
        
        // Convierte el canvas a imagen
        const imgData = canvas.toDataURL("image/png");
        
        // Dimensiones para una hoja A4 en orientación horizontal
        const pdfWidth = 297;  // Ancho A4 en mm
        const pdfHeight = 210; // Alto A4 en mm
        
        // Agrega la imagen al PDF ocupando toda la página
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        
        // Descarga el PDF
        pdf.save("certificado.pdf");

        // Recargar la página después de 2 segundos para permitir la descarga
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    });
}

// Manejadores de eventos

// Evita el envío por defecto del formulario y genera el certificado
document.getElementById("certificate-form").addEventListener("submit", function(event) {
    event.preventDefault();
    generateCertificate();
});

// Agrega el evento al botón de descarga para generar y descargar el PDF
document.querySelector("button[onclick='downloadCertificate()']").addEventListener("click", function() {
    downloadCertificate();
});
