#!/bin/sh
echo "Starting minification process.."
html-minifier --collapse-boolean-attributes --collapse-whitespace --decode-entities --html5 --minify-css true --minify-js true --process-conditional-comments --processScripts [text/html] --remove-attribute-quotes --remove-comments --remove-empty-attributes --remove-optional-tags --remove-redundant-attributes --trim-custom-fragments --use-short-doctype -o ./public/index.html ./workspace/index_unmin.html
html-minifier --collapse-boolean-attributes --collapse-whitespace --decode-entities --html5 --minify-css true --minify-js true --process-conditional-comments --processScripts [text/html] --remove-attribute-quotes --remove-comments --remove-empty-attributes --remove-optional-tags --remove-redundant-attributes --trim-custom-fragments --use-short-doctype -o ./public/404.html ./workspace/404_unmin.html
purifycss ./workspace/material-components-web.min.css ./workspace/index_unmin.html -o ./public/material-components-web.min.css -w *mdc-ripple-upgraded* *mdc-button__ripple* *mdc-fab* *mdc-tab-indicator__content*
cleancss -O2 -o ./public/material-components-web.min.css ./public/material-components-web.min.css
cleancss -O2 -o ./public/styles.css ./workspace/styles.css
terser ./workspace/material-components-web.min.js -c -o ./public/material-components-web.min.js
terser ./workspace/script.js -c -o ./public/script.js
echo "Your files have been minified."
firebase deploy