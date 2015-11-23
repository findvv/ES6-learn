var es6 = ace.edit("editor1"),
  es5 = ace.edit("editor2"),
  resultDom = document.getElementById('result');
es6.setTheme("ace/theme/chrome");
es6.session.setMode("ace/mode/javascript");
es6.getSession().setTabSize(4);
es5.setTheme("ace/theme/clouds");
es5.session.setMode("ace/mode/javascript");
es5.setReadOnly(true);
es5.$blockScrolling = Infinity;
es6.$blockScrolling = Infinity;
es6.getSession().on('change', function(e) {
  setTimeout(function() {
    var code = es6.getValue();
    try {
      transformed = babel.transform(code);
      es5.setValue(transformed.code);
      var result = eval(transformed.code);
      if (result == "use strict") {
        result = "";
      }
      resultDom.innerHTML = result;
    } catch (err) {
      es5.setValue(err.message);
      resultDom.innerHTML = err.message;
    }
  }, 500);
});
