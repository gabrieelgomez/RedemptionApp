import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { withNavigation } from 'react-navigation';
import MessageList from '../components/Message/MessageList';
import Loading from '../components/common/Loading';
import Header from '../components/Header';
import * as api from '../services/api';

class MessagesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      messages: [],
      categories: [],
      dataSource: [],
      cellWidth: 167.5,
      cellHeight: 167.5,
      typingTimeout: 0,
      error: '',
    };
  }

  componentDidMount() {
    this.getIndMessages();
  }

  getIndMessages() {
    const ds = new GridView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    api.get(
      '/serie_chapters?serie_type=predica&type=individual',
    ).then((response) => {
      // console.log(response.data.data, '<-- Ind Predica Chapters received from API');
      const newData = ds.cloneWithCells(response.data.data, 2);
      this.getSerieMessages();
      this.setState({
        dataSource: newData,
        loading: false,
      });

    }).catch((error) => {
      console.log(error);
      this.setState({
        error: 'Error retrieving data',
        loading: false,
      });
    });
  }

  getSerieMessages() {
    api.get(
      '/series?serie_type=predica',
    ).then((response) => {
      // console.log(response.data.data, '<-- Serie received from API');
      const newDataSeries = response.data.data;
      this.setState({
        messages: newDataSeries,
        loading: false,
      });
    }).catch((error) => {
      console.log(error);
      this.setState({
        error: 'Error retrieving data',
        loading: false,
      });
    });
  }

  handlePressMessage = (messageId) => {
    console.log(`clicked ${messageId}`);
    const { navigation } = this.props;
    navigation.navigate('Message', { messageId: messageId });
  }

  handlePressIndMessage = (messageId) => {
    console.log(`clicked ${messageId}`);
    const { navigation } = this.props;
    navigation.navigate('IndCurso', { courseId: messageId });
  }

  getCategoryDescription = (categoryTitle, menuCategoryItems) => {
    const foundItem = menuCategoryItems.find(x => x.title === categoryTitle);
    return foundItem ? foundItem.description : '';
  }

  getCategoryId = (categoryTitle, menuCategoryItems) => {
    const foundItem = menuCategoryItems.find(x => x.title === categoryTitle);
    return foundItem ? foundItem.id : '';
  }

  _renderCell(cell) {
    // console.log(cell, '<-- Cell');
    console.log(this.state.cellWidth);
    return (
      <View onLayout={(event) => {
        let width = event.nativeEvent.layout.width;
        if (this.state.cellWidth !== width) {
          this.setState({ cellWidth: width })
        }
        if (this.state.cellHeight !== width) {
          this.setState({ cellHeight: width })
        }
        }}
      >
        <View>
          <TouchableHighlight
            onPress={() => this.handlePressIndMessage(cell.id)}
          >
            <ImageBackground
              style={{
                resizeMode: 'cover',
                justifyContent: 'center',
                alignItems: 'center',
                width: this.state.cellWidth,
                height: this.state.cellHeight,
                backgroundColor: 'transparent',
                // backgroundColor: cell.backgroundColor,
              }}
              source={{
                uri: cell.attributes.image.medium.url,
              }}
            >
              <Text
                style={{
                  backgroundColor: '#0004',
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 14,
                }}
              >
                {cell.attributes.title}
              </Text>
            </ImageBackground>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    // console.log(this.state.dataSource, '<-- DataSource ')
    const { navigation } = this.props;
    const { search, searchActive, loading, messages } = this.state;
    if (loading) {
      return (
        <Loading size={'large'} />
      );
    }
    return (
      <View style={styles.container}>
        <Header
          title='Prédicas'
          dark
        />
        <ScrollView style={styles.messagesContainer}>
          {
            this.state.dataSource
              ?
              (
                <GridView
                  dataSource={this.state.dataSource}
                  spacing={8}
                  style={{ padding: 16 }}
                  renderCell={this._renderCell.bind(this)}
                />
              )
              : null
          }
          <Header
            title='Series de Prédicas'
            dark
          />
          <MessageList
            style={{ justifyContent: 'space-evenly' }}
            messages={messages}
            handlePressMessage={this.handlePressMessage}
          />
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(MessagesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    height: 120,
  },
  image: {
    resizeMode: 'cover',
    height: 120,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 5,
    marginLeft: 0,
    marginRight: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
  sectionTitle: {
    color: '#FF953C',
  },
  homePageTitle: {
    color: '#262659',
    fontSize: 18,
    fontFamily: 'gilroy',
    marginLeft: 10,
  },
  homePageDescription: {
    marginTop: 8,
    color: '#615195',
    fontSize: 22,
    fontFamily: 'gilroy',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
