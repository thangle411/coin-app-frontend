import React, { FC } from 'react';

interface TweetsSentmentProps {
  searchString: string;
}

const TweetsSentiment: FC<TweetsSentmentProps> = ({ searchString }) => {
  return (
    <div>
      <div>Tweets Sentiments</div>
    </div>
  );
};

export default TweetsSentiment;
