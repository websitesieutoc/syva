import { CandidateUserByID, Navbar } from '@/components/client';

type InterviewerUserTypes = {
  params: {
    'interviewer-id': string;
  };
};
export default function InterviewUser(props: InterviewerUserTypes) {
  const { params } = props;
  return (
    <main className="px-10">
      <Navbar />
      <div className="my-10" />
      <CandidateUserByID id={params['interviewer-id']} />
    </main>
  );
}
