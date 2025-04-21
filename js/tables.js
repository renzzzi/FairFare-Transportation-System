let sortAscending = true; //Track the sorting direction

export function setupTableSorting() {
    window.sortTable = function (columnIndex) {
        const table = document.querySelector("#requests-table");
        const tbody = table.querySelector("tbody"); 
        const rows = Array.from(tbody.querySelectorAll("tr"));

        rows.sort((rowA, rowB) => {
            const cellA = rowA.querySelectorAll("td")[columnIndex].textContent.trim();
            const cellB = rowB.querySelectorAll("td")[columnIndex].textContent.trim();

            const numA = parseInt(cellA.replace("#", ""));
            const numB = parseInt(cellB.replace("#", ""));

            if (sortAscending) {
                return numA - numB;
            } else {
                return numB - numA;
            }
        });

        // Remove existing rows
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        // Append sorted rows
        rows.forEach(row => tbody.appendChild(row));

        // Toggle sorting direction
        sortAscending = !sortAscending;
    }
}
