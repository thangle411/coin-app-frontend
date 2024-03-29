import React, { FC } from 'react';
import { useTweetsQuery } from '../../api';
import { FeatureContainer, LoadingSpinner, PieChart } from '../../components';
import TweetsAPI from '../../services/tweets';
import Colors from '../../utils/constants/colors';
import './TweetsSentiment.scss';
interface TweetsAnalysisProps {
  searchString: string;
}

const TweetsAnalysis: FC<TweetsAnalysisProps> = ({ searchString }) => {
  const tweets = useTweetsQuery();

  if (tweets.isLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (tweets.isError || !tweets.data) {
    return <div>Can't get tweets analysis</div>;
  }

  const tweetsAnalysis = TweetsAPI.groupTweetsBySentiment(tweets.data);
  const labels = ['Neutral', 'Positive', 'Negative'];
  const backgroundColor = [Colors.CYAN, Colors.PURPLE, Colors.RED_ORANGE];

  console.log(tweets.data);

  return (
    <FeatureContainer
      title='Tweets Sentiment'
      style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center' }}
      childrenStyle={{ height: '100%' }}
    >
      <div className='tweets-sentiment-container d-flex justify-content-space-around align-items-center w-100'>
        <PieChart
          labels={labels}
          label='test'
          dataset={[tweetsAnalysis.neutral, tweetsAnalysis.positive, tweetsAnalysis.negative]}
          backgroundColor={backgroundColor}
        />
        <div className='labels'>
          {labels.map((name, index) => (
            <div key={index} className='d-flex align-items-center' style={{ color: Colors.GREY }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  background: backgroundColor[index],
                  marginRight: '10px',
                  borderRadius: '50%',
                }}
              ></div>
              {name}
            </div>
          ))}
        </div>
      </div>
      <ul className='tweets-container'>
        {tweets.data.map(tweet => (
          <li key={tweet.id}>{tweet.fullText}</li>
        ))}
      </ul>
    </FeatureContainer>
  );
};

export default TweetsAnalysis;
