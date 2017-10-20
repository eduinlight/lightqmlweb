import QtQuick 1.0
import "config/config.js" as config
import QtQuick.Controls 1.4
// 
Item {
	id: item

	Component.onCompleted: {
		console.log(config.test())
	}

	Text {
		id: helloText
		text: "Hello World"
		anchors.verticalCenter: parent.verticalCenter
		anchors.horizontalCenter: parent.horizontalCenter
		font.pointSize: 24; font.bold: true
	}

}