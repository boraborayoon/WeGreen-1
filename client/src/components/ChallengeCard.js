import styled from 'styled-components';
import { color, radius } from '../styles';
import { Link } from 'react-router-dom';

const ChallengeCardList = styled.li`
  padding: 1rem;
  background-color: ${color.white};
  border-radius: ${radius};
`;

const Highlighted = styled.p`
  color: ${color.primary};
  font-weight: bold;
`;

const ChallengeCardStatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChallengeCard = ({ challenge }) => {
  const href = "/challenge/" + challenge.challenge_id

  const startedAt = new Date(challenge.started_at)
  const finishedAt = new Date(challenge.started_at)
  finishedAt.setDate(startedAt.getDate() + 6)
  
  const regex = /[^0-9]/g;	
  const requirement = parseInt(challenge.requirement.replace(regex, ""))
  const progress = (challenge.checkin_count / requirement) >= 1 ? 1 : (challenge.checkin_count / requirement).toFixed(2)

  return (
    <ChallengeCardList>
      <Link to={href}>
        <h3>{challenge.name}</h3>
        <p>
          {startedAt.toLocaleDateString('ko-KR', { timezone: 'UTC' })} ~ {finishedAt.toLocaleDateString('ko-KR', { timezone: 'UTC' })}
        </p>
        <p>{challenge.requirement}</p>
        <ChallengeCardStatusContainer>
          <Highlighted>{progress * 100}% 완료</Highlighted>
          <p>참여인원: {challenge.join_count}명</p>
        </ChallengeCardStatusContainer>
      </Link>
    </ChallengeCardList>
  );
};

export default ChallengeCard;
