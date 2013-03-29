module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            domop: {
                src: [
                        'addin/jst.js',

                        'src/core.js',
                        'src/scene.js',
                        'src/render.js',
                        'src/featuresContainer.js',
                        'src/style.js',

                        'src/feature.js',
                        'src/feature/image.js',
                        'src/feature/grid.js',
                        'src/feature/tile.js',

                        'src/animation.js',
                        'src/animation/opacity.js',

                        'src/helper.js',
                        'src/helper/size.js',

                        'src/state.js',
                        'src/state/stateLoader.js'
                    ],
                dest: 'build/csprite.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/csprite.js',
                dest: 'build/csprite.min.js'
            }
        }
    });

    // 载入concat和uglify插件，分别对于合并和压缩
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 注册任务
    grunt.registerTask('default', ['concat', 'uglify']);
}; 