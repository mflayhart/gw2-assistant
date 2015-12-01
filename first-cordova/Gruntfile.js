module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.gw2assistant.mflayhart %> */\n'
      },
      build: {
        src: 'src/<%= gw2assistant %>.js',
        dest: 'build/<%= gw2assistant %>.min.js'
      }
    }
  });
  
   // A very basic default task.
  grunt.registerTask('default', 'infoshizzle', function() {
    grunt.log.write('setting it up to use later').ok();
  });

  // Load the plugin that provides the "uglify" task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  //grunt.registerTask('default', ['uglify']);
  
  // Browserify
  grunt.loadNpmTasks('grunt-browserify');

};