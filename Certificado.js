function generateCertificate() {
    const name = document.getElementById('name').value;
    const cedula = document.getElementById('cedula').value;
    const currentDate = new Date();

    if (!name || !cedula) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    document.getElementById('participant-name').textContent = name;
    document.getElementById('participant-cedula').textContent = cedula;

    const formattedDate = currentDate.toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('issue-date').textContent = formattedDate;

    document.getElementById('certificate').style.display = 'block';
}

function downloadCertificate() {
    const certificate = document.getElementById('certificate');

    html2canvas(certificate, { scale: window.devicePixelRatio }).then(canvas => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("landscape", "mm", "a4");

        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = 297;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("certificado.pdf");
    });
}

document.getElementById("certificate-form").addEventListener("submit", function(event) {
    event.preventDefault();
    generateCertificate();
});

document.getElementById("download-btn").addEventListener("click", function() {
    downloadCertificate();
});
