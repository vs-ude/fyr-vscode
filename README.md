# Fyr Language Syntax

[![Greenkeeper badge](https://badges.greenkeeper.io/vs-ude/fyr-vscode.svg)](https://greenkeeper.io/)

This extension adds syntax highlighting for the Fyr language.
It's currently under heavy development so some things are not working correctly.  
It is available on the Visual Studio Code [Marketplace](https://marketplace.visualstudio.com/items?itemName=vs-ude.fyr).


## About Fyr

For more info on Fyr visit the [documentation](http://fyr.vs.uni-due.de).


## Development

To setup a development environment you only need to pull this repository, run `npm install`, and open it in VS Code.
Converting from _YAML-tmLanguage_ to the used _tmLanguage_ files can be done with the [TextMate Languages](https://marketplace.visualstudio.com/items?itemName=Togusa09.tmlanguage) extension.

### Publishing

To publish the extension, follow [this guid](https://code.visualstudio.com/docs/extensions/publish-extension) inside the respective folders.
As a shortcut for publishing, you can use the npm script: `npm run publish`.
Please be aware that this will not automatically increase the version number.  
We already use a publisher called vs-ude.
If you are a maintainer of this repository please ask to gain access to it.


## Credits

Original porting from golang syntax done by Kaser Mahmoud
