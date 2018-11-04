const Generator = require('yeoman-generator');
const chalk = require('chalk');


module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        // This makes `appname` a required argument.
        this.argument('appname', {
            type: String,
            required: false
        });
        this.option('help');

        // And you can then access it later; e.g.
        this.log(this.options.appname);

        this.option('help');
    }

    async prompting() {
        this.answers = await this.prompt([{
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            },
            {
                type: 'confirm',
                name: 'bootstrap',
                message: 'Would you like bootstrap to be added?',
                store: true
            }
        ]);
    }

    // paths() {
    //     this.log(this.destinationRoot());
    //     this.log(this.sourceRoot());
    //     this.destinationRoot();
    //     // returns '~/projects'

    //     this.destinationPath('index.js');
    //     // returns '~/projects/index.js'
    // }

    filing() {
        this.fs.copyTpl(
            this.templatePath('index.php'),
            this.destinationPath('public/index.php'), {
                title: ''
            }
        );
        this.fs.copyTpl(
            this.templatePath('css/template.css'),
            this.destinationPath('css/template.css')
        );

        if (this.answers.bootstrap) {
            this.fs.copyTpl(
                this.templatePath('css/bootstrap/bootstrap.css'),
                this.destinationPath('css/bootstrap/bootstrap.css')
            );
        }

    }

    end() {
        this.log(chalk.yellow("All done!"));
    }
};