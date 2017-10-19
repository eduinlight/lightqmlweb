# LightQmlWeb (LQW)

QML is the best language that I learn to build desktops applications in a fast way. LQW is an union of three projects qmlweb(https://github.com/qmlweb/qmlweb), qmlweb-parser(https://github.com/qmlweb/qmlweb-parser) and gulp-qmlweb(https://github.com/qmlweb/gulp-qmlweb). I'm going bring you a fast way to use qmlweb and of course I'm going to implement more modules but not necessary modules from QT but usefulls modules for frontend web development.

## Example

```QML
import QtQuick 2.0

Rectangle {
   width: 500; height: 200
   color: "lightgray"

   Text {
       id: helloText
       text: "Hello world!"
       anchors.verticalCenter: parent.verticalCenter
       anchors.horizontalCenter: parent.horizontalCenter
       font.pointSize: 24; font.bold: true
   }
}
```

## How to use

### Download the project and execute it

```bash
  git clone https://github.com/eduinlight/myqmlweb.git
  cd mysqmlweb
  npm run watch
```

### Build for production

```bash
  npm run build
```

After that you need to change qmlweb.js with qmlweb.min.js on your index.html dependencies

## Future works

Implementation of routes managment, bootstrap and materialize support and forms validations.

## License

LightQmlWeb is licensed under the MIT license, see
[LICENSE](https://github.com/eduinlight/myqmlweb/blob/master/LICENSE).
