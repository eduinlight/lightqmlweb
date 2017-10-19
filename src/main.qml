import QtQuick 2.0
import QtQuick.Controls

Rectangle {
	width: 500; height: 200
	color: "lightgray"
	
	Component.onCompleted: {
		console.log(helloText.text)
	}

	Text {
		id: helloText
		text: "imposible pero locas"
		anchors.verticalCenter: parent.verticalCenter
		anchors.horizontalCenter: parent.horizontalCenter
		font.pointSize: 24; font.bold: true
	}

	Rectangle{
		width: 100
		height: 50

		MouseArea{
			anchors.fill: parent
			onClicked: {
				helloText.text = "EDUIN"
			}
		}

	}

}