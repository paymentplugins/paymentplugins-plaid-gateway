const fs = require('fs');
const glob = require('glob');

/**
 * Removes files that are generated during the Webpack build process
 */
class RemoveFilesPlugin {
    constructor(filepath) {
        this.filepath = filepath;
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tap('afterEmit', this.deleteFiles.bind(this));
    }

    deleteFiles() {
        let files = glob.sync(this.filepath);
        files.forEach(file => {
            fs.unlink(file, (err) => {
                if (err) {
                    console.log(`error removing file ${file}.`, err);
                }
            })
        })
    }
}

module.exports = RemoveFilesPlugin;