import React, { useEffect, useRef } from 'react';
import useCollection from './useCollection';
import useDocWithCache from './useDocWithCache';
import formatDate from 'date-fns/format';
import { isSameDay } from 'date-fns';

function ChatScroller(props) {
  const ref = useRef();
  const shouldScrollRef = useRef(true);
  
  useEffect(() => {
    if (shouldScrollRef.current) {
      const node = ref.current; // actual dom node
      node.scrollTop = node.scrollHeight;
    }
  });

  const handleScroll = () => {
    const node = ref.current;
    const { scrollTop, clientHeight, scrollHeight } = node;
    const atBottom = scrollHeight === clientHeight + scrollTop;
    shouldScrollRef.current = atBottom;
  }

  return <div {...props} ref={ref} onScroll={handleScroll} />
}

function Messages({ channelId }) {
  const messages = useCollection(
    `channels/${channelId}/messages`,
    'createdAt'
  );

  return (
    <ChatScroller className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, index) => {
        const previousMessage = messages[index - 1];
        const showDay = shouldShowDay(previousMessage, message);
        const showAvatar = shouldShowAvatar(previousMessage, message);

        return showAvatar ? (
          <FirstMessageFromUser
            key={message.id}
            message={message}
            showDay={showDay}
          />
        ) : (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">
                {message.text}
              </div>
            </div>
          </div>
        )
      })}

    </ChatScroller>
  );
}

function FirstMessageFromUser({ message, showDay }) {
  const author = useDocWithCache(message.user.path);

  return (
    <div key={message.id}>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {new Date(message.createdAt.seconds * 1000).toLocaleDateString()}
          </div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div className="Avatar"
          style={{
            backgroundImage: author
              ? `url("${author.photoUrl}")`
              : ''
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">
              {author && author.displayName}
            </span>{" "}
            <span className="TimeStamp">
              {formatDate(message.createdAt.seconds * 1000, 'h:mm A')}
            </span>
          </div>
          <div className="MessageContent">
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
}

function shouldShowAvatar(previousMessage, message) {
  const isFirst = !previousMessage;
  if (isFirst) {
    return true;
  }

  const differentUser = message.user.id !== previousMessage.user.id;
  if (differentUser) {
    return true;
  }

  const hasBeenAWhile = message.createdAt.seconds - previousMessage.createdAt.seconds > 180;

  return hasBeenAWhile;
}

function shouldShowDay(previousMessage, message) {
  const isFirst = !previousMessage;
  if (isFirst) {
    return true;
  }

  const isNewDay = !isSameDay(
    previousMessage.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  );

  return isNewDay;
}

export default Messages;
