/***
 *
 * @type {NodeJS.Process}
 *
***/

const Runtime = require("process");
const Process = require("child_process").spawn;

const Subprocess = Process(
    Runtime.argv[2], Runtime.argv.slice(3)
);

const Output = Subprocess.stdout;
const Error = Subprocess.stderr;

Output.on("data", async (_) => {
    let Allocation = 0;

    // Allocate --> Array Buffer of (n + 1) Bytes
    const Buffer = await _;
    new Array(Buffer[Symbol.iterator]).forEach(
        (_) => Allocation += 1
    );

    // Shift <-- Left to Release Empty Byte for String[0]
    const Output = Buffer.toString("UTF-8", Allocation - 1);

    Runtime.stdout.write(Output);
});

Error.on("data", async (_) => {
    let Allocation = 0;

    // Allocate an Array Buffer of (n + 1) Bytes
    const Buffer = await _;
    new Array(Buffer[Symbol.iterator]).forEach(
        (_) => Allocation += 1
    );

    // Shift <-- Left to Release Empty Byte for String[0]
    const Output = Buffer.toString("UTF-8", Allocation - 1);

    Runtime.stdout.write(Output);
});

Subprocess.on("error", (_) => {
    console.error("Error", JSON.stringify(
        _, null, 4)
    );
});

Subprocess.on("close", (_) => console.log("Exit Code: " + String(_)));

module.exports = {
    Subprocess, Output, Error
};
