# JavaScript Refresher
This repository contains my notes and sample code for a JavaScript refresher.
I've collected this information from the "JavaScript Guide" available at the
following location:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

# Build and Execution
This code has been tested using Node.js 10.16.3 and can be built in VScode using
the following launch.json configuration:

```javascript
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/refresher.js"
        }
    ]
}
```
