# Fyr Language Syntax

This extension adds syntax highlighting for the Fyr language.
It's currently under heavy development so some things are not working correctly.  
It is available on the Visual Studio Code [Marketplace](https://marketplace.visualstudio.com/items?itemName=vs-ude.fyr).


## About Fyr

For more info on Fyr visit the [documentation](http://fyr.vs.uni-due.de).


## Language Client and IDE Integration

A language server example that demonstrates how to handle configuration settings in a workspace that uses multi root folders. Since settings in VS Code in this setup are typically scoped to a resource, the example reads the resource settings from the client using the new proposed API getConfiguration. This is analogous to reading settings in a multi-root folder setup directly in the extension host.

The example uses proposed Language Server protocol. So the code demoed here might change when the final version of the configuration and workspace folder protocol is released.

### Compile and Run

- run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and server
- Switch to the Debug viewlet
- Select `Launch Client` from the drop down
- Run the lauch config
- If you want to debug the server as well use the launch configuration `Attach to Server`

## Publishing

To publish the extension, follow [this](https://code.visualstudio.com/docs/extensions/publish-extension) guide inside the respective folders.  
We already use a publisher called vs-ude.
If you are a maintainer of this repository, please ask to gain access to it.


## Credits

Original porting from golang syntax done by Kaser Mahmoud
