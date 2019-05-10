import React from 'react';
import { Row, Col, Button } from 'antd';
import MapContainer from './MapContainer';

const ModalContent = ({ element }) => {
  return (
    <div>
      { element &&
        <div>
          <img alt={element.alt_description} src={element.urls.regular} className="user-profileimg" />
          <Row type="flex" align="middle" className="mt-30">
            <Col span={2}>
              <img alt={element.user.name} src={element.user.profile_image.medium} className="user-avatar"/>
            </Col>
            <Col span={16}>
              <h2>{element.user.name}</h2>
              <h3>@{element.user.instagram_username}</h3>
            </Col>
            <Col span={6}>
              <a href={element.links.download} target="_blank" rel="noopener noreferrer">
                <Button className="btn-download">
                  <img alt="download-icon" src="/static/logo/download-arrow.svg" />
                    Download
                  </Button>
              </a>
            </Col>
          </Row>
          <Row className="mt-40">
            { element.location && <MapContainer location={element.location.position} /> }
          </Row>
          <Row className="mt-20" type="flex" align="middle">
            { element.location &&
              <div>
                <img src="/static/logo/location.svg" className="location-icon" alt="location-logo" />
                {element.location && <span className="ml-10 location-info">{element.location.title}</span>}
              </div>
            }
          </Row>
        </div>
      }
    </div>
  );
}

export default ModalContent;
