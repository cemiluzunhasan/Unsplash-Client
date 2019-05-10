import React, { Component } from 'react';
import { Input, Select, Icon, Button, Layout, Pagination, Empty, Form , Modal } from 'antd';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import { Link } from 'react-router-dom';
import axios from 'axios';

import constants from '../../helpers/constants';
import actions from '../../store/actions';

import ModalContent from '../UIComponents/ModalContent';

const masonryOptions = {
  transitionDuration: 0
};

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: [],
      visible: false,
      element: null,
      form: {
        query: '',
        page: 1
      }
    }
  }
  componentDidMount() {
    axios.get(`${constants.BASE_ADDRESS}/collections/?client_id=${constants.API_ACCESS_KEY}`).then(response => {
      this.setState({
        collections: response.data
      })
    })
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  showModal = (element) => {
    this.setState({
      visible: true
    })
    axios.get(`${constants.BASE_ADDRESS}/photos/${element.id}?client_id=${constants.API_ACCESS_KEY}`).then((response) => {
      this.setState({
        element: response.data
      })
    })
  }

  handleChange = (key, value) => {
    let { form } = this.state;
    form[key] = value;
    this.setState({
      form
    })
  }

  handlePageChange = (page) => {
    let { form } = this.state;
    form['page'] = page;

    this.setState({
      form
    }, () => {
      if(this.props.query){
        this.handleChange('query', this.props.query);
      }
      this.props.dispatch(actions.searchData(form));
    })
    window.scrollTo(0,0);
  }

  search = (e) => {
    e.preventDefault();
    window.scrollTo(0,0);
    this.props.dispatch(actions.searchData(this.state.form));
  }

  render() {
    const { Header, Content, Footer } = Layout;
    const { searchResults } = this.props;
    const { element } = this.state;

    let childElements = null;

    if (searchResults != null) {
      childElements = this.props.searchResults.results.map((element, i) => {
        return (
            <li onClick={() => this.showModal(element)} key={i} className="image-element-class">
              <img src={element.urls.small} alt="hipolabs-img" />
            </li>
        );
      });
    }

    return (
      <div className="results-container">
        <Header>
          <Link to="/search">
            <img src="/static/logo/logo.svg" className="logo-header" alt="logo" />
          </Link>
          <Form onSubmit={(e) => this.search(e)}>
            <Form.Item>
              <Input className="search-input" placeholder="Query" onChange={(e) => this.handleChange('query', e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Select
                placeholder="Collections"
                className="search-input"
                onChange={(value) => this.handleChange('collectionId', value)}
                suffixIcon={<Icon style={{ color: '#050417'}} type={`caret-down`} />}
                >
                { this.state.collections.map((collection) => (
                  <Select.Option key={collection.id} value={collection.id}>
                    { collection.title }
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="submit" className="btn-base" onClick={(e) => this.search(e)}>SEARCH</Button>
            </Form.Item>
          </Form>
        </Header>
        <Content>
            {this.props.searchResults ?
                <div>
                  <div className="masonry-container">
                    <Masonry
                      className={'my-gallery-class'}
                      elementType={'ul'}
                      options={masonryOptions}
                      disableImagesLoaded={false}
                      updateOnEachImageLoad={false}>
                      { childElements }
                    </Masonry>
                  </div>
                    <Pagination
                      current={this.state.form.page}
                      total={this.props.searchResults.total}
                      onChange={this.handlePageChange}
                      defaultCurrent={1}
                      />
                </div>
              :
              <Empty />
            }
            <Modal
              visible={this.state.visible}
              onCancel={this.handleCancel}
              >
                <ModalContent element={element} />
            </Modal>
        </Content>
        <Footer>
          Prepared by Cemil Uzunhasan ®
        </Footer>
      </div>
    );
  }
};

const mapStateToProps = ({ searchResults, query }) => ({ searchResults, query });
export default connect(mapStateToProps)(SearchResults);
