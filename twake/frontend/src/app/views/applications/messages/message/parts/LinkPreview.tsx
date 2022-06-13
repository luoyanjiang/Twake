import React, { useContext } from 'react';
import { MessageLinkType } from 'app/features/messages/types/message';
import './LinkPreview.scss';
import { useMessage } from 'app/features/messages/hooks/use-message';
import { MessageContext } from '../message-with-replies';
import { X } from 'react-feather';
import { Col, Row } from 'antd';

type PropsType = {
  preview: MessageLinkType;
};

export default ({ preview }: PropsType): React.ReactElement => {
  const context = useContext(MessageContext);
  const { deleteLinkPreview } = useMessage(context);

  return (
    <Row>
      <Col>
        <div className="ant-card ant-card-bordered ant-card-small ant-card-type-inner link-preview">
          <div className="delete-link-preview">
            <X size={16} onClick={() => deleteLinkPreview(preview.url)} />
          </div>
          <div className="ant-card-body">
            <div className="ant-card-meta">
              <div className="ant-card-meta-detail">
                <div className="ant-card-meta-avatar">
                  {preview.favicon && (
                    <span className="ant-avatar ant-avatar-circle ant-avatar-image">
                      <img alt={preview.domain} src={preview.favicon} />
                    </span>
                  )}
                  <span className="link-preview-domain">{preview.domain}</span>
                </div>
                <div className="preview-title">
                  <a href={preview.url} target="_blank" rel="noreferrer">
                    {preview.title}
                  </a>
                </div>
                <div className="ant-card-meta-description">{preview.description}</div>
              </div>
            </div>
            {preview.img && (
              <div className="ant-card-cover">
                <img
                  alt={preview.title}
                  src={preview.img}
                  onClick={() => window.open(preview.url, '_blank')}
                />
              </div>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};