import BackButton from '@/app/_components/BackButton';

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This reservation could not be found :(
      </h1>
      <BackButton>Back</BackButton>
    </main>
  );
}

export default NotFound;
