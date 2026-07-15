import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function Reviews() {
  return (
    <div className="container">
      <div>
        <Link to="/products">
          <img className="cookieMonsterImg" src="/images/cookie-monster.jpg" />
        </Link>
        <h1>Cookie Monsters</h1>
        <h3 className="subtitle">Home of the world&apos;s greatest cookies</h3>
      </div>

      <div id="reviews" className="row">
        <div className="col-12 col-sm-6 col-md-4">
          <div className="cookieContainer">
            <img
              className="cookieImage"
              src="/images/cookies/chocolate-chip.jpg"
            />
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-8">
          <h3 id="reviewTitle">Chocolate Chip Cookie</h3>
          <h4>
            <FontAwesomeIcon icon={faStar} size="lg" className="reviewStar" />{' '}
            Delicious
          </h4>
          <div className="review">
            <p className="reviewBody">
              I&apos;m now fat and an addict. Thanks, Cookie Monsters. Nom nom
              nom.
            </p>
            <p className="reviewUser">submitted by Rachel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
