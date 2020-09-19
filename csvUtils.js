const downloadCSV = (csv, filename) => {
    let csvFile = new Blob([csv], {type: "text/csv"}),
        downloadLink = document.createElement("a");

    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);

    downloadLink.click();
}

const exportTableToCSV = (table, filename) => {
	let csv = [],
	    rows = table.querySelectorAll("tr");
	
    for (let i = 0; i < rows.length; i++) {
		let row = [], cols = rows[i].querySelectorAll("td, th");
		
        for (let j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
		csv.push(row.join(","));		
	}

    downloadCSV(csv.join("\n"), filename);
}