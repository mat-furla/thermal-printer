const ThermalPrinter = require("./node_modules/node-thermal-printer").printer;
const PrinterTypes = require("./node_modules/node-thermal-printer").types;
const electron = typeof process !== 'undefined' && process.versions && !!process.versions.electron;

async function example () {
    let printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,                        // Printer type: 'star' or 'epson'
        interface: '/dev/usb/lp0',                       // Printer interface
    });

    let isConnected = await printer.isPrinterConnected();
    console.log("Printer connected:", isConnected);

    printer.alignCenter();
    printer.println("Hello World");                      // Append text with new line
    printer.printQR("teste teste teste")
    printer.cut();                                       // Cuts the paper (if printer only supports one mode use this)
    try {
        await printer.execute();
        console.log("Print success.");
    } catch (error) {
        console.error("Print error:", error);
    }
}

example();