import * as net from "net";
import * as childProcess from "child_process";

// Adjust port so that Electron hits React
const port: number = process.env.PORT
  ? Number.parseInt(process.env.PORT, 10) - 100
  : 5000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();
let startedElectron = false;

const tryConnection = () => {
  client.connect({ port }, () => {
    client.end();
    console.log("starting");

    if (!startedElectron) {
      startedElectron = true;
      const child = childProcess.exec(
        'nodemon --watch "build"  --exec "electron ." --inspect=5858',
        {
          windowsHide: true,
        }
      );
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }
  });
};

tryConnection();

client.on("error", (err) => {
  console.log("Retrying...", err);
  setTimeout(tryConnection, 1000);
});
