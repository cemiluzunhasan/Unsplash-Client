import React, { Component } from 'react';
import { Input, Select, Icon, Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import constants from '../../helpers/constants';
import actions from '../../store/actions';

class SearchScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collections: [],

      form: {
        query: '',
        collectionId: 0
      },

      loading: {
        collections: true
      }
    }
  }

  componentDidMount() {
    axios.get(`${constants.BASE_ADDRESS}/collections/?client_id=${constants.API_ACCESS_KEY}`).then(response => {
      this.setState({
        collections: response.data
      })
    }).finally(() => {
      this.handleLoading('collections', false);
    });
  }

  handleChange = (key, value) => {
    let { form } = this.state;
    form[key] = value;
    this.setState({
      form
    })
  }

  handleLoading = (key, value) => {
    let { loading } = this.state;
    loading[key] = value;
    this.setState({
      loading
    })
  }

  search = (e) => {
    e.preventDefault();
    this.props.dispatch(actions.searchData(this.state.form));
    this.props.history.push("/results");
  }

  render() {
    let { loading } = this.state;

    return (
      <div className="search-container">
        <img src="/static/logo/logo.svg" alt="hipolabs-tasklogo" className="logo mb-15" />
        <img src="/static/text.svg" alt="hipolabs-tasktext" className="logo-text" />
        <Form onSubmit={(e) => this.search(e)}>
          <Form.Item className="mb-0" xs={{ span: 1, offset: 1}}>
            <Input value={this.state.form.query} className="search-input mb-20" type="text" placeholder="Query" onChange={(e) => this.handleChange('query', e.target.value)} />
          </Form.Item>
          <Form.Item className="mb-0">
            <Select
              placeholder="Collections"
              className="search-input mb-20"
              suffixIcon={<Icon style={{ color: '#050417'}} type={ loading.collections ? `loading` : `caret-down`} />}
              onChange={(value) => this.handleChange('collectionId', value)}
              >
              { this.state.collections.map((collection, key) => (
                <Select.Option key={collection.id} value={collection.id}>
                  { collection.title }
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Link to="/results">
              <Button className="btn-base mt-30">SEARCH</Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

const mapStateToProps = ({ searchResults }) => ({ ...searchResults });
export default connect(mapStateToProps)(SearchScreen);
