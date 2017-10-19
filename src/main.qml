import QtQuick 2.0

Rectangle {
	width: 500; height: 200
	color: "lightgray"
	
	Component.onCompleted: {
		console.log(helloText.text)
	}

	Text {
		id: helloText
		text: "imposible pero sierto"
		anchors.verticalCenter: parent.verticalCenter
		anchors.horizontalCenter: parent.horizontalCenter
		font.pointSize: 24; font.bold: true
	}
}