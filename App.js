import React, {Component} from 'react';
import {Image, ScrollView, StatusBar, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import Canvas, {Image as CanvasImage, Path2D} from 'react-native-canvas';

const imgEl = `data:image/jpeg;base64,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`

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      bgColor: '#000',
      currentImage: imgEl,
    }
  }

  componentDidMount() {
    this.changeBg();
  }

  _handleBgChange = (color) => {
    this.setState({
      bgColor: color,
    })
  }

  getAverageColor (data) {
    let blockSize = 5,
      i = -4,
      length,
      rgb = {r:0,g:0,b:0},
      count = 0;

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    console.log(rgb, 'rgb');
    return rgb;
  }

  changeBg = () => {
    const canvas = this.canvas;
    canvas.width = 200;
    canvas.height = 300;
    const context = canvas.getContext('2d');
    const image = new CanvasImage(canvas);
    getAverageColor = this.getAverageColor;
    image.addEventListener('load', () => {
      context.drawImage(
        image,
        0,
        0
      );
      console.log('before try');
      try {
        const self = this;
        context.getImageData(0, 0, canvas.height, canvas.width)
          .then(e => {

            const rgbArray = Object.values(e.data);
            let blockSize = 5,
              i = -4,
              length,
              rgb = {r:0,g:0,b:0},
              count = 0;

            length = rgbArray.length;

            while ( (i += blockSize * 4) < length ) {
              ++count;
              rgb.r += rgbArray[i];
              rgb.g += rgbArray[i+1];
              rgb.b += rgbArray[i+2];
            }

            // ~~ used to floor values
            rgb.r = ~~(rgb.r/count);
            rgb.g = ~~(rgb.g/count);
            rgb.b = ~~(rgb.b/count);
            console.log(rgb, 'rgb');
            self._handleBgChange(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          })
          .catch(e => {
            console.log(e, 'catch');
          });
      } catch (e) {
        console.log(e, 'e');
      }
      console.log('after try');
    });
    image.src = this.state.currentImage;
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.state.bgColor}]}>
        <StatusBar hidden={true} />
        <View style={{ flex: 1 }}>
          <View style={styles.example}>
            <View style={styles.exampleLeft}>
              <Canvas ref={e => {this.canvas = e}} />
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: '100%',
                backgroundColor: 'white',
                padding: 10,
                marginBottom: 5
            }}
            onPress={async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status === 'granted') {
              ImagePicker.launchImageLibraryAsync({
                base64: true,
                quality: 0.1
              }).then(newPostImage => {
                if (!newPostImage.cancelled) {
                  this.setState({ currentImage: `data:image/jpeg;base64,${newPostImage.base64}` });
                  this.changeBg();
                }
              })
                .catch(err => console.log(err))
            }
          }}>
            <Text>
              Pick the image
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const full = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

const cell = {
  flex: 1,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  container: {
    ...full,
  },
  examples: {
    ...full,
    padding: 5,
    paddingBottom: 0,
  },
  example: {
    paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
  },
  exampleLeft: {
    ...cell,
  },
});

export default App;