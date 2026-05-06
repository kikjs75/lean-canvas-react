import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      Home Page!
      <ul>
        <li>
          <Link to={`/canvas/1`}>1번 게시글</Link>
        </li>
        <li>
          <Link to={`/canvas/2?keyword=canvas#helloworld`}>2번 게시글</Link>
        </li>
        <li>
          <Link to={`/canvas/3`}>3번 게시글</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
