import React from 'react';

function ChannelInfo() {
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" placeholder="Awesome stuff" />
      </div>
      <div className="ChannelName">#general</div>
    </div>
  );
}

export default ChannelInfo;
