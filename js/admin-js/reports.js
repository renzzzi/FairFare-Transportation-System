export function setupReportModal() {
    const reportTable = document.getElementById('reports-table');
    const reportModal = document.getElementById('report-modal');
    const reportDetails = document.getElementById('report-details');
    const closeButton = document.querySelector('.close-button');

    if (reportTable && reportModal && reportDetails && closeButton) {
        reportTable.addEventListener('click', (event) => {
            const target = event.target;
            if (target.tagName === 'TD') {
                const row = target.parentNode;
                const supervisorId = row.cells[0].textContent;
                const reportTitle = row.cells[1].textContent;
                const reportStatus = row.cells[2].textContent;

                // Example of fetching details
                const details = `
                    <h3>${reportTitle}</h3>
                    <p>Supervisor ID: ${supervisorId}</p>
                    <p>Status: ${reportStatus}</p>
                    <p>This is a sample report. Add more details here.</p>
                `;

                reportDetails.innerHTML = details;
                reportModal.style.display = 'block';
            }
        });

        closeButton.addEventListener('click', () => {
            reportModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === reportModal) {
                reportModal.style.display = 'none';
            }
        });
    }
}
