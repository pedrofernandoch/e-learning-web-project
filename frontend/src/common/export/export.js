import { CsvBuilder } from 'filefy'

const byString = (o, s) => {
    if (!s) {
        return;
    }

    s = s.replace(/\[(\w+)\]/g, ".$1"); 
    s = s.replace(/^\./, ""); 
    var a = s.split(".");
    for (var i = 0, n = a.length; i < n; ++i) {
        var x = a[i];
        if (o && x in o) {
            o = o[x];
        } else {
            return;
        }
    }
    return o;
}

const getFieldValue = (rowData, columnDef, lookup = true) => {
    let value =
        typeof rowData[columnDef.field] !== "undefined"
            ? rowData[columnDef.field]
            : byString(rowData, columnDef.field);
    if (columnDef.lookup && lookup) {
        value = columnDef.lookup[value];
    }

    return value;
}

const transformData = (columns, data) => {
    columns = columns.filter(
        (columnDef) =>
            (!columnDef.hidden || columnDef.export === true) &&
            columnDef.export !== false &&
            columnDef.field
    ).sort((a, b) =>
        a.tableData.columnOrder > b.tableData.columnOrder ? 1 : -1
    )
    data = data.map((rowData) =>
        columns.map((columnDef) => getFieldValue(rowData, columnDef))
    )

    return { columns, data}
}

const exportCsv = (_columns, _data, fileName) => {
    const {columns, data} = transformData(_columns, _data)
    const builder = new CsvBuilder(fileName + ".csv");
    builder.setDelimeter(',')
        .setColumns(columns.map((columnDef) => columnDef.title))
        .addRows(data)
        .exportFile();
}

export { exportCsv }