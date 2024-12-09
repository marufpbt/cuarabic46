fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('data-container');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Specify the column to remove
        const columnToRemove = "Timestamp";
        data.forEach(row => delete row[columnToRemove]);

        // Create table headers
        const headers = Object.keys(data[0]);
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Function to render table rows
        const renderTableRows = (filteredData) => {
            tbody.innerHTML = ''; // Clear previous rows
            filteredData.forEach(row => {
                const tr = document.createElement('tr');
                headers.forEach(header => {
                    const td = document.createElement('td');
                    td.textContent = row[header];
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
        };

        renderTableRows(data); // Initial render of all rows

        // Append table to container
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);

        // Add search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase();
            const filteredData = data.filter(row =>
                headers.some(header => 
                    String(row[header]).toLowerCase().includes(query)
                )
            );
            renderTableRows(filteredData);
        });
    })
    .catch(error => console.error('Error loading data:', error));
