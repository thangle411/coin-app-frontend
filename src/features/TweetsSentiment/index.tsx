import React, { FC } from 'react';
import { useTweetsQuery } from '../../api';
import { LoadingSpinner, PieChart } from '../../components';
import TweetsAPI from '../../services/tweets';
import Colors from '../../utils/constants/colors';

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
  console.log(tweetsAnalysis);

  return (
    <div className='w-100'>
      <PieChart
        labels={['Neutral', 'Positive', 'Negative']}
        label='test'
        dataset={[tweetsAnalysis.neutral, tweetsAnalysis.positive, tweetsAnalysis.negative]}
        backgroundColor={[Colors.CYAN, Colors.PURPLE, Colors.RED_ORANGE]}
      />
    </div>
  );
};

export default TweetsAnalysis;
