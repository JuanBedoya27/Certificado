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
    html2canvas(certificate, { scale: 2 }).then(canvas => {
        // Crea un PDF usando jsPDF con orientación "landscape"
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("landscape", "mm", "a4");  // Orientación horizontal (landscape)
        
        // Convierte el canvas a imagen
        const imgData = canvas.toDataURL("image/png");
        
        // Ajusta la imagen al tamaño de una hoja A4 en orientación horizontal
        const pdfWidth = 297;  // Ancho de A4 en mm en orientación horizontal
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        // Agrega la imagen al PDF
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        
        // Descarga el PDF
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
