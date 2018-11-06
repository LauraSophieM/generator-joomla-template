const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var mkdir = require('mkdirp');


module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

    }

    async prompting() {
        this.answers = await this.prompt([{
                type: 'input',
                name: 'templateName',
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

    filing() {

        //replace spaces with _ sothat files are usable
        this.templateName_ = this.answers.templateName.replace(' ', '_')


        //empty folders
        mkdir('html');
        mkdir('images');
        mkdir('javascript');
        mkdir('language');


        //files in root directory
        this.fs.copyTpl(
            this.templatePath('./'),
            this.destinationPath('./'), {
                templateName: this.answers.templateName,
                templateName_: this.templateName_
            }
        );

        //bootstrap if wished
        if (this.answers.bootstrap) {

            this.fs.copy(
                this.templatePath('css/bootstrap'),
                this.destinationPath('css/bootstrap')
            );

        }

    }

    //Yeoman says All done! Quite simple right? Let's publish and document!!!
    end() {
        this.log(yosay(chalk.yellow("All done!")));
    }
};