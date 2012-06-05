# Warn
## A JSHint configuration tool.
[![Build Status](https://secure.travis-ci.org/fivetanley/warn.js.png)](http://travis-ci.org/fivetanley/warn.js)

**Warn** makes it easy to create and reuse [JSHint](https://github.com/jshint/node-jshint) configuration files.  You can even toggle settings on the fly.

First, install JSHint if you haven't so already:

`npm install -g jshint`

The `-g` flag installs jshint globally so you can use it as a command line tool.  ( *Note: You might need to use sudo!* )

Last, install `warn.js`:

`npm install -g warn`

## Usage guide

```
Usage: warn.js [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -l, --load <file>      Load a JSHint json configuration file
    -o, --output <file>    Specify the output file to save new configuration file. Default [.jshintrc]
    -e, --enable <items>   Enable options or predefined globals ( like browser, node, jquery, backbone)
    -d, --disable <items>  Disable options or predefined globals ( like browser, node, jquery, backbone)
    -m, --maxerr <number>  Set the number of maximum errors for JSHint to report before quitting.
    -i, --indent           Specify indentation
```

You can `load` in a previous config (but only if it's `JSON` format) using the `--load -l` flag.  `Warn` will use those values before enabling/disabling settings.

Most of the values `JSHint` reads in are `Boolean` values ( `true`/`false` ), so use `--enable -e` or `--disable -d` accordingly:

`warn.js --enable backbone`

`Warn` will automatically enable globals for projects that require other projects globals ( for instance, `Backbone` requires `Underscore`'s `_` and `jQuery`'s `$` ).  **NOTE**: If `JSHint` already has a predefined global, Warn.js will enable/disable that one (e.g. `jquery` ).

**NOTE** : `Warn` will enable options, *then* disable them.  Disable always wins.

Some values are `Number`s, and they have their own options:

`warn.js --maxerr <maximum # of errors before jshint will stop reporting>`

`warn.js --indent <number of spaces used for indentation>`

The rest of the things you can enable/disable are `Boolean` values, and affect how `JSHint` analyzes your code (like requiring you to use `hasOwnProperty` in a `for in` loop).

## FAQ

### How do I get my favorite project's globals in Warn?

Simply fork this repository, and add your definition to `lib/CustomPredefs.js'.  The format is like so:

```
myproject = [ 'foo', 'bar', 'baz' ], // Use if project doesn't import other project's globals
myproject2 = {
	deps: [ 'foo' ], // list Array of dependencies here.
	dict: [ 'myGlobal' ] // adds a list of words that JSHint will ignore
}
```

**Make sure the tests still pass!**

`grunt build`

