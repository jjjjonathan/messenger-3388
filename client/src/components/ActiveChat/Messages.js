import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  let mostRecentReadId;

  // if latest message is from other user, don't display read avatar
  if (messages[messages.length - 1]?.senderId === userId) {
    // find most recently read message sent by user
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].read) {
        mostRecentReadId = messages[i].id;
        break;
      }
    }
  }

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            mostRecentRead={mostRecentReadId === message.id}
          />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
